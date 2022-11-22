import request from '@/config/axios'
import type { UserType, LoginParams, LoginResponse } from './types'

interface RoleParams {
  roleName: string
}

export const authLogin = (data: LoginParams): Promise<IResponse<LoginResponse>> => {
  return request.post({ url: '/auth/login', data })
}

export const authLogout = (): Promise<IResponse> => {
  return request.get({ url: '/auth/logout' })
}

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request.get<{
    total: number
    list: UserType[]
  }>({ url: '/user/list', params })
}

export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/role/list', params })
}

export const getTestRoleApi = (params: RoleParams): Promise<IResponse<string[]>> => {
  return request.get({ url: '/role/list', params })
}
