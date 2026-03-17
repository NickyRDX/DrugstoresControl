import { z } from "zod";
export const productFormSchema = z.object({
  nombre: z.string().min(3, {message: "El nombre debe tener al menos 3 caracteres"}).max(50),
  categoria: z.string().min(3, {message: "La categoría debe tener al menos 3 caracteres"}).max(50),
  stock: z.number().min(0, {message: "El stock debe ser mayor a 0"}).max(1000000, {message: "El stock debe ser menor a 1000000"}),
  precioCompra: z.number().min(0, {message: "El precio de compra debe ser mayor a 0"}),
  precioVenta: z.number().min(0, {message: "El precio de venta debe ser mayor a 0"}),
  fechaVencimiento: z.date().optional(),
})

export type ProductFormData = z.infer<typeof productFormSchema>;