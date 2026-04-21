import { z } from "zod";

export const ProjectModelSchema = z.object({
  id: z.string().nonempty("id is required"),
  name: z.string().nonempty("name is required"),
  description: z.string().nullish(),
  receiptsId: z.array(z.any()),
  usersId: z.array(z.any())
});
export type ProjectModel = z.infer<typeof ProjectModelSchema>;

export const ProjectCreateSchema = z.object({
  name: z.string().nonempty("name is required"),
  description: z.string().nullish(),
  receiptsId: z.array(z.any()),
  usersId: z.array(z.any())
});
export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;

export const ProjectUpdateSchema = z.object({
  name: z.string().nullish(),
  description: z.string().nullish(),
  receiptsId: z.array(z.any()).nullish(),
  usersId: z.array(z.any()).nullish()
});
export type ProjectUpdate = z.infer<typeof ProjectUpdateSchema>;

export const ProjectResultSchema = z.object({
  id: z.string().nonempty("id is required"),
  name: z.string().nonempty("name is required"),
  description: z.string().nullish()
});
export type ProjectResult = z.infer<typeof ProjectResultSchema>;