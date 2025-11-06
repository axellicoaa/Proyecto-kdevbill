"use client"

import { use, useEffect, useState } from "react"
import { fetchWithAuth } from "@/lib/api"
import Header from "@/components/Header"
import { DetailCardSkeleton, PageTitleSkeleton } from "@/components/skeleton-loaders"

export default function FacturaDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [factura, setFactura] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchWithAuth(`/invoices/${id}`).then((data) => {
      setFactura(data)
      setIsLoading(false)
    })
  }, [id])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background p-6 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {isLoading ? (
            <>
              <PageTitleSkeleton />
              <DetailCardSkeleton />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-foreground">Factura #{factura.id}</h1>

              <div className="border border-border p-6 rounded-lg bg-card shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-foreground">Cliente:</span>
                  <span className="text-foreground">{factura.customerName}</span>
                </div>
                <div className="flex justify-between items-start border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Plan:</span>
                  <span className="text-foreground">{factura.planName}</span>
                </div>
                <div className="flex justify-between items-start border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Monto:</span>
                  <span className="text-lg font-bold text-foreground">${factura.amount}</span>
                </div>
                <div className="flex justify-between items-start border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Estado:</span>
                  <span className="text-foreground">{factura.status}</span>
                </div>
                <div className="flex justify-between items-start border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Emitida:</span>
                  <span className="text-foreground text-sm">{factura.issuedAt}</span>
                </div>
                <div className="flex justify-between items-start border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Vencimiento:</span>
                  <span className="text-foreground text-sm">{factura.dueDate}</span>
                </div>
              </div>

              {factura.status === "OPEN" && (
                <button
                  className="w-full bg-green-600 text-white px-4 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
                  onClick={async () => {
                    await fetchWithAuth(`/invoices/${id}/pay`, { method: "POST" })
                    location.reload()
                  }}
                >
                  Pagar Factura
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
