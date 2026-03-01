export type UserRole = 'ADMIN' | 'USER' | '';

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    profilePhoto: string;
    role: UserRole;
}

export interface AuthState {
    isLoggedin: boolean;
    accessToken: string;
    user: User;
}