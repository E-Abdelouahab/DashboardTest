import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export const metadata = {
  title: "Dashboard",
  description: "Admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="m-4 min-h-screen flex flex-col md:flex-row">
        <Sidebar />
 
        <div className="flex-1 flex flex-col ml-64">
          <Topbar />

          <main className="p-6 mt-[60px]">{children}</main>
        </div>
      </body>
    </html>
  );
}

