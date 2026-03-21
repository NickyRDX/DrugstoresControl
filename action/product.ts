"use server"
import { prisma } from "@/lib/prisma";
import { createClient } from '@/lib/supabase/server'
import {revalidatePath} from 'next/cache'
import {productFormSchema,  ProductFormData} from '@/types/product.data'

async function getCurrentTiendaId():Promise<{ok: true; tiendaId: string} | {ok:false; error: string}>{
    const supabase = await createClient()
    const {data: {user}, error} = await supabase.auth.getUser()
    if(error || !user?.email){
      return {ok: false, error: "No hay sesión. Iniciá sesión nuevamente."}
    }
    // El error en la linea 13 ocurre porque en tu esquema de Prisma el modelo se llama "user" (minúscula) y no "User" (mayúscula).
    // Debes cambiar "prisma.User" por "prisma.user" para que coincida con tu esquema generado por Prisma.
    const dbUser = await prisma.user.findUnique({
      where: {email: user.email},
      select: {tiendaId: true}
    })
    if(!dbUser){
      return {ok: false, error: "No se encontró el usuario en la base de datos."}
    }
    return { ok: true, tiendaId: dbUser.tiendaId }
}
export async function crearProducto(data: ProductFormData){
  const parsed = productFormSchema.safeParse(data)
  if(!parsed.success){
    return {ok: false, error: "datos invalidos, por favor verifique los datos e intente nuevamente."}
  }
  const resultado = await getCurrentTiendaId()
  if(!resultado.ok){
    return {ok: false, error: resultado.error}
  }
  try {
    await prisma.producto.create({
      data: {
        tiendaId: resultado.tiendaId,
        nombre: parsed.data.nombre,
        categoria: parsed.data.categoria,
        stock: parsed.data.stock,
        precioCompra: parsed.data.precioCompra,
        precioVenta: parsed.data.precioVenta,
        fechaVencimiento: parsed.data.fechaIngresado,
      }
    })
    revalidatePath("/stock")
    return {ok: true}
  } catch (e) {
    console.error("Error al crear el producto:", e)
    return {ok: false, error: "Error al crear el producto. Por favor, intente nuevamente."}
  }
}
export async function obtenerProductos(){
  const resultado = await getCurrentTiendaId()
  if(!resultado.ok){
    return {ok: false as const, error: resultado.error, productos: []}
  }
  try {
    const productos = await prisma.producto.findMany({
      where: {tiendaId: resultado.tiendaId},
      orderBy: {created_at: "desc"},
      select: {
        id: true,
        nombre: true,
        categoria: true,
        stock: true,
        stockMinimo: true,
        precioCompra: true,
        precioVenta: true,
        fechaVencimiento: true,
        created_at: true,
      },
    });
    return {ok: true as const, productos}
  } catch (e) {
    console.error("Error al obtener los productos:", e)
    return {ok: false as const, error: "Error al obtener los productos. Por favor, intente nuevamente.", productos: []}
  }
}