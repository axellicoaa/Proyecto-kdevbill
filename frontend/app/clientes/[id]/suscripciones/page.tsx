"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fetchWithAuth } from "@/lib/api"
import Header from "@/components/Header"
import Link from "next/link"

export default function SuscripcionesCliente() {
  const { id } = useParams() // ✅ Aquí obtenemos el id correctamente
  const [subs, setSubs] = useState([])

  useEffect(() => {
    if (!id) return
    fetchWithAuth(`/subscriptions/customer/${id}`).then(setSubs)
  }, [id])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col gap-4">
            <Link
              href="/clientes"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 w-fit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Volver a Mis Clientes</span>
            </Link>

            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Suscripciones del Cliente</h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-900 text-white text-sm font-semibold rounded-lg">Cliente #{id}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fecha Inicio
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {subs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <svg
                            className="w-12 h-12 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <p className="text-gray-500 font-medium">Sin suscripciones</p>
                          <p className="text-gray-400 text-sm">Este cliente no tiene suscripciones activas</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    subs.map((s: any) => (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#{s.id}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-900 rounded-lg text-sm font-semibold">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            {s.planName}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{s.startDate}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                              s.status === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : s.status === "CANCELLED"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                s.status === "ACTIVE"
                                  ? "bg-green-500"
                                  : s.status === "CANCELLED"
                                    ? "bg-red-500"
                                    : "bg-gray-500"
                              }`}
                            />
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {subs.length > 0 && (
            <div className="flex items-center justify-between text-sm text-gray-600 px-2">
              <p>
                Total de <span className="font-semibold text-gray-900">{subs.length}</span>{" "}
                {subs.length === 1 ? "suscripción" : "suscripciones"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
