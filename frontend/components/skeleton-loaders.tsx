export function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
      <table className="w-full">
        <thead className="bg-secondary border-b border-border">
          <tr>
            <th className="p-4 text-left h-4 bg-muted rounded animate-pulse" />
            <th className="p-4 text-left h-4 bg-muted rounded animate-pulse" />
            <th className="p-4 text-left h-4 bg-muted rounded animate-pulse" />
            <th className="p-4 text-left h-4 bg-muted rounded animate-pulse" />
            <th className="p-4 text-left h-4 bg-muted rounded animate-pulse" />
            <th className="p-4 text-center h-4 bg-muted rounded animate-pulse" />
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b border-border">
              <td className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse" />
              </td>
              <td className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse" />
              </td>
              <td className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse" />
              </td>
              <td className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse" />
              </td>
              <td className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse" />
              </td>
              <td className="p-4 text-center">
                <div className="h-8 w-24 bg-muted rounded animate-pulse mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DetailCardSkeleton() {
  return (
    <div className="border border-border p-6 rounded-lg bg-card shadow-sm space-y-3">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="flex justify-between items-start">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export function PageTitleSkeleton() {
  return <div className="h-9 w-48 bg-muted rounded animate-pulse" />
}
