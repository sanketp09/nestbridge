import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export default function StatCard({ icon: Icon, label, value, change, changeType = 'up' }) {
  const positive = changeType === 'up'

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 hover-lift">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
          <Icon size={18} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            positive ? 'text-success' : 'text-alert'
          }`}
        >
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{change}</span>
        </div>
      </div>
      <p className="mt-4 text-muted text-sm">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-text">{value}</p>
    </div>
  )
}
