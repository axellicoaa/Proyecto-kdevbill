"use client"
import { useState, useEffect } from "react"
import { fetchWithAuth, postWithAuth } from "@/lib/api"
import Header from "@/components/Header"
import { useAuth } from "@/context/AuthContext"

export default function GestionClientes() {
  const [clientes, setClientes] = useState([])
  const [search, setSearch] = useState("")
  const [form, setForm] = useState({ name: "", email: "", ownerId: ""})
  const { role } = useAuth() // ✅ solo user
  

  const refresh = () => fetchWithAuth("/customers").then(setClientes)

  useEffect(() => {
    refresh()
  }, [])

  const crearCliente = async () => {
    await postWithAuth("/customers", {
      name: form.name,
      email: form.email,
      ownerId: Number(form.ownerId),
    })
    setForm({ name: "", email: "", ownerId: ""}) // limpiar inputs
    refresh() // ✅ actualizar tabla sin recargar
  }

  // ✅ Filtrar clientes
  const filtered = clientes.filter((c: any) =>
    `${c.name} ${c.email} ${c.ownerUsername}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gestión de Clientes</h1>
              <span className="px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                Admin
              </span>
            </div>
            <p className="text-gray-600">Administra todos los clientes del sistema</p>
          </div>

          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre, email o owner..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Crear Nuevo Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <input
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                placeholder="Owner ID"
                type="number"
                value={form.ownerId}
                onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
              />



              <button
                onClick={crearCliente}
                className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-sm flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear Cliente
              </button>
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
                      Nombre
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Owner
                    </th>

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filtered.length === 0 ? (
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <p className="text-gray-500 font-medium">No se encontraron clientes</p>
                          <p className="text-gray-400 text-sm">Crea tu primer cliente usando el formulario</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((c: any) => (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#{c.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{c.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{c.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {c.ownerUsername}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 px-2">
            <p>
              Mostrando <span className="font-semibold text-gray-900">{filtered.length}</span> de{" "}
              <span className="font-semibold text-gray-900">{clientes.length}</span> clientes
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
