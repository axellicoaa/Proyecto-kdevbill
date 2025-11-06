"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { fetchWithAuth } from "@/lib/api"
import SubscriptionsBarChart from "@/components/SubscriptionsBarChart"
import Header from "@/components/Header"

export default function Dashboard() {
  const { user, role, logout } = useAuth()

  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchWithAuth("/stats")
        setStats(data)
      } catch (error) {
        console.error("Error cargando stats:", error)
      }
    }
    loadStats()
  }, [])

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8 animate-pulse">
            <div className="h-10 bg-neutral-300/50 rounded-lg w-64"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="h-5 bg-neutral-300/50 rounded w-32 mb-4"></div>
                  <div className="h-10 bg-neutral-300/50 rounded w-40"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">Dashboard</h1>
            <p className="text-lg text-neutral-600">
              Bienvenido de vuelta, <span className="font-semibold text-neutral-900">{user}</span>
            </p>
          </div>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl shadow-md">
            <div
              className={`w-2.5 h-2.5 rounded-full ${role === "ADMIN" ? "bg-neutral-900" : "bg-neutral-600"} animate-pulse`}
            ></div>
            <span className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">{role}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <KpiCard
            title="Suscripciones"
            value={stats.subscriptions}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />

          <KpiCard
            title="Facturas Abiertas"
            value={stats.invoicesOpen}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
          />

          <KpiCard
            title="Pagos Realizados"
            value={stats.payments}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
          />

          {/* ADMIN → mostrar ingresos */}
          {role === "ADMIN" && (
            <KpiCard
              title="Ingresos Totales"
              value={`$${stats.revenue.toFixed(2)}`}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
          )}

          {/* USER → recordar próxima factura */}
{/*           {role === "USER" && stats.nextInvoiceDate && (
            <KpiCard
              title="Próxima Factura"
              value={stats.nextInvoiceDate}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
            />
          )} */}
        </div>

        {role === "USER" && (
          <div className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900">Resumen de Cuenta</h3>
                <p className="text-sm text-neutral-600 mt-0.5">Información general de tu cuenta</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-xl p-5 border border-neutral-200 shadow-sm">
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-2">Estado</p>
                <p className="text-xl font-bold text-neutral-900">Activo</p>
              </div>
              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-xl p-5 border border-neutral-200 shadow-sm">
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-2">Suscripciones</p>
                <p className="text-xl font-bold text-neutral-900">{stats.subscriptions}</p>
              </div>
              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-xl p-5 border border-neutral-200 shadow-sm">
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-2">Pagos Totales</p>
                <p className="text-xl font-bold text-neutral-900">{stats.payments}</p>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN → Gráfico Suscripciones por Plan */}
        {role === "ADMIN" && stats.subscriptionsByPlan && <SubscriptionsBarChart data={stats.subscriptionsByPlan} />}
      </div>
    </div>
  )
}

/* Redesigned KPI card component with elegant neutral styling */
function KpiCard({
  title,
  value,
  icon,
}: {
  title: string
  value: any
  icon?: React.ReactNode
}) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-neutral-300 transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <p className="text-sm text-neutral-600 font-semibold uppercase tracking-wider mb-3">{title}</p>
          <h2 className="text-4xl font-bold text-neutral-900 tracking-tight">{value}</h2>
        </div>
        {icon && (
          <div className="w-14 h-14 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
            {icon}
          </div>
        )}
      </div>
      <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-neutral-700 to-neutral-900 w-full rounded-full"></div>
      </div>
    </div>
  )
}
