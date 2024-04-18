
export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  email: string;
  password: string;
  re_password: string;
  profile: 'admin' | 'user';
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  profile: 'admin' | 'user';
  status: boolean;
  created_at: Date;
  updated_at: Date;
}