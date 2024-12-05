import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div
      className="flex items-center justify-center h-dvh bg-gray-50"
      style={{ minHeight: "100vh" }}
    >
      <Outlet />;
    </div>
  );
}
