import { NextResponse } from "next/server";

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

const sellerRoutes = [
  "/dashboard",
  "/orders-seller",
  "/products",
  "/statistics",
  "/chats",
  "/settings",
];

const adminRoutes = [
  "/dashboard-admin",
  "/users",
  "/sellers",
  "/orders-admin",
  "/withdrawals",
  "/vouchers",
];

const userProtectedRoutes = [
  "/account",
  "/orders",
  "/wishlist",
  "/checkout",
];

const matches = (pathname, routes) =>
  routes.some(
    (r) => pathname === r || pathname.startsWith(r + "/"),
  );

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const isSellerRoute = matches(pathname, sellerRoutes);
  const isAdminRoute = matches(pathname, adminRoutes);
  const isUserRoute = matches(pathname, userProtectedRoutes);

  if (!isSellerRoute && !isAdminRoute && !isUserRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = decodeJWT(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isSellerRoute && payload.role !== "seller") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (isAdminRoute && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders-seller/:path*",
    "/products/:path*",
    "/statistics/:path*",
    "/chats/:path*",
    "/settings/:path*",
    "/dashboard-admin/:path*",
    "/users/:path*",
    "/sellers/:path*",
    "/orders-admin/:path*",
    "/withdrawals/:path*",
    "/vouchers/:path*",
    "/account/:path*",
    "/orders/:path*",
    "/wishlist/:path*",
    "/checkout/:path*",
  ],
};
