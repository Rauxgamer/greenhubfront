import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas protegidas
const protectedPaths = ["/admin", "/user", "/checkout"];

// Rutas públicas
const publicPaths = ["/login", "/signup", "/", "/products"];

// Simulación de validación del token (en ausencia de backend)
const validateToken = (token: string | undefined) => {
  // Aquí deberías hacer la validación real con tu backend posteriormente
  return Boolean(token); // Simula validación: token existente es válido
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;

  const isProtectedPath = protectedPaths.some((protectedPath) =>
    path.startsWith(protectedPath)
  );

  // Si accedes a una ruta protegida, verifica autenticación
  if (isProtectedPath) {
    if (!validateToken(token)) {
      // Si no es válido, limpia cookie y redirige al login
      response.cookies.delete("token");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Si ya está autenticado e intenta acceder a login o signup, redirige a /user
  if (token && ["/login", "/signup"].includes(path)) {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  return response;
}

// Aplicar middleware solo en rutas específicas y evitar estáticos y archivos
export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/checkout/:path*",
    "/login",
    "/signup",
  ],
};
