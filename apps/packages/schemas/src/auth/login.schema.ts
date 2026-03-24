import { z } from "zod";

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().nonempty("Password is required")
});

export type LoginInput = z.infer<typeof LoginSchema>;