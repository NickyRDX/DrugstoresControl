"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { productFormSchema, ProductFormData } from "@/types/product.data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function StockPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(false)
  const ProductForm = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      nombre: "",
      categoria: "",
      stock: 0,
      precioCompra: 0,
      precioVenta: 0,
      fechaIngresado: undefined,
    },
  });
  async function onSubmit(data: ProductFormData) {
    setCargando(true)
    console.log(data);
    const formDato = new FormData();
    console.log(formDato);
    setCargando(false)
  }
  return (
    <section className="p-3 w-full">
      <div className="flex justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-fit h-10 cursor-pointer text-sm font-semibold rounded-sm text-slate-200 leading-tight tracking-tighter"
        >
          Agregar Producto
          <PlusCircleIcon className="size-4 stroke-3" />
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border-muted-foreground/20 border rounded-sm w-[95vw] max-w-[700px] max-h-[95vh] overflow-y-hidden sm:rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold tracking-tight text-slate-700 dark:text-slate-200 cursor-default">
              Agregar Nuevo Producto
            </DialogTitle>
          </DialogHeader>
          <form
            id="form-rhf-demo"
            onSubmit={ProductForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-1 md:p-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="nombre"
                control={ProductForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                    <FieldLabel
                      className="text-sm font-medium text-muted-foreground"
                      htmlFor="form-rhf-demo-nombre"
                    >
                      Nombre del producto
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-nombre"
                      className="h-10 border-muted-foreground/20 focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-md"
                      type="text"
                      autoComplete="off"
                      required
                      placeholder="Ej: Pepsi, Doritos Etc."
                    />
                  </Field>
                )}
              />
              <Controller
                name="categoria"
                control={ProductForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                    <FieldLabel
                      className="text-sm font-medium text-muted-foreground"
                      htmlFor="form-rhf-demo-categoria"
                    >
                      Categoría
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-categoria"
                      type="text"
                      autoComplete="off"
                      required
                      placeholder="Ej: Bebidas, Snacks, etc."
                      className="h-10 border-muted-foreground/20 focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-md"
                    />
                  </Field>
                )}
              />
              <Controller
                name="stock"
                control={ProductForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-sm font-medium text-muted-foreground"
                      htmlFor="form-rhf-demo-stock"
                    >
                      Stock
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-stock"
                      type="number"
                      autoComplete="off"
                      required
                      className="h-10 border-muted-foreground/20 focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-md"
                    />
                  </Field>
                )}
              />
              <Controller
                name="fechaIngresado"
                control={ProductForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-sm font-medium text-muted-foreground"
                      htmlFor="form-rhf-demo-fechaIngresado"
                    >
                      Fecha de Ingreso
                    </FieldLabel>
                    <Input
                      type="date"
                      id="form-rhf-demo-fechaIngresado"
                      className="h-10 border-muted-foreground/20 focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-md"
                      required
                      value={
                        field.value
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value ? new Date(value + "T00:00:00") : undefined,
                        );
                      }}
                      onBlur={field.onBlur}
                      autoComplete="off"
                      ref={field.ref}
                      name={field.name}
                    />
                  </Field>
                )}
              />
              <Controller
                name="precioCompra"
                control={ProductForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-sm font-medium text-muted-foreground"
                      htmlFor="form-rhf-demo-precioCompra"
                    >
                      Precio de compra
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-precioCompra"
                      type="number"
                      autoComplete="off"
                      required
                      className="h-10 border-muted-foreground/20 focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-md"
                    />
                  </Field>
                )}
              />
              <Controller
                name="precioVenta"
                control={ProductForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-sm font-medium text-muted-foreground"
                      htmlFor="form-rhf-demo-precioVenta"
                    >
                      Precio de venta
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-precioVenta"
                      type="number"
                      autoComplete="off"
                      required
                      className="h-10 border-muted-foreground/20 focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-md"
                    />
                  </Field>
                )}
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              
              <Button
                form="form-rhf-demo"
                type="submit"
                className="h-10 cursor-pointer px-8 font-semibold w-full"
              >
                Guardar Producto
              </Button>
            </div>
          </form>
          <span className='text-xs cursor-default -mt-2 text-muted-foreground text-center'>precio de venta definido por el dueño</span>
        </DialogContent>
      </Dialog>
    </section>
  );
}
