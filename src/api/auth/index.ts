import request from '@/config/axios'
import type { UserType, LoginParams, LoginResponse } from './types'

export const authLogin = (data: LoginParams): Promise<IResponse<LoginResponse>> => {
  return request.post({ url: '/auth/login', data })
}

export const authLogout = (): Promise<IResponse> => {
  return request.get({ url: '/auth/logout' })
}
