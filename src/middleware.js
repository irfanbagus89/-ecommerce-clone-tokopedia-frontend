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

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const sellerRoutes = [
    "/dashboard",
    "/orders",
    "/products",
    "/statistics",
    "/chats",
  ];

  const isSellerRoute = sellerRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Kalau bukan route seller → bebas
  if (!isSellerRoute) {
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

  if (payload.role !== "seller") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/statistics/:path*",
    "/chats/:path*",
  ],
};
