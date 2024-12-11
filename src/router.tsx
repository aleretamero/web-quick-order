import { createBrowserRouter } from "react-router";
import { GuestGuard } from "@/guard/guest.guard";
import { AuthGuard } from "@/guard/auth.guard";
import { LoginPage } from "@/pages/login.page";
import { HomePage } from "@/pages/home.page";
import { OrdersPage } from "@/pages/orders.page";
import { OrderDetailsPage } from "@/pages/order-details.page";
import { DashboardLayout } from "@/layouts/dashboard.layout";
import { AuthLayout } from "@/layouts/auth.layout";
import { RootLayout } from "@/layouts/root.layout";
import { AdminGuard } from "@/guard/admin.guard";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: (
          <GuestGuard>
            <AuthLayout />
          </GuestGuard>
        ),
        children: [
          {
            path: "/",
            element: <LoginPage />,
          },
        ],
      },
      {
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          {
            path: "/home",
            element: (
              <AdminGuard>
                <HomePage />
              </AdminGuard>
            ),
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
          {
            path: "orders/:id",
            element: <OrderDetailsPage />,
          },
        ],
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]);
