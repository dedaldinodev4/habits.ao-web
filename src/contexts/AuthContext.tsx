import Router  from "next/router";
import { useState, createContext, useEffect, ReactNode } from "react";
import Cookies, { destroyCookie, parseCookies, setCookie } from "nookies";

import { ISignInRequest } from "@/types/auth";
import { recoverUserInformation, signInRequest } from "@/hooks/authUser";
import { api } from "@/lib/api";


export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [ user, setUser ] = useState<any>(null);
 
  useEffect(() => {
    const loadUserFromCookies = async () => {
      const { 'habits-token': token } = parseCookies();

      if (token) {
        
        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        await recoverUserInformation(token).then(response => {
          if (response) setUser(response);
        })
      }
    }

    loadUserFromCookies();
  }, [])



  const signIn = async (data: ISignInRequest) => {
    const request = await signInRequest(data);

    if (request instanceof Error) {
      return new Error('Email or password invalid'); 
    } else {

      const { token, user } = request;
      setCookie(undefined, 'habits-token', token, {
        maxAge: 60 * 60 * 24,
        sameSite: true,
        path: "/",
      })
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      if (user.profile === 'user') {
        const { id, email,profile,status,user_name } = user;
        const habitsRequest = await api.get(`habits/byUser/${user.id}`);
        const habits = habitsRequest.data
    
        const result =  {
            id, email,profile,status,user_name, habits
        }

        setUser(result)
      } 
      else {
        setUser(user);
      }

      Router.push('/');
     
    }
  } 

  const logout = async (email: string) => {
    console.log(email)
    destroyCookie(null, 'habits-token');
    setUser(null);
    delete api.defaults?.Authorization;
  }

  return (
    <AuthContext.Provider value = {{
      isAuthenticated: !!user,
      user,
      signIn,
      logout,
      token: Cookies.get("habits-token")
    }}>
      { children }
    </AuthContext.Provider>
  )
}



