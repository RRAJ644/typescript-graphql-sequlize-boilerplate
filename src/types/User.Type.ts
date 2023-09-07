export interface UserAttributes {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface UserCreateInput {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface UserLoginInput {
  email: string
  password: string
}

