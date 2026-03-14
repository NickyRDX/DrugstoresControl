import {
  LucideIcon,
  Home,
  PackageIcon,
  TruckIcon,
  CircleDollarSignIcon,
  BookTextIcon,
} from "lucide-react";
interface SidebarProps {
  id: number;
  nombre: string;
  href: string;
  icon: LucideIcon;
}
export const sidebarDato: SidebarProps[] = [
  {
    id: 1,
    nombre: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    id: 2,
    nombre: "Stock",
    href: "/stock",
    icon: PackageIcon,
  },
  {
    id: 3,
    nombre: "Proveedores",
    href: "/proveedores",
    icon: TruckIcon,
  },
  {
    id: 4,
    nombre: "Ventas",
    href: "/ventas",
    icon: CircleDollarSignIcon,
  },
  {
    id: 5,
    nombre: "Empleados",
    href: "/empleados",
    icon: BookTextIcon,
  },
];
