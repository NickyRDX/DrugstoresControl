import { z } from "zod";
export const loginFormSchema = z.object({
  email: z.email({message: "El email no es válido"}),
  password: z.string().min(3, {message: "La contraseña debe tener al menos 8 caracteres"}),
})
export type LoginFormData = z.infer<typeof loginFormSchema>;