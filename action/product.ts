"use server"
/**
 * Marca este archivo como "Server Actions" de Next.js (App Router).
 * - Solo puede ejecutarse en el servidor (nunca se envía el código al navegador).
 * - Las funciones exportadas pueden llamarse desde componentes con `await crearProducto(...)`
 *   como si fueran funciones normales; Next.js serializa la llamada por HTTP.
 */

import { prisma } from "@/lib/prisma";
/** Cliente de Prisma: ORM para hablar con la base de datos (consultas tipadas en TypeScript). */

import { createClient } from '@/lib/supabase/server'
/**
 * createClient (server): crea el cliente de Supabase en el servidor, con cookies de la petición.
 * Sirve para leer la sesión del usuario (quién está logueado) de forma segura.
 */

import {revalidatePath} from 'next/cache'
/**
 * Invalida la caché de una ruta: después de crear/editar datos, forzás que la próxima visita
 * a esa página vuelva a ejecutar el servidor y muestre datos frescos (ej. lista de stock).
 */

import {productFormSchema,  ProductFormData} from '@/types/product.data'
/**
 * productFormSchema: reglas Zod (validación) que deben cumplir los datos del formulario.
 * ProductFormData: tipo TypeScript inferido de ese schema = forma exacta del objeto válido.
 */

/**
 * Obtiene el ID de la tienda ("tiendaId") asociada al usuario que tiene la sesión activa.
 *
 * Flujo: Supabase Auth (email del JWT) → tabla User en Prisma → campo tiendaId.
 *
 * @returns Unión discriminada (patrón común en TypeScript):
 *   - `{ ok: true, tiendaId: string }` si todo salió bien (tenemos el id de tienda).
 *   - `{ ok: false, error: string }` si no hay sesión, no hay email, o el usuario no existe en DB.
 *   Así quien llama puede hacer `if (!resultado.ok) return error` sin adivinar.
 */
async function getCurrentTiendaId():Promise<{ok: true; tiendaId: string} | {ok:false; error: string}>{
    // Cliente Supabase ligado a esta request (lee cookies de autenticación).
    const supabase = await createClient()
    // getUser(): obtiene el usuario desde el token JWT almacenado en cookies.
    // - data.user: objeto usuario de Auth (id, email, metadata…) o null.
    // - error: si el token es inválido o expiró.
    const {data: {user}, error} = await supabase.auth.getUser()
    if(error || !user?.email){
      return {ok: false, error: "No hay sesión. Iniciá sesión nuevamente."}
    }
    // Buscamos en NUESTRA tabla User el registro que coincide con el email de Auth.
    // select: { tiendaId: true } solo trae ese campo (más eficiente que traer todo el registro).
    const dbUser = await prisma.user.findUnique({
      where: {email: user.email},
      select: {tiendaId: true}
    })
    if(!dbUser){
      return {ok: false, error: "No se encontró el usuario en la base de datos."}
    }
    return { ok: true, tiendaId: dbUser.tiendaId }
}

/**
 * Crea un producto nuevo en la base de datos, siempre asociado a la tienda del usuario logueado.
 *
 * @param data — Objeto con los campos del formulario. Tipo `ProductFormData`:
 *   - nombre, categoria: strings (longitud validada en el schema).
 *   - stock, precioCompra, precioVenta: números (rangos en el schema).
 *   - fechaIngresado: `Date` opcional; aquí se mapea a `fechaVencimiento` en Prisma (nombre distinto en DB).
 *   Viene del cliente (formulario/React) serializado; Zod valida tipos y límites antes de tocar la DB.
 *
 * @returns `{ ok: true }` si se creó y se revalidó la ruta, o `{ ok: false, error: string }` si falló validación,
 *   sesión/tienda, o error de base de datos.
 */
export async function crearProducto(data: ProductFormData){
  // safeParse: valida `data` contra productFormSchema SIN lanzar excepción.
  // Si falla, parsed.success es false y parsed.error tiene el detalle (útil para debug/UI avanzada).
  const parsed = productFormSchema.safeParse(data)
  if(!parsed.success){
    return {ok: false, error: "datos invalidos, por favor verifique los datos e intente nuevamente."}
  }
  // Necesitamos tiendaId para cumplir la regla de negocio: cada producto pertenece a una tienda.
  const resultado = await getCurrentTiendaId()
  if(!resultado.ok){
    return {ok: false, error: resultado.error}
  }
  try {
    // create: INSERT en la tabla Producto. Los nombres deben coincidir con schema.prisma (model Producto).
    // parsed.data es el objeto ya validado por Zod (TypeScript lo estrecha como seguro).
    await prisma.producto.create({
      data: {
        tiendaId: resultado.tiendaId,
        nombre: parsed.data.nombre,
        categoria: parsed.data.categoria,
        stock: parsed.data.stock,
        precioCompra: parsed.data.precioCompra,
        precioVenta: parsed.data.precioVenta,
        // En el formulario se llama fechaIngresado; en el modelo Prisma el campo es fechaVencimiento.
        fechaVencimiento: parsed.data.fechaIngresado,
      }
    })
    // Refresca la caché de la página /stock para que liste el producto nuevo sin F5 manual.
    revalidatePath("/stock")
    return {ok: true}
  } catch (e) {
    // Errores de DB (constraint, conexión, etc.). No exponemos detalles internos al usuario final.
    console.error("Error al crear el producto:", e)
    return {ok: false, error: "Error al crear el producto. Por favor, intente nuevamente."}
  }
}

/**
 * Lista todos los productos de la tienda del usuario actual, ordenados del más reciente al más viejo.
 *
 * @param (ninguno) — La identificación del usuario/tienda sale solo de la sesión (getCurrentTiendaId).
 *
 * @returns Siempre incluye `productos` (array) para simplificar el uso en UI:
 *   - `{ ok: true, productos: [...] }` con los campos seleccionados abajo (sin traer relaciones innecesarias).
 *   - `{ ok: false, error: string, productos: [] }` si falló auth o la consulta.
 *   `as const` en ok ayuda a que TypeScript infiera literales true/false en los discriminated unions.
 */
export async function obtenerProductos(){
  const resultado = await getCurrentTiendaId()
  if(!resultado.ok){
    return {ok: false as const, error: resultado.error, productos: []}
  }
  try {
    const productos = await prisma.producto.findMany({
      // Solo filas de la tienda del usuario (multi-tenant: cada farmacia ve solo lo suyo).
      where: {tiendaId: resultado.tiendaId},
      // Orden: created_at descendente = primero los últimos creados.
      orderBy: {created_at: "desc"},
      // select: elegimos columnas explícitas (menos datos por red, tipos claros en el cliente).
      select: {
        id: true,
        nombre: true,
        categoria: true,
        stock: true,
        stockMinimo: true,
        precioCompra: true,
        precioVenta: true,
        fechaIngresado: true,
        created_at: true,
      },
    });
    return {ok: true as const, productos}
  } catch (e) {
    console.error("Error al obtener los productos:", e)
    return {ok: false as const, error: "Error al obtener los productos. Por favor, intente nuevamente.", productos: []}
  }
}
