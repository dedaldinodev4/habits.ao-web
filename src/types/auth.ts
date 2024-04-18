
export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest extends ISignInRequest {
  confirm_password: string;
  profile: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  profile: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}