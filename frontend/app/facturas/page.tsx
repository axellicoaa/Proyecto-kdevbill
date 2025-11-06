"use client"
import { useEffect, useState } from "react"
import { fetchWithAuth } from "@/lib/api"
import Header from "@/components/Header"
import { TableSkeleton } from "@/components/skeleton-loaders"

export default function FacturasPage() {
  const [invoices, setInvoices] = useState([])
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchWithAuth("/invoices").then((data) => {
      setInvoices(data)
      setIsLoading(false)
    })
  }, [])

  const filtered = invoices
    .filter((i: any) => filterStatus === "ALL" || i.status === filterStatus)
    .sort((a: any, b: any) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime())

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Facturas</h1>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="font-medium text-foreground">Filtrar por estado:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="ALL">Todas</option>
              <option value="OPEN">Pendientes</option>
              <option value="PAID">Pagadas</option>
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
                    <th className="p-4 text-left font-semibold">Estado</th>
                    <th className="p-4 text-left font-semibold">Fecha</th>
                    <th className="p-4 text-center font-semibold">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-muted-foreground">
                        No hay facturas
                      </td>
                    </tr>
                  )}

                  {filtered.map((i: any) => (
                    <tr key={i.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4 text-foreground">{i.id}</td>
                      <td className="p-4 text-foreground">{i.customerName}</td>
                      <td className="p-4 text-foreground font-medium">${i.amount}</td>
                      <td className="p-4 text-foreground">{i.status}</td>
                      <td className="p-4 text-foreground text-sm">{i.issuedAt}</td>

                      <td className="p-4 text-center space-x-2">
                        <a
                          href={`/facturas/${i.id}`}
                          className="inline-block px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          Ver Detalle
                        </a>

                        {i.status === "OPEN" && (
                          <button
                            onClick={async () => {
                              await fetchWithAuth(`/invoices/${i.id}/pay`, { method: "POST" })
                              fetchWithAuth("/invoices").then(setInvoices)
                            }}
                            className="inline-block px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                          >
                            Pagar
                          </button>
                        )}
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
