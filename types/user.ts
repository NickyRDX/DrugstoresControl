export type Rol = "OWNER" | "EMPLOYEE";

export type User = {
  id: string;
  email: string;
  nombre: string;
  rol: Rol;
  tiendaId: string;
  created_at: Date;
};
