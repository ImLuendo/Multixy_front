import { Outlet } from "react-router-dom";
import { AdminHeader } from "../AdminHeader/AdminHeader";

export function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <Outlet />
      </main>
    </div>
  );
}
