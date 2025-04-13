import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export const metadata = {
  title: "Dashboard",
  description: "Test dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="m-4 min-h-screen flex flex-col md:flex-row">
        <Sidebar className="md:block w-full md:w-64" />

        <div className="flex-1 flex flex-col">
          <Topbar />

          <main className="p-6 mt-[5px]">{children}</main>
        </div>
      </body>
    </html>
  );
}
