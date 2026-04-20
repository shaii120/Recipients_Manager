import { z } from "zod";

export const UserPublicSchema = z.object({
    id: z.string(),
    email: z.email(),
});

export type UserPublic = z.infer<typeof UserPublicSchema>;