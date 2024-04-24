import { jwtDecode } from "jwt-decode";

import { api } from "@/lib/api";
import { ISignUpRequest,ISignInRequest, IUser, ICurrentUser } from "@/types/auth";

//* SignIn *//
export const signInRequest = async (data: ISignInRequest): Promise<ICurrentUser| Error> => {

  try {
    const request = await api.post('/users/login', data)
    return request.data
  } catch(error) {
    return new Error('Email or password invalid: '+error); 
  }
 
}

//* SignUp *//
export const signUpRequest = async (data: ISignUpRequest): Promise<ICurrentUser | Error> => {
    try {
        const result = await api.post('/users', data);
        return result.data;
    } catch (error) { 
        return new Error('Register mistak.'); 
    }
    
}

//* RecoverUserInformation *//
export const recoverUserInformation = async (token: string) => {
  const data = jwtDecode(token) as { user: IUser }
  const { user } = data;

  try {
    
    const { user_name, profile, id, status, email } = user;
    if (profile === "user") {
        const habits = await api.get('/habits')

        return {
            id,
            profile,
            user_name,
            email,
            status,
            habits
        }
    }
    return user;
  } catch(error) {
    console.error(error)
  }
}