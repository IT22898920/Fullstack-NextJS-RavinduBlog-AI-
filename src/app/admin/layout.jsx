import React from 'react'
import { cn } from "@/lib/utils";
import AdminNavbar from '@/components/admin/navbar/AdminNavbar';

function AdminLayout({ children }) {
  return (
    // <AdminOnlyPage>
    <div className={cn("min-h-screen w-full bg-color-grey text-white flex")}>
      <AdminNavbar />
      {/* main page */}
      <div className="p-8 w-full">{children}</div>
    </div>
    // </AdminOnlyPage>
  );
}

export default AdminLayout;
