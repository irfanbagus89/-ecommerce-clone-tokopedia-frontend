import { useState } from "react";
import { Input } from "../ui/input";
import { Bell, Mail, Menu, Search, ShoppingCart, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search?s=${encodeURIComponent(search)}`);
    }
  };

  return (
    <nav className="w-full flex flex-col border-b border-gray-200 bg-white transition-all fixed top-0 left-0 shadow-md z-50">
      {/* Main Navbar */}
      <div className="flex items-center py-2 sm:py-4 px-3 sm:px-6 gap-2 sm:gap-4 w-full justify-between">
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href={"/"}>
            <Image
              src="https://p16-assets-sg.tokopedia-static.net/tos-alisg-i-cqp9s0kcd0-sg/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
              alt="Logo"
              width={100}
              height={22}
              className="w-20 sm:w-[100px] md:w-[120px] h-auto"
            />
          </Link>
        </div>

        {/* Search Bar - Hidden on very small screens, flexible on larger */}
        <div className="hidden sm:flex flex-1 max-w-[200px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[1500px]">
          <Input
            leftIcon={<Search className="text-gray-500 w-4 h-4" />}
            placeholder="Cari di tokopedia"
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Icons and Auth Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {!isLoggedIn ? (
            <span className="hidden sm:flex pl-2 sm:pl-4">
              <Bell className="text-gray-500 w-5 h-5" />
            </span>
          ) : (
            <div className="flex gap-2 sm:gap-4 items-center">
              <Link href={"/checkout/cart"}>
                <ShoppingCart className="text-gray-500 w-5 h-5" />
              </Link>
              <Bell className="text-gray-500 w-5 h-5 hidden sm:block" />
              <Mail className="text-gray-500 w-5 h-5 hidden sm:block" />
            </div>
          )}

          {!isLoggedIn ? (
            <div className="hidden md:flex border-l border-gray-300 px-2 sm:px-4 gap-2 sm:gap-4">
              <Link href={"/login"}>
                <Button variant={"outline"} size="sm">
                  Masuk
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button size="sm">Daftar</Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex border-l border-gray-300 px-2 sm:px-4 items-center gap-4 sm:gap-6 text-gray-600">
              <Link href={"/dashboard"}>
                <div className="cursor-pointer text-xs sm:text-sm font-medium hover:text-black">
                  Toko
                </div>
              </Link>

              <CustomDropdown
                trigger={
                  <div className="flex items-center gap-2 cursor-pointer">
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt="avatar"
                        width={28}
                        height={28}
                        className="rounded-full w-7 h-7"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gray-400"></div>
                    )}
                    <span className="text-xs sm:text-sm font-medium hidden lg:block">
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

          {/* Mobile Auth Button */}
          {!isLoggedIn && (
            <div className="md:hidden">
              <Link href={"/login"}>
                <Button size="sm">Masuk</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar - Only visible on small screens */}
      <div className="sm:hidden px-3 pb-2">
        <Input
          leftIcon={<Search className="text-gray-500 w-4 h-4" />}
          placeholder="Cari di tokopedia"
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-3 py-2">
          {!isLoggedIn ? (
            <div className="flex flex-col gap-2">
              <Link href={"/login"} onClick={() => setMobileMenuOpen(false)}>
                <Button variant={"outline"} className="w-full">
                  Masuk
                </Button>
              </Link>
              <Link href={"/register"} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Daftar</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href={"/dashboard"}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2 py-2 text-gray-600 hover:text-black">
                  <span className="text-sm font-medium">Toko</span>
                </div>
              </Link>
              <Link
                href={"/checkout/cart"}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2 py-2 text-gray-600 hover:text-black">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm font-medium">Keranjang</span>
                </div>
              </Link>
              <div className="py-2 text-gray-600">
                <span className="text-sm font-medium">Akun</span>
                <div className="flex flex-col gap-2 mt-2 ml-2">
                  <Link
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm hover:text-black"
                  >
                    Pembelian
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm hover:text-black"
                  >
                    Wishlist
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm hover:text-black"
                  >
                    Toko Favorit
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm hover:text-black"
                  >
                    Pengaturan
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm text-red-500 hover:text-red-700 text-left"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavbarUser;
