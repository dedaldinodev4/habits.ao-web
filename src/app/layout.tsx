"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState, useContext } from "react";
import { redirect, usePathname } from "next/navigation";
import Loader from "@/components/common/Loader";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { isUserLogged } from "@/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(AuthContext);
  const pathname = usePathname()

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (!user && !isUserLogged(pathname)) {
    redirect('/auth/signin');
  }

  if (user && isUserLogged(pathname)) {
    redirect('/');
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
