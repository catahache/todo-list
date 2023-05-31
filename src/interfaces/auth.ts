export interface Auth {
    user: User
    token: string
}

export interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: string
    verification: Verification
}

export interface Verification {
    email: boolean
}

export interface LoginData {
    email: string, 
    password: string
}
