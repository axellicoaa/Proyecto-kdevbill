"use client"

import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { fetchWithAuth } from "@/lib/api"
import Header from "@/components/Header"

export default function PlanesPage() {
  const { role } = useAuth()
  const [planes, setPlanes] = useState([])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [form, setForm] = useState({
    name: "",
    priceMonthly: 0,
    priceYearly: 0,
    billingCycle: "MONTHLY",
  })

  const [editPlanId, setEditPlanId] = useState<number | null>(null)

  const loadPlanes = () => fetchWithAuth("/plans").then(setPlanes)

  useEffect(() => {
    loadPlanes()
  }, [])

  const crearPlan = async () => {
    await fetchWithAuth("/plans", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
    setShowCreateModal(false)
    loadPlanes()
  }

  const abrirEditar = (plan: any) => {
    setEditPlanId(plan.id)
    setForm({
      name: plan.name,
      priceMonthly: plan.priceMonthly,
      priceYearly: plan.priceYearly,
      billingCycle: plan.billingCycle,
    })
    setShowEditModal(true)
  }

  const guardarCambios = async () => {
    await fetchWithAuth(`/plans/${editPlanId}`, {
      method: "PUT",
      body: JSON.stringify({ ...form, active: true }),
      headers: { "Content-Type": "application/json" },
    })
    setShowEditModal(false)
    loadPlanes()
  }

  const eliminarPlan = async (id: number) => {
    await fetchWithAuth(`/plans/${id}`, { method: "DELETE" })
    loadPlanes()
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Catálogo de Planes</h1>
              <p className="text-gray-600 mt-2">Gestiona los planes de suscripción disponibles</p>
            </div>

            {role === "ADMIN" && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                + Crear Plan
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planes.map((p: any) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{p.name}</h3>
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                        {p.billingCycle === "MONTHLY" ? "Mensual" : "Anual"}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-300 mb-1">ID</div>
                      <div className="text-sm font-mono bg-white/10 px-2 py-1 rounded">{p.id}</div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Pricing */}
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-gray-600 font-medium">Precio Mensual</span>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-gray-900">${p.priceMonthly}</span>
                        <span className="text-gray-500 text-sm ml-1">/mes</span>
                      </div>
                    </div>

                    <div className="h-px bg-gray-200"></div>

                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-gray-600 font-medium">Precio Anual</span>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-gray-900">${p.priceYearly}</span>
                        <span className="text-gray-500 text-sm ml-1">/año</span>
                      </div>
                    </div>

                    {/* Savings badge if yearly is cheaper */}
                    {p.priceYearly < p.priceMonthly * 12 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                        <span className="text-green-700 text-xs font-semibold">
                          Ahorra ${(p.priceMonthly * 12 - p.priceYearly).toFixed(2)} al año
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {role === "ADMIN" && (
                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => abrirEditar(p)}
                        className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarPlan(p.id)}
                        className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors duration-200 border border-red-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {planes.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay planes disponibles</h3>
              <p className="text-gray-600">Crea tu primer plan para comenzar</p>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <Modal
          title="Crear Plan"
          onClose={() => setShowCreateModal(false)}
          onSubmit={crearPlan}
          form={form}
          setForm={setForm}
        />
      )}

      {showEditModal && (
        <Modal
          title="Editar Plan"
          onClose={() => setShowEditModal(false)}
          onSubmit={guardarCambios}
          form={form}
          setForm={setForm}
        />
      )}
    </>
  )
}

function Modal({ title, onClose, onSubmit, form, setForm }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Plan</label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Ej: Plan Premium"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio Mensual ($)</label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200"
              type="number"
              placeholder="0.00"
              value={form.priceMonthly}
              onChange={(e) => setForm({ ...form, priceMonthly: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio Anual ($)</label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200"
              type="number"
              placeholder="0.00"
              value={form.priceYearly}
              onChange={(e) => setForm({ ...form, priceYearly: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ciclo de Facturación</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-white"
              value={form.billingCycle}
              onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}
            >
              <option value="MONTHLY">Mensual</option>
              <option value="YEARLY">Anual</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
