import { FieldError, UseFormRegister } from "react-hook-form";
  
import { ISignInRequest, ISignUpRequest } from "./auth";

  export type InputProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<ISignInRequest | ISignUpRequest>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
  };
  

  export type ValidFieldNames = 
  | "email" | "password" | "profile" | "confirm_password";