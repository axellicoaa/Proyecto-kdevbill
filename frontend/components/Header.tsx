"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function Header() {
  const { user, role, logout } = useAuth()

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight hover:text-neutral-700 transition-colors cursor-pointer">
            <Link href="/dashboard">KdevBill</Link>
          </h1>

          <nav className="hidden md:flex items-center gap-8">
            {/* Gestión de Clientes → Solo Admin */}
            {role === "ADMIN" && (
              <Link
                href="/clientes/gestion"
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-neutral-900 after:transition-all hover:after:w-full"
              >
                Gestión de Clientes
              </Link>
            )}

            {/* Clientes (User) */}
            {role === "USER" && (
              <Link
                href="/clientes"
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-neutral-900 after:transition-all hover:after:w-full"
              >
                Mis Clientes
              </Link>
            )}

            {/* Suscripciones → Ambos */}
            <Link
              href="/suscript"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-neutral-900 after:transition-all hover:after:w-full"
            >
              Suscripciones
            </Link>

            <Link
              href="/planes"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-neutral-900 after:transition-all hover:after:w-full"
            >
              Planes
            </Link>

            {/* Facturas → Ambos */}
            <Link
              href="/facturas"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-neutral-900 after:transition-all hover:after:w-full"
            >
              Facturas
            </Link>

            {/* Pagos → Ambos */}
            <Link
              href="/pagos"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-neutral-900 after:transition-all hover:after:w-full"
            >
              Pagos
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="w-10 h-10 bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">{user?.charAt(0).toUpperCase() || "U"}</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-neutral-900">{user}</p>
                <p className="text-xs text-neutral-600">{role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
