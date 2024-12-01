import { Outlet } from "react-router";
import { LayoutDashboard, PlusCircleIcon, Table } from "lucide-react";
import { AppSidebar, SidebarItem } from "@/components/layout/sidebar.component";

const sidebarData: SidebarItem[] = [
  {
    title: "Início",
    icon: LayoutDashboard,
    url: "/home",
  },
  {
    title: "Pedidos",
    icon: Table,
    url: "/orders",
  },
  {
    title: "Novo",
    icon: PlusCircleIcon,
    url: "/orders/create",
  },
];

export function DashboardLayout() {
  return (
    <AppSidebar data={sidebarData}>
      <Outlet />
    </AppSidebar>
  );
}
