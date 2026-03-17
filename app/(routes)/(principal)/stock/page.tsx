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
  const ProductForm = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      nombre: "",
      categoria: "",
      stock: 0,
      precioCompra: 0,
      precioVenta: 0,
      fechaVencimiento: undefined,
    },
  });
  async function onSubmit(data: ProductFormData) {
    console.log(data);
  }
  return (
    <section className="p-3 w-full">
      <div className="flex justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-fit h-10 cursor-pointer text-sm font-semibold rounded-sm text-slate-200 leading-tight tracking-tight"
        >
          Agregar Producto
          <PlusCircleIcon className="size-4 stroke-3" />
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border-muted-foreground/20 border rounded-sm min-w-[400px] md:min-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-base text-slate-700 dark:text-slate-200">
              Listo para agregar un producto
            </DialogTitle>
          </DialogHeader>
          <form
            id="form-rhf-demo"
            onSubmit={ProductForm.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6 gap-1 md:space-y-12 p-1 md:p-3"
          >
            <FieldGroup>
              <Controller
                name="nombre"
                control={ProductForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-sm leading-tight text-muted-foreground tracking-tight"
                      htmlFor="form-rhf-demo-nombre"
                    >
                      Nombre del producto
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-nombre"
                      className="p-3 h-12 border-none focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-lg"
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-sm leading-tight text-muted-foreground tracking-tight"
                      htmlFor="form-rhf-demo-categoria"
                    >
                      Categoría del producto
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-categoria"
                      type="text"
                      autoComplete="off"
                      required
                      placeholder="Ej: Bebidas, Snacks, etc."
                      className="p-3 h-12 border-none focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-lg"
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
                      className="text-sm leading-tight text-muted-foreground tracking-tight"
                      htmlFor="form-rhf-demo-stock"
                    >
                      Stock adquierido
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-stock"
                      type="number"
                      autoComplete="off"
                      required
                      className="p-3 h-12 border-none focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-lg"
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
                      className="text-sm leading-tight text-muted-foreground tracking-tight"
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
                      className="p-3 h-12 border-none focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-lg"
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
                      className="text-sm leading-tight text-muted-foreground tracking-tight"
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
                      className="p-3 h-12 border-none focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-lg"
                    />
                  </Field>
                )}
              />
              <Controller
                name="fechaVencimiento"
                control={ProductForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-sm leading-tight text-muted-foreground tracking-tight"
                      htmlFor="form-rhf-demo-fechaVencimiento"
                    >
                      Fecha de vencimiento
                    </FieldLabel>
                    <Input
                      type="date"
                      id="form-rhf-demo-fechaVencimiento"
                      className="p-3 h-12 focus-visible:ring-blue-400/50 focus-visible:border-blue-400 ring-1 w-full rounded-lg border-none"
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
            </FieldGroup>
            <Button
              form="form-rhf-demo"
              type="submit"
              className="w-full cursor-pointer h-12 text-base leading-0 tracking-tighter"
            >
              Guardar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
