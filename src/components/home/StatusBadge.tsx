export function StatusBadge({ status }: { status: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border-color bg-bg-elevated px-3 py-1 text-sm text-text-primary shadow-sm mb-6">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
      </span>
      {status}
    </div>
  )
}
