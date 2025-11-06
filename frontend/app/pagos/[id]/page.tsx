"use client"

import { useEffect, useState } from "react"
import { fetchWithAuth } from "@/lib/api"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import { DetailCardSkeleton, PageTitleSkeleton } from "@/components/skeleton-loaders"

export default function PagoDetalle() {
  const { id } = useParams()
  const [payment, setPayment] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchWithAuth(`/payments/${id}`).then((data) => {
      setPayment(data)
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
              <h1 className="text-2xl font-bold text-foreground">Detalle del Pago ID #{payment.id}</h1>

              <div className="border border-border p-6 rounded-lg bg-card shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-foreground">Cliente:</span>
                  <span className="text-foreground">{payment.customerName}</span>
                </div>
                <div className="flex justify-between items-start border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Plan:</span>
                  <span className="text-foreground">{payment.planName}</span>
                </div>
                <div className="flex justify-between items-start border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Monto:</span>
                  <span className="text-lg font-bold text-foreground">${payment.amount}</span>
                </div>
                <div className="flex justify-between items-start border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Método:</span>
                  <span className="text-foreground">{payment.method}</span>
                </div>
                <div className="flex justify-between items-start border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Estado:</span>
                  <span className="text-foreground">{payment.status}</span>
                </div>
                <div className="flex justify-between items-start border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Fecha:</span>
                  <span className="text-foreground text-sm">{payment.paidAt}</span>
                </div>
                <div className="flex justify-between items-start border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Referencia:</span>
                  <span className="font-mono text-sm text-foreground">{payment.reference}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
