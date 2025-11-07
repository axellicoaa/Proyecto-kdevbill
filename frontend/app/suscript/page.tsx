"use client"

import { useEffect, useState } from "react"
import { fetchWithAuth } from "@/lib/api"
import Header from "@/components/Header"
import { useToast } from "@/context/ToastContext";


export default function SuscripcionesPage() {
  const [subs, setSubs] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showRenewModal, setShowRenewModal] = useState(false)
  const [selectedSub, setSelectedSub] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState("ALL")
  const { showToast } = useToast();

  const [form, setForm] = useState({
    customerId: "",
    planId: "",
    billingCycle: "MONTHLY",
    status: "ACTIVE",
  })

  useEffect(() => {
    fetchWithAuth("/subscriptions").then(setSubs)
  }, [])

  const refresh = () => fetchWithAuth("/subscriptions").then(setSubs)

  const handleRequest = async (callback: () => Promise<any>, successMessage: string) => {
    try {
      await callback();
      showToast(successMessage, "success");
      refresh();
    } catch (err: any) {
      showToast(err.message || "Ocurrió un error", "error");
    }
  };

  const createSub = () =>
    handleRequest(
      () =>
        fetchWithAuth("/subscriptions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }),
      "Suscripción creada exitosamente ✅"
    ).then(() => setShowCreateModal(false));

  const updateSub = () =>
    handleRequest(
      () =>
        fetchWithAuth(`/subscriptions/${selectedSub.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newPlanId: form.planId || null,
            newBillingCycle: form.billingCycle || null,
            newStatus: form.status || selectedSub.status,
          }),
        }),
      "Suscripción actualizada ✅"
    ).then(() => setShowEditModal(false));

  const renewSub = () =>
    handleRequest(
      () =>
        fetchWithAuth(`/subscriptions/${selectedSub.id}/renew`, {
          method: "POST",
        }),
      "Suscripción renovada y factura generada 💳✅"
    ).then(() => setShowRenewModal(false));

  const filteredSubs = subs.filter((s: any) => (filterStatus === "ALL" ? true : s.status === filterStatus))

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIVE: "bg-green-100 text-green-700 border-green-200",
      PAUSED: "bg-yellow-100 text-yellow-700 border-yellow-200",
      CANCELED: "bg-red-100 text-red-700 border-red-200",
    }
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-700 border-gray-200"
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Suscripciones</h1>
              <p className="text-gray-600 mt-2">Gestiona todas las suscripciones activas</p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              + Nueva Suscripción
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <div className="flex flex-wrap gap-3 items-center">
              <label className="font-medium text-gray-700">Filtrar por estado:</label>
              <div className="flex gap-2">
                {["ALL", "ACTIVE", "PAUSED", "CANCELED"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${filterStatus === status
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {status === "ALL"
                      ? "Todos"
                      : status === "ACTIVE"
                        ? "Activos"
                        : status === "PAUSED"
                          ? "Pausados"
                          : "Cancelados"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Cliente</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Plan</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Próx. Facturación</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Owner</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Monthly/Yearly</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {filteredSubs.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <div className="text-gray-400 mb-3">
                          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-600 font-medium">No hay suscripciones con este estado</p>
                      </td>
                    </tr>
                  )}

                  {filteredSubs.map((s: any) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-gray-900">#{s.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{s.customerName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{s.planName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(s.status)}`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{s.nextBillingDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{s.ownerUsername}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          ${s.billingCycle === "MONTHLY" ? s.monthlyPrice : s.yearlyPrice}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          {s.billingCycle === "MONTHLY" ? "Mensual" : "Anual"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                            onClick={() => {
                              setSelectedSub(s)
                              setShowEditModal(true)
                            }}
                          >
                            Editar
                          </button>

                          <button
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors duration-200"
                            onClick={() => {
                              setSelectedSub(s)
                              setShowRenewModal(true)
                            }}
                          >
                            Renovar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <Modal title="Crear Suscripción" close={() => setShowCreateModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Cliente</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Ingrese el ID del cliente"
                onChange={(e) => setForm({ ...form, customerId: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Plan</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Ingrese el ID del plan"
                onChange={(e) => setForm({ ...form, planId: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ciclo de Facturación</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-white"
                onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}
              >
                <option value="MONTHLY">Mensual</option>
                <option value="YEARLY">Anual</option>
              </select>
            </div>
            <button
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
              onClick={createSub}
            >
              Guardar
            </button>
          </div>
        </Modal>
      )}

      {showEditModal && selectedSub && (
        <Modal title={`Editar Suscripción #${selectedSub.id}`} close={() => setShowEditModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nuevo Plan</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200"
                placeholder={`Plan actual: ${selectedSub.planName}`}
                onChange={(e) => setForm({ ...form, planId: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ciclo de Facturación</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-white"
                defaultValue={selectedSub.billingCycle}
                onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}
              >
                <option value="MONTHLY">Mensual</option>
                <option value="YEARLY">Anual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-white"
                defaultValue={selectedSub.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="ACTIVE">Activo</option>
                <option value="PAUSED">Pausado</option>
                <option value="CANCELED">Cancelado</option>
              </select>
            </div>
            <button
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
              onClick={updateSub}
            >
              Guardar Cambios
            </button>
          </div>
        </Modal>
      )}

      {showRenewModal && selectedSub && (
        <Modal title={`Renovar Suscripción #${selectedSub.id}`} close={() => setShowRenewModal(false)}>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm leading-relaxed">
                Esto generará una factura pendiente de pago para el próximo ciclo de facturación.
              </p>
            </div>
            <button
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
              onClick={renewSub}
            >
              Confirmar Renovación
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

function Modal({ title, children, close }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button onClick={close} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">{children}</div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 px-6 py-4">
          <button
            className="w-full px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            onClick={close}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
