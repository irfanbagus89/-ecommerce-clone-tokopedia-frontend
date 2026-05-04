import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Bell, Mail, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useCountMyCart } from "@/services/User/Cart/countMyCart";
import { useUnreadCount } from "@/services/User/Notifications/notificationActions";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { CustomDropdown } from "../ui/dropdown-menu";
import { SellerAccessModal } from "../ui/seller-access-modal";
import { NotificationDropdown } from "@/container/User/Notifications";

const NavbarUser = () => {
  const { isLoggedIn, user, logout } = useAuthContext();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);

  const handleTokoClick = (e) => {
    if (user?.role !== "seller") {
      e.preventDefault();
      setShowSellerModal(true);
      setMobileMenuOpen(false);
    }
  };

  const { data: cartCountData, mutate: mutateCartCount } = useCountMyCart();
  const cartItemCount = cartCountData?.count || 0;
  const { data: notifCountData } = useUnreadCount();
  const notifCount = notifCountData?.count || 0;
  useEffect(() => {
    const handleCartUpdate = () => {
      mutateCartCount();
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [mutateCartCount]);

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
              <Link href={"/checkout/cart"} className="relative block">
                <ShoppingCart
                  className={`text-gray-500 w-5 h-5 transition-transform duration-300 ${isAnimating ? "scale-125 text-green-600" : ""}`}
                />
                {cartItemCount > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-white text-white text-[9px] font-bold ${isAnimating ? "animate-bounce" : ""}`}
                  >
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </Link>
              <NotificationDropdown
                notifCount={notifCount}
                trigger={
                  <button className="relative hidden sm:block outline-none">
                    <Bell className="text-gray-500 w-5 h-5 hover:text-green-600 transition-colors" />
                    {notifCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-white text-white text-[9px] font-bold">
                        {notifCount > 9 ? "9+" : notifCount}
                      </span>
                    )}
                  </button>
                }
              />
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
              <Link href={"/dashboard"} onClick={handleTokoClick}>
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
                  { label: "Pesanan Saya", href: "/orders" },
                  { label: "Wishlist", href: "/wishlist" },
                  { label: "Pengaturan", href: "/account" },
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
                onClick={(e) => {
                  if (user?.role !== "seller") {
                    e.preventDefault();
                    setShowSellerModal(true);
                    setMobileMenuOpen(false);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
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
                  <div className="relative">
                    <ShoppingCart
                      className={`w-5 h-5 transition-transform duration-300 ${isAnimating ? "scale-125 text-green-600" : ""}`}
                    />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-white text-white text-[9px] font-bold">
                        {cartItemCount > 99 ? "99+" : cartItemCount}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium">Keranjang</span>
                </div>
              </Link>
              <div className="py-2 text-gray-600">
                <span className="text-sm font-medium">Akun</span>
                <div className="flex flex-col gap-2 mt-2 ml-2">
                  <Link
                    href="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm hover:text-black"
                  >
                    Pesanan Saya
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm hover:text-black"
                  >
                    Wishlist
                  </Link>
                  <NotificationDropdown
                    notifCount={notifCount}
                    trigger={
                      <button className="text-sm text-left hover:text-black outline-none w-full flex items-center justify-between">
                        Notifikasi
                        {notifCount > 0 && (
                          <span className="bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full inline-flex items-center justify-center">
                            {notifCount > 9 ? "9+" : notifCount}
                          </span>
                        )}
                      </button>
                    }
                  />
                  <Link
                    href="/account"
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

      <SellerAccessModal
        isOpen={showSellerModal}
        onClose={setShowSellerModal}
      />
    </nav>
  );
};

export default NavbarUser;
