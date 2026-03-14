"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { login } from "@/action/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useForm, Controller } from "react-hook-form";
import { loginFormSchema, LoginFormData } from "@/types/form.data";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    // Creamos una nueva promesa que se resuelve luego de 2 segundos (2000 ms).
    // Esto simula una espera o una operación asíncrona, como una llamada a un servidor.
    // Usamos setInterval solo para mostrar un ejemplo, pero normalmente se utilizaría setTimeout.
    await new Promise((resolve) => {
      // Creamos un intervalo que se ejecutará después de 2 segundos
      const intervalId = setInterval(() => {
        // Limpiamos el intervalo para que no se ejecute de nuevo
        clearInterval(intervalId);
        // Resolvemos la promesa, lo que permite que la función continue
        resolve(null);
      }, 2000);
    });
    const resultado = await login(formData);
    if (resultado.error) {
      toast.error(resultado.error);
    } else {
      toast.success("Login exitoso");
    }
    setIsLoading(false);
    form.reset();
  }
  return (
    <Card className="w-full max-w-sm shadow-lg rounded-sm border-slate-900/20 border max-h-full dark:border-slate-200/20 md:max-w-md">
      <CardHeader className="my-2">
        <CardTitle className="text-2xl text-center font-semibold tracking-tight text-slate-700 dark:text-slate-200">
          Iniciar sesión
        </CardTitle>
        <CardDescription className="text-accent-foreground my-2 text-xs text-center underline decoration-secondary-foreground">
          Bienvenido/a a Drugstore Controls
        </CardDescription>
      </CardHeader>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="px-4 gap-6 space-y-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="tracking-tight text-muted-foreground"
                  htmlFor="form-rhf-demo-email"
                >
                  Correo electrónico
                </FieldLabel>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="email"
                  required
                  className="h-12 focus-visible:ring-blue-400/70 focus-visible:border-blue-400 ring-2 ring-blue-300 w-full rounded-sm"
                />
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="tracking-tight text-muted-foreground"
                  htmlFor="form-rhf-demo-password"
                >
                  Contraseña
                </FieldLabel>
                <Input
                  placeholder="por favor ingrese su contraseña"
                  {...field}
                  id="form-rhf-demo-password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="password"
                  required
                  className="h-12 focus-visible:ring-blue-400/57 focus-visible:border-blue-400 ring-2 ring-blue-300 w-full rounded-sm"
                />
              </Field>
            )}
          />
        </FieldGroup>
        <CardFooter className="border-none my-5 bg-transparent">
          <Button
            variant="secondary"
            type="submit"
            form="form-rhf-demo"
            disabled={isLoading}
            className="w-full cursor-pointer h-12 text-base leading-relaxed tracking-tighter"
          >
            {isLoading ? <Spinner /> : "Iniciar sesión"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
