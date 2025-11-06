"use client"
import { useEffect, useState } from "react"
import { fetchWithAuth } from "@/lib/api"
import Header from "@/components/Header"
import Link from "next/link"
import { TableSkeleton } from "@/components/skeleton-loaders"

export default function PagosPage() {
  const [payments, setPayments] = useState([])
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchWithAuth("/payments").then((data) => {
      setPayments(data)
      setIsLoading(false)
    })
  }, [])

  const filtered = payments.filter((p: any) => (filterStatus === "ALL" ? true : p.status === filterStatus))

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Pagos</h1>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="font-medium text-foreground">Filtrar estado:</label>
            <select
              className="px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="ALL">Todos</option>
              <option value="SUCCESS">Pagados</option>
              <option value="FAILED">Fallidos</option>
            </select>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
              <table className="w-full">
                <thead className="bg-secondary text-foreground border-b border-border">
                  <tr>
                    <th className="p-4 text-left font-semibold">ID</th>
                    <th className="p-4 text-left font-semibold">Cliente</th>
                    <th className="p-4 text-left font-semibold">Monto</th>
                    <th className="p-4 text-left font-semibold">Método</th>
                    <th className="p-4 text-left font-semibold">Estado</th>
                    <th className="p-4 text-center font-semibold">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-muted-foreground">
                        No hay pagos registrados
                      </td>
                    </tr>
                  )}

                  {filtered.map((p: any) => (
                    <tr key={p.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4 text-foreground">{p.id}</td>
                      <td className="p-4 text-foreground">{p.customerName}</td>
                      <td className="p-4 text-foreground font-medium">${p.amount}</td>
                      <td className="p-4 text-foreground">{p.method}</td>
                      <td className="p-4 text-foreground">{p.status}</td>
                      <td className="p-4 text-center">
                        <Link
                          className="inline-block px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                          href={`/pagos/${p.id}`}
                        >
                          Ver Detalle
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
