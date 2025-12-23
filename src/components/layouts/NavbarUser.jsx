import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Bell, Mail, Search, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavbarUser = () => {
  const { isLoggedIn, user, logout } = useAuthContext();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex flex-col border-b border-gray-200 bg-white transition-all 
      ${isScrolled ? "fixed top-0 left-0 shadow-md z-50" : "relative"} `}
    >
      <div className="flex items-center py-4 px-6 gap-4 w-full justify-center">
        <Image
          src="https://p16-assets-sg.tokopedia-static.net/tos-alisg-i-cqp9s0kcd0-sg/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
          alt="Logo"
          width={145}
          height={32}
        />

        <div className="w-[1253px]">
          <Input
            leftIcon={<Search className="text-gray-500" />}
            placeholder={"Cari di tokopedia"}
            className={"max-w-[1253px] w-full"}
          />
        </div>
        {!isLoggedIn ? (
          <span className="pl-4">
            <Bell className="text-gray-500" />
          </span>
        ) : (
          <div className="flex gap-4">
            <ShoppingCart className="text-gray-500" />
            <Bell className="text-gray-500" />
            <Mail className="text-gray-500" />
          </div>
        )}
        {!isLoggedIn ? (
          <div className="border-l border-gray-300 px-4 flex gap-4">
            <Link href={"/login"}>
              <Button variant={"outline"}>Masuk</Button>
            </Link>
            <Link href={"/register"}>
              <Button>Daftar</Button>
            </Link>
          </div>
        ) : (
          <div className="border-l border-gray-300 px-4 flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2 cursor-pointer">
              {user.avatar === undefined ? (
                <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              ) : (
                <Image
                  src={user?.avatar ?? "/default-avatar.png"}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm font-medium">{"toko"}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    {user.avatar === undefined ? (
                      <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                    ) : (
                      <Image
                        src={user?.avatar ?? "/default-avatar.png"}
                        alt="avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-sm font-medium">
                      {user?.name ?? "User"}
                    </span>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"

                  sideOffset={20}
                  className="w-44"
                >
                  <DropdownMenuItem>Pembelian</DropdownMenuItem>

                  <DropdownMenuItem>Wishlist</DropdownMenuItem>

                  <DropdownMenuItem>Toko Favorit</DropdownMenuItem>

                  <DropdownMenuItem>Pengaturan</DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500"
                    onClick={logout}
                  >
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarUser;
