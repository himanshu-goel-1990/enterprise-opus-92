
-- =========================================================================
-- ENUMS
-- =========================================================================
create type public.app_role as enum ('platform_admin', 'org_admin', 'member');
create type public.org_plan as enum ('free', 'team', 'business', 'enterprise');

-- =========================================================================
-- UPDATED-AT TRIGGER FUNCTION
-- =========================================================================
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================================
-- PROFILES
-- =========================================================================
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  email text,
  full_name text,
  avatar_url text,
  job_title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles viewable by signed-in users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = user_id);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (user_id) do nothing;

  -- Assign default member role
  insert into public.user_roles (user_id, role)
  values (new.id, 'member')
  on conflict do nothing;

  return new;
end;
$$;

-- =========================================================================
-- USER_ROLES (separate table — prevents privilege escalation)
-- =========================================================================
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users view own roles"
  on public.user_roles for select
  to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'platform_admin'));

create policy "Platform admins manage roles"
  on public.user_roles for all
  to authenticated
  using (public.has_role(auth.uid(), 'platform_admin'))
  with check (public.has_role(auth.uid(), 'platform_admin'));

-- Now attach the new-user trigger (uses user_roles + has_role)
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================================
-- ORGANIZATIONS
-- =========================================================================
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  plan public.org_plan not null default 'free',
  logo_color text not null default '#6366f1',
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.organizations enable row level security;

create trigger organizations_set_updated_at
  before update on public.organizations
  for each row execute function public.update_updated_at_column();

-- =========================================================================
-- ORGANIZATION_MEMBERS
-- =========================================================================
create table public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null default 'member', -- org-scoped role label (owner/admin/member)
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

alter table public.organization_members enable row level security;

create index idx_org_members_user on public.organization_members(user_id);
create index idx_org_members_org on public.organization_members(organization_id);

create or replace function public.is_org_member(_user_id uuid, _org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members
    where user_id = _user_id and organization_id = _org_id
  )
$$;

create or replace function public.is_org_admin(_user_id uuid, _org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members
    where user_id = _user_id
      and organization_id = _org_id
      and role in ('owner', 'admin')
  )
$$;

-- Organization policies
create policy "Members view their organizations"
  on public.organizations for select
  to authenticated
  using (public.is_org_member(auth.uid(), id) or public.has_role(auth.uid(), 'platform_admin'));

create policy "Authenticated users create organizations"
  on public.organizations for insert
  to authenticated
  with check (auth.uid() = created_by);

create policy "Org admins update organization"
  on public.organizations for update
  to authenticated
  using (public.is_org_admin(auth.uid(), id) or public.has_role(auth.uid(), 'platform_admin'));

create policy "Platform admins delete organization"
  on public.organizations for delete
  to authenticated
  using (public.has_role(auth.uid(), 'platform_admin'));

-- Member policies
create policy "Members view co-members"
  on public.organization_members for select
  to authenticated
  using (public.is_org_member(auth.uid(), organization_id) or public.has_role(auth.uid(), 'platform_admin'));

create policy "Org admins add members"
  on public.organization_members for insert
  to authenticated
  with check (public.is_org_admin(auth.uid(), organization_id) or public.has_role(auth.uid(), 'platform_admin'));

create policy "Org admins update members"
  on public.organization_members for update
  to authenticated
  using (public.is_org_admin(auth.uid(), organization_id) or public.has_role(auth.uid(), 'platform_admin'));

create policy "Org admins remove members"
  on public.organization_members for delete
  to authenticated
  using (public.is_org_admin(auth.uid(), organization_id) or public.has_role(auth.uid(), 'platform_admin'));

-- Auto-add creator as owner
create or replace function public.handle_new_organization()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.created_by is not null then
    insert into public.organization_members (organization_id, user_id, role)
    values (new.id, new.created_by, 'owner')
    on conflict do nothing;
  end if;
  return new;
end;
$$;

create trigger on_organization_created
  after insert on public.organizations
  for each row execute function public.handle_new_organization();

-- =========================================================================
-- AUDIT_LOGS
-- =========================================================================
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  actor_user_id uuid,
  actor_email text,
  action text not null,
  resource text,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.audit_logs enable row level security;

create index idx_audit_logs_org on public.audit_logs(organization_id, created_at desc);
create index idx_audit_logs_actor on public.audit_logs(actor_user_id);

create policy "Members view org audit logs"
  on public.audit_logs for select
  to authenticated
  using (
    (organization_id is not null and public.is_org_member(auth.uid(), organization_id))
    or public.has_role(auth.uid(), 'platform_admin')
  );

create policy "Authenticated users write audit logs as themselves"
  on public.audit_logs for insert
  to authenticated
  with check (actor_user_id = auth.uid());
