export interface UserLoginType {
  username: string
  password: string
}

export interface UserType {
  username: string
  password: string
  role: string
  roleId: string
  permissions: string | string[]
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface Role {
  readonly name?: string
  readonly value?: string
  readonly description?: string
  readonly icon?: string
  readonly subset?: Role[]
}

export interface User {
  readonly _id?: string
  username?: string
  email?: string
  avatar?: string
  nickname?: string
  name?: string
  first_name?: string
  last_name?: string
  phone?: string
  verified?: boolean
  blocked?: boolean
  roles?: Role[]
  iat?: number
  exp?: number
}
