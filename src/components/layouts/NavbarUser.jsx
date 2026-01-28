import { useState } from "react";
import { Input } from "../ui/input";
import { Bell, Mail, Search, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { CustomDropdown } from "../ui/dropdown-menu"; 

const NavbarUser = () => {
  const { isLoggedIn, user, logout } = useAuthContext();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search?s=${encodeURIComponent(search)}`);
    }
  };

  return (
    <nav className="w-full flex flex-col border-b border-gray-200 bg-white transition-all fixed top-0 left-0 shadow-md z-50">
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
            <CustomDropdown
              trigger={
                <div className="cursor-pointer text-sm font-medium hover:text-black">
                  Toko
                </div>
              }
              contentProps={{ align: "center", sideOffset: 28 }}
              items={
                user?.role !== "seller"
                  ? [
                      {
                        type: "label",
                        label: "Anda belum memiliki toko.",
                      },
                      {
                        label: "Buka Toko Gratis",
                        onClick: () => router.push("/seller/register"),
                      },
                    ]
                  : [
                      {
                        label: "Dashboard Toko",
                        onClick: () => router.push("/dashboard"),
                      },
                      { label: "Kelola Produk" },
                      { label: "Pesanan" },
                      { label: "Chat Pembeli" },
                      { label: "Statistik" },
                      { label: "Pengaturan Toko" },
                      { type: "separator" },
                      {
                        label: "Tutup Toko",
                        variant: "destructive",
                      },
                    ]
              }
            />

            {/* DROPDOWN USER */}
            <CustomDropdown
              trigger={
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
              }
              contentProps={{ align: "start", sideOffset: 24 }}
              items={[
                { label: "Pembelian" },
                { label: "Wishlist" },
                { label: "Toko Favorit" },
                { label: "Pengaturan" },
                { type: "separator" },
                {
                  label: "Keluar",
                  variant: "destructive",
                  onClick: logout,
                },
              ]}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarUser;
