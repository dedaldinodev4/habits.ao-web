
export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  email: string;
  password: string;
  confirm_password: string;
  profile: string;
  user_name: string;
}

export interface IUser {
  id: number;
  email: string;
  password?: string;
  user_name: string;
  profile: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ICurrentUser {
  user: IUser;
  token: string;
}