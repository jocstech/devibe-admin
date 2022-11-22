export type UserLoginType = {
  username: string
  password: string
}

export type UserType = {
  username: string
  password: string
  role: string
  roleId: string
  permissions: string | string[]
}

export type LoginParams = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
}

export type Role = {
  readonly name?: string
  readonly value?: string
  readonly discription?: string
  readonly icon?: string
  readonly subset?: Role[]
}

export type User = {
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
  bloacked?: boolean
  roles?: Role[]
  iat?: number
  exp?: number
}
