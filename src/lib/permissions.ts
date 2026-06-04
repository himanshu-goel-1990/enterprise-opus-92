export const usePermission = () => {
  const permissions = JSON.parse(
    localStorage.getItem("permissions") || "[]"
  );

  const can = (permission: string) =>
    permissions.includes("*") ||
    permissions.includes(permission);

  return { can };
};