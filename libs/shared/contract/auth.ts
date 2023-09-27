export interface RegisterRequest {
  email: string
  username: string
  password: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
  id: number
  email: string
  username: string
  token: string
}

export interface LogoutRequest {
  token: string
}

export interface VerifyRequest {
  token: string
}

// export interface AccountUpdateRequest {
//   email: string
//   username: string
//   token: string
// }
