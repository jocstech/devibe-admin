import request from '@/config/axios'

// ...................................
// 获取所有的用户
export const getSystemUsers = (): Promise<IResponse<SystemUser[]>> => {
  return request.get({ url: '/users' })
}

// 获取缩减用户列表
export const getSystemUsersList = (): Promise<IResponse<SystemUser[]>> => {
  return request.get({ url: '/users/list' })
}

// 通过ID获取用户
export const getSystemUserById = (id: string): Promise<IResponse<SystemUser>> => {
  return request.get({ url: `/users/${id}` })
}

// 创建新用户
export const createSystemUser = (data: SystemUser | undefined): Promise<IResponse<SystemUser>> => {
  return request.post({ url: '/users/', data })
}

// 通过ID更新用户信息
export const updateSystemUserById = (id: string, data: SystemUser): Promise<IResponse<SystemUser>> => {
  return request.patch({ url: `/users/${id}`, data })
}
// ...................................
// 获取所有权限角色
export const getSystemRoles = (): Promise<IResponse<SystemRole[]>> => {
  return request.get({ url: '/roles' })
}

// 获取缩减角色列表
export const getRolesList = async (): Promise<IResponse<SystemRole[]>> => {
  return request.get({ url: '/roles/list' })
}

// 通过ID获取角色
export const getSystemRoleById = (id: string): Promise<IResponse<SystemRole>> => {
  return request.get({ url: `/roles/${id}` })
}

// 创建新用户
export const createSystemRole = (data: SystemRole | undefined): Promise<IResponse<SystemRole>> => {
  return request.post({ url: '/roles/', data })
}

// 通过ID更新角色信息
export const updateSystemRoleById = (id: string, data: SystemRole): Promise<IResponse<SystemRole>> => {
  return request.patch({ url: `/roles/${id}`, data })
}
