import { Outlet } from "react-router";
import { LayoutDashboard, PlusCircleIcon, Table } from "lucide-react";
import { AppSidebar, SidebarItem } from "@/components/layout/sidebar.component";
import { useAuth } from "@/hooks/use-auth.hook";
import { Role } from "@/domain/user/enums/role.enum";

export function DashboardLayout() {
  const { dataUser } = useAuth();

  const sidebarData: SidebarItem[] = [
    ...(dataUser?.role === Role.ADMIN
      ? [
          {
            title: "Início",
            icon: LayoutDashboard,
            url: "/home",
          },
        ]
      : []),

    {
      title: "Pedidos",
      icon: Table,
      url: "/orders",
    },

    ...(dataUser?.role === Role.ADMIN
      ? [
          {
            title: "Novo",
            icon: PlusCircleIcon,
            url: "/orders/create",
          },
        ]
      : []),
  ];

  return (
    <AppSidebar data={sidebarData}>
      <Outlet />
    </AppSidebar>
  );
}
