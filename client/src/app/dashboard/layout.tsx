import { getServerSession } from "next-auth";
import SideNav from "./sidenav/sidenav";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Providers from "../providers";
import { ToastContainer, toast } from "react-toastify";
import { Suspense } from "react";
import Loading from "./loading";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </Providers>
  );
}
