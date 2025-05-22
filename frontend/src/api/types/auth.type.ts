export interface CurrentUser {
  id: number
  name: string
  email: string
  first_name: string
  last_name: string
}

export interface LoginBody {
  email: string
  password: string
}

export interface RegisterBody {
  email: string
  password: string
  last_name: string
  first_name: string
}
