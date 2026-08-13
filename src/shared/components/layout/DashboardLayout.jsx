import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
        <Sidebar/>
        <div className="flex md:ml-64 flex-1 flex-col min-h-screen">
            {/* <Navbar/> */}
            <main className="flex-1 p-6">
                <Outlet/>
            </main>
        </div>
    </div>
  )
}
