import request from '@/config/axios'

// 获取所有的用户
export const getSystemUsers = (): Promise<IResponse<SystemUser[]>> => {
  return request.get({ url: '/users' })
}

// 通过ID获取用户
export const getSystemUserById = (id: string): Promise<IResponse<SystemUser>> => {
  return request.get({ url: `/users/${id}` })
}

// 创建新用户
export const createSystemUser = (data: SystemUser | undefined): Promise<IResponse> => {
  return request.post({ url: '/users/', data })
}

// 通过ID更新用户信息
export const updateSystemUserById = (id: string, data: SystemUser): Promise<IResponse> => {
  return request.patch({ url: `/users/${id}`, data })
}

// 角色
export const getSystemRoles = (): Promise<IResponse<SystemRole[]>> => {
  return request.get({ url: '/roles' })
}

export const getRolesList = async (): Promise<IResponse<SystemRole[]>> => {
  return request.get({ url: '/roles/list' })
}
