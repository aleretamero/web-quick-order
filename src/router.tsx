import { createBrowserRouter } from "react-router";
import { GuestGuard } from "@/guard/guest.guard";
import { AuthGuard } from "@/guard/auth.guard";
import { LoginPage } from "@/pages/login.page";
import { HomePage } from '@/pages/home.page';
import { OrdersPage } from '@/pages/orders.page';
import { CreateOrderPage } from '@/pages/create-order.page';
import { OrderDetailsPagePage } from '@/pages/order-details.page';

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: "/home",
    element: (
      <AuthGuard>
        <HomePage />
      </AuthGuard>
    ),
  },
  {
    path: "orders",
    element: (
      <AuthGuard>
        <OrdersPage />
      </AuthGuard>
    ),
  },
  {
    path: "orders/create",
    element: (
      <AuthGuard>
        <CreateOrderPage />
      </AuthGuard>
    ),
  },
  {
    path: "orders/:id",
    element: (
      <AuthGuard>
        <OrderDetailsPagePage />
      </AuthGuard>
    ),
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);
