import { Building2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Buy', to: '/properties' },
  { label: 'Rent', to: '/properties?status=For%20Rent' },
  { label: 'Sell', to: '/dashboard/seller' },
  { label: 'About', to: '/home#about' },
  { label: 'Blog', to: '/home#blog' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur border-b border-gold/60' : 'bg-bg/80 border-b border-border'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/home" className="flex items-center gap-2 font-display text-2xl text-text">
          <Building2 className="text-gold" size={24} />
          NestBridge
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm text-muted">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`hover:text-text transition ${pathname === item.to ? 'text-text' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/dashboard/admin"
            className="rounded-xl border border-border px-3 sm:px-4 py-2 text-sm text-text hover:border-gold transition"
          >
            Sign In as Admin
          </Link>
          <Link
            to="/dashboard/seller"
            className="rounded-xl bg-gold px-3 sm:px-4 py-2 text-sm text-black font-semibold hover:bg-lightGold transition"
          >
            List Property
          </Link>
        </div>
      </div>
    </header>
  )
}
