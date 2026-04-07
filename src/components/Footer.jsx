import { Globe, Mail, MessageCircle, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-[#121621]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className="font-display text-xl text-text">NestBridge</h4>
          <p className="mt-3 text-sm text-muted">
            Premium real estate commerce for modern buyers, investors, and agents.
          </p>
        </div>
        <div>
          <h5 className="text-sm text-text mb-3">Explore</h5>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/properties" className="hover:text-text">Buy Properties</Link></li>
            <li><Link to="/properties" className="hover:text-text">Rent Properties</Link></li>
            <li><Link to="/dashboard/buyer" className="hover:text-text">Buyer Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm text-text mb-3">Business</h5>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/dashboard/seller" className="hover:text-text">Seller Dashboard</Link></li>
            <li><Link to="/dashboard/admin" className="hover:text-text">Admin Dashboard</Link></li>
            <li><a href="#" className="hover:text-text">Partner Program</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm text-text mb-3">Connect</h5>
          <div className="flex gap-2">
            {[Globe, Mail, MessageCircle, PhoneCall].map((Icon, idx) => (
              <span key={idx} className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition">
                <Icon size={16} />
              </span>
            ))}
          </div>
          <div className="mt-4 text-xs text-muted space-y-1">
            <p><a href="#" className="hover:text-text">Privacy Policy</a></p>
            <p><a href="#" className="hover:text-text">Terms of Service</a></p>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        Copyright 2026 NestBridge Real Estate Commerce. All rights reserved.
      </div>
    </footer>
  )
}
