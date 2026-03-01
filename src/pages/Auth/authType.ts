export interface ILoginBody {
    email: string;
    password: string;
}

export type UserRole = 'ADMIN' | 'USER';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    profilePhoto: string;
    role: UserRole;
}

interface LoginData {
    token: string;
    user: User;
}

export interface ILoginResponse {
    success: boolean;
    message: string;
    data: LoginData;
}


/* ------------- */

export interface IRegisterBody {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
  data: User;
}