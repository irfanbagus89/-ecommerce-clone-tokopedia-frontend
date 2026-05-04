"use client";

import FooterUser from "@/components/layouts/FooterUser";
import NavbarUser from "@/components/layouts/NavbarUser";
import FloatingChatButton from "@/components/layouts/FloatingChatButton";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <NavbarUser />
      <main className="flex-1 flex justify-center items-start p-4 pt-[130px] sm:pt-[94px]">
        <div className="w-full max-w-7xl">
          {children}
        </div>
      </main>
      <FooterUser/>
      <FloatingChatButton />
    </div>
  );
}