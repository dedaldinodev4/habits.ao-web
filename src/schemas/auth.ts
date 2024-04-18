
import { ISignInRequest, ISignUpRequest, IUser } from "@/types/auth";
import { z, ZodType } from "zod";


export const UserSchema: ZodType<IUser> = z.object({
  id: z.number(),
  user_name: z.string().min(3, { message: "Username is too short" }),
  email: z.string().email(),
  password: z.string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
  profile: z.string(),
  status: z.boolean(),
  created_at: z.date(),
  updated_at: z.date()
})

export const SignInSchema: ZodType<ISignInRequest> = z.object({
  email: z.string().email(),
  password: z.string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" })
})

export const SignUpSchema: ZodType<ISignUpRequest> = z.object({
  email: z.string().email(),
  password: z.string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
  profile: z.string(),
  confirm_password: z.string()
})
.refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"], // path of error
});

 