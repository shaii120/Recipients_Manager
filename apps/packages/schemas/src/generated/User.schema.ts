import { z } from "zod";

export const UserModelSchema = z.object({
  id: z.string().nonempty("id is required"),
  email: z.string().nonempty("email is required"),
  passwordHash: z.string().nonempty("passwordHash is required"),
  projectsId: z.array(z.any())
});
export type UserModel = z.infer<typeof UserModelSchema>;

export const UserCreateSchema = z.object({
  email: z.string().nonempty("email is required"),
  passwordHash: z.string().nonempty("passwordHash is required"),
  projectsId: z.array(z.any())
});
export type UserCreate = z.infer<typeof UserCreateSchema>;

export const UserUpdateSchema = z.object({
  email: z.string().nullish(),
  passwordHash: z.string().nullish(),
  projectsId: z.array(z.any()).nullish()
});
export type UserUpdate = z.infer<typeof UserUpdateSchema>;

export const UserResultSchema = z.object({
  id: z.string().nonempty("id is required"),
  email: z.string().nonempty("email is required"),
  passwordHash: z.string().nonempty("passwordHash is required")
});
export type UserResult = z.infer<typeof UserResultSchema>;