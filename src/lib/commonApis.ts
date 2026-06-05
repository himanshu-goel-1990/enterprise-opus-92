import api from "@/features/api/axios";
import moment from "moment";

// get all organuizations data
export const getAllOrg = async () => {
  const body = {};
  const res = await api.get("/organizations/list", body);
  return res.data;
};

// get all users data
export const getAllUsers = async () => {
  const body = {};
  const res = await api.get("/users/list", body);
  return res.data;
};

// get avatar color
export const getAvatarColor = (name: string) => {
  const index = name.toUpperCase().charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};


// get all roles data
export const getAllRoles = async () => {
  const body = {};
  const res = await api.get("/rbac/roles/list", body);
  return res.data;
};

// get all permissions role wise
export const getPermissionsRoleWiseList = async () => {
  const body = {};
  const res = await api.get("/rbac/permissionsGroupWise/list", body);
  return res.data;
};

// get all policies
export const getAllPolicies = async () => {
  const body = {};
  const res = await api.get("/rbac/policies/list", body);
  return res.data;
}

export const getAllPolicyAssignments = async () => {
  const body = {};
  const res = await api.get("/rbac/policy-assignments/list", body);
  return res.data;
}