import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";

const NavbarUser = () => {
  const { isLoggedIn, user, logout } = useAuthContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search?s=${encodeURIComponent(search)}`);
    }
  };

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
        {/* LOGO */}
        <Link href={"/"}>
          <Image
            src="https://p16-assets-sg.tokopedia-static.net/tos-alisg-i-cqp9s0kcd0-sg/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
            alt="Logo"
            width={145}
            height={32}
          />
        </Link>

        {/* SEARCH */}
        <div className="w-[1253px]">
          <Input
            leftIcon={<Search className="text-gray-500" />}
            placeholder="Cari di tokopedia"
            className="max-w-[1253px] w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* ICONS */}
        {!isLoggedIn ? (
          <span className="pl-4">
            <Bell className="text-gray-500" />
          </span>
        ) : (
          <div className="flex gap-4">
            <Link href={"/checkout/cart"}>
              <ShoppingCart className="text-gray-500" />
            </Link>
            <Bell className="text-gray-500" />
            <Mail className="text-gray-500" />
          </div>
        )}

        {/* AUTH */}
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
          <div className="border-l border-gray-300 px-4 flex items-center gap-6 text-gray-600">
            {/* DROPDOWN TOKO */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer text-sm font-medium hover:text-black">
                  Toko
                </div>
              </DropdownMenuTrigger>
              {user?.role !== "seller" && (
                <DropdownMenuContent
                  align="center"
                  className="w-72 p-4"
                  sideOffset={28}
                >
                  <p className="text-sm text-gray-600 mb-3">
                    Anda belum memiliki toko.
                  </p>

                  <Button className="w-full bg-green-600 hover:bg-green-700 mb-2">
                    Buka Toko Gratis
                  </Button>

                  <p className="text-xs text-gray-500">
                    Tokomu hilang?{" "}
                    <span className="text-green-600 cursor-pointer hover:underline">
                      Pelajari Selengkapnya
                    </span>
                  </p>
                </DropdownMenuContent>
              )}
              {user?.role === "seller" && (
                <DropdownMenuContent
                  align="center"
                  className="w-56"
                  sideOffset={28}
                >
                  <DropdownMenuItem onClick={(() => router.push('/dashboard'))}>Dashboard Toko</DropdownMenuItem>
                  <DropdownMenuItem>Kelola Produk</DropdownMenuItem>
                  <DropdownMenuItem>Pesanan</DropdownMenuItem>
                  <DropdownMenuItem>Chat Pembeli</DropdownMenuItem>
                  <DropdownMenuItem>Statistik</DropdownMenuItem>
                  <DropdownMenuItem>Pengaturan Toko</DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="text-red-500">
                    Tutup Toko
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>

            {/* DROPDOWN USER */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                  )}
                  <span className="text-sm font-medium">
                    {user?.name ?? "User"}
                  </span>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="w-44"
                sideOffset={24}
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
        )}
      </div>
    </nav>
  );
};

export default NavbarUser;
