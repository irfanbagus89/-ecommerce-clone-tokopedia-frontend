"use client";

import FooterUser from "@/components/layouts/FooterUser";
import NavbarUser from "@/components/layouts/NavbarUser";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-white">
      <NavbarUser />
      <main className="flex justify-center items-center p-4">
        <div className="w-full max-w-7xl">{children}</div>
      </main>
      <FooterUser/>
    </div>
  );
}
