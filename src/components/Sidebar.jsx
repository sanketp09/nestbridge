export default function Sidebar({ items, active, onSelect }) {
  return (
    <aside className="w-full lg:w-64 bg-surface border border-border rounded-2xl p-3 h-fit lg:sticky lg:top-24">
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.key
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-l-4 transition ${
                isActive
                  ? 'border-gold text-text bg-gold/10'
                  : 'border-transparent text-muted hover:text-text hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
