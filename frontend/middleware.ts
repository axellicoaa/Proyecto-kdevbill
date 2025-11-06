import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // <- El JWT almacenado en cookie

  // Rutas que requieren autenticación
  const protectedRoutes = ["/dashboard", "/customers", "/suscript", "/planes", "/customers/gestion"];

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    // Si intenta entrar a una ruta protegida sin token → enviar a login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/customers/:path*",
    "/suscript/:path*",
    "/planes/:path*",
    "/customers/gestion/:path*",

  ],
};
