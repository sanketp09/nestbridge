import { useState } from 'react'
import {
  Calendar,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Star,
  TableProperties,
  Wallet
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { properties } from '../data/properties'

const menu = [
  { label: 'Overview', icon: LayoutDashboard, key: 'overview' },
  { label: 'Saved Properties', icon: TableProperties, key: 'saved' },
  { label: 'Scheduled Visits', icon: Calendar, key: 'visits' },
  { label: 'My Offers', icon: Wallet, key: 'offers' },
  { label: 'Reviews', icon: Star, key: 'reviews' },
  { label: 'Settings', icon: Settings, key: 'settings' }
]

export default function BuyerDashboard() {
  const [active, setActive] = useState('overview')
  const saved = properties.slice(0, 4)

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid lg:grid-cols-[260px_1fr] gap-6">
      <Sidebar items={menu} active={active} onSelect={setActive} />

      <section className="space-y-5">
        {active === 'overview' && (
          <>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h1 className="font-display text-4xl text-text">Welcome back, Aarav</h1>
              <p className="text-muted mt-2">Track your shortlisted properties and offers in one place.</p>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard icon={TableProperties} label="Properties Saved" value="12" change="+2" />
              <StatCard icon={Calendar} label="Visits Scheduled" value="3" change="+1" />
              <StatCard icon={Wallet} label="Offers Made" value="2" change="0" />
              <StatCard icon={MessageSquare} label="Messages" value="5" change="+3" />
            </div>
          </>
        )}

        {active === 'saved' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {saved.map((property) => (
              <article key={property.id} className="rounded-2xl border border-border bg-surface p-4">
                <img src={property.image} alt={property.title} className="rounded-xl w-full h-44 object-cover" />
                <h3 className="text-text mt-3 font-medium">{property.title}</h3>
                <p className="text-xs text-muted">{property.location}</p>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-lg border border-border py-2 text-xs text-text">Remove</button>
                  <button className="flex-1 rounded-lg bg-gold py-2 text-xs text-black font-semibold">Schedule Visit</button>
                </div>
              </article>
            ))}
          </div>
        )}

        {active === 'visits' && (
          <div className="rounded-2xl border border-border bg-surface overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-muted border-b border-border">
                <tr>
                  <th className="text-left p-3">Property Name</th><th className="text-left p-3">Date</th><th className="text-left p-3">Time</th><th className="text-left p-3">Agent</th><th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Luxury Sea-View Apartment', '2026-04-12', '11:00', 'Rahul Mehta', 'Confirmed'],
                  ['Orchard Edge Villa', '2026-04-15', '15:30', 'Divya Reddy', 'Pending'],
                  ['Prime Retail Arcade', '2026-04-18', '10:15', 'Imran Shaikh', 'Confirmed']
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-border/60">
                    {row.map((col, i) => <td key={i} className="p-3 text-muted">{col}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'offers' && (
          <div className="rounded-2xl border border-border bg-surface overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-muted border-b border-border">
                <tr><th className="text-left p-3">Property</th><th className="text-left p-3">Offer Amount</th><th className="text-left p-3">Status</th><th className="text-left p-3">Date</th></tr>
              </thead>
              <tbody>
                {[
                  ['Skyline Executive Apartment', '₹2,05,00,000', 'Accepted', '2026-03-28'],
                  ['Lakefront Signature Apartment', '₹2,85,00,000', 'Pending', '2026-04-01'],
                  ['Sunrise Development Plot', '₹1,41,00,000', 'Rejected', '2026-04-03']
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-border/60">
                    {row.map((col, i) => <td key={i} className="p-3 text-muted">{col}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'reviews' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-text text-lg font-medium">Leave a Review</h3>
              <div className="flex gap-1 mt-3 text-lightGold">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} />)}
              </div>
              <textarea className="input-dark mt-3" rows="5" placeholder="Share your experience..." />
              <button className="btn-gold mt-3">Submit Review</button>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-text text-lg font-medium">Past Reviews</h3>
              <div className="mt-3 space-y-3 text-sm text-muted">
                <p>"Verified listings made decisions easier and faster."</p>
                <p>"Scheduling visits was smooth and transparent."</p>
                <p>"Agent follow-up improved after feedback submission."</p>
              </div>
            </div>
          </div>
        )}

        {active === 'settings' && (
          <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
            Account notifications, communication preferences, and privacy settings can be managed here.
          </div>
        )}
      </section>
    </main>
  )
}
