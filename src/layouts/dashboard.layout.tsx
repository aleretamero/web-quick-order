import { Outlet } from "react-router";
import { LayoutDashboard, Table } from "lucide-react";
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
  ];

  return (
    <AppSidebar data={sidebarData}>
      <Outlet />
    </AppSidebar>
  );
}
