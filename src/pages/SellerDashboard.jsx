import { useState } from 'react'
import {
  BarChart3,
  BriefcaseBusiness,
  Crown,
  Gauge,
  LayoutDashboard,
  ListChecks,
  Wallet
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'

const menu = [
  { label: 'Overview', icon: LayoutDashboard, key: 'overview' },
  { label: 'My Listings', icon: ListChecks, key: 'listings' },
  { label: 'Leads', icon: BriefcaseBusiness, key: 'leads' },
  { label: 'Performance', icon: Gauge, key: 'performance' },
  { label: 'Subscription', icon: Crown, key: 'subscription' }
]

const inquiriesData = [
  { month: 'Jan', inquiries: 9 },
  { month: 'Feb', inquiries: 12 },
  { month: 'Mar', inquiries: 15 },
  { month: 'Apr', inquiries: 18 },
  { month: 'May', inquiries: 16 },
  { month: 'Jun', inquiries: 21 }
]

const listingPerformance = [
  { listing: 'Worli Apt', views: 980, inquiries: 42 },
  { listing: 'Baner Home', views: 760, inquiries: 31 },
  { listing: 'CP Office', views: 650, inquiries: 22 },
  { listing: 'NIBM Villa', views: 1120, inquiries: 49 }
]

export default function SellerDashboard() {
  const [active, setActive] = useState('overview')

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid lg:grid-cols-[260px_1fr] gap-6">
      <Sidebar items={menu} active={active} onSelect={setActive} />
      <section className="space-y-5">
        {active === 'overview' && (
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard icon={ListChecks} label="Active Listings" value="8" change="+1" />
            <StatCard icon={BriefcaseBusiness} label="Total Inquiries" value="143" change="+12" />
            <StatCard icon={BarChart3} label="Properties Sold" value="12" change="+2" />
            <StatCard icon={Wallet} label="Earnings This Month" value="₹1.24L" change="+9.4%" />
          </div>
        )}

        {active === 'listings' && (
          <div className="rounded-2xl border border-border bg-surface overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-muted border-b border-border">
                <tr><th className="text-left p-3">Property</th><th className="text-left p-3">Status</th><th className="text-left p-3">Views</th><th className="text-left p-3">Inquiries</th><th className="text-left p-3">Price</th><th className="text-left p-3">Actions</th></tr>
              </thead>
              <tbody>
                {[
                  ['Luxury Sea-View Apartment', 'Live', '980', '42', '₹4.5 Cr'],
                  ['Skyline Executive Apartment', 'Live', '760', '31', '₹2.3 Cr'],
                  ['Palm Crest Villa', 'Live', '1120', '49', '₹7.2 Cr'],
                  ['Corporate Office Tower', 'Paused', '650', '22', '₹4.25L/mo'],
                  ['Sunrise Development Plot', 'Live', '403', '12', '₹1.58 Cr'],
                  ['Lakefront Signature Apartment', 'Live', '851', '38', '₹3.1 Cr'],
                  ['Riverside Freehold Plot', 'Draft', '180', '4', '₹2.05 Cr'],
                  ['Orchard Edge Villa', 'Live', '572', '19', '₹1.65L/mo']
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-border/50">
                    {row.map((col, i) => <td key={i} className="p-3 text-muted">{col}</td>)}
                    <td className="p-3 text-muted"><button className="text-gold mr-2">Edit</button><button className="text-alert">Delist</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'leads' && (
          <div className="rounded-2xl border border-border bg-surface overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-muted border-b border-border">
                <tr><th className="text-left p-3">Name</th><th className="text-left p-3">Contact</th><th className="text-left p-3">Property Interested</th><th className="text-left p-3">Status</th><th className="text-left p-3">Date</th></tr>
              </thead>
              <tbody>
                {[
                  ['Rohit Agarwal', '+91 98xxxx901', 'Palm Crest Villa', 'Qualified', '2026-04-03'],
                  ['Meera Singh', '+91 99xxxx762', 'Skyline Executive Apartment', 'New', '2026-04-04'],
                  ['Nitin P', '+91 97xxxx240', 'Corporate Office Tower', 'Follow-up', '2026-04-05'],
                  ['Tanvi Shah', '+91 88xxxx462', 'Lakefront Signature Apartment', 'Qualified', '2026-04-06']
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-border/50">
                    {row.map((col, i) => <td key={i} className="p-3 text-muted">{col}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'performance' && (
          <div className="grid xl:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-surface p-4 h-80">
              <h3 className="text-text mb-2">Inquiries per Month</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={inquiriesData}>
                  <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                  <XAxis dataKey="month" stroke="#8A8FA8" />
                  <YAxis stroke="#8A8FA8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="inquiries" stroke="#C9A84C" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 h-80">
              <h3 className="text-text mb-2">Views vs Inquiries</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={listingPerformance}>
                  <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                  <XAxis dataKey="listing" stroke="#8A8FA8" />
                  <YAxis stroke="#8A8FA8" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="inquiries" fill="#C9A84C" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {active === 'subscription' && (
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="mono-label text-gold">Current Plan</p>
            <h3 className="font-display text-3xl text-text mt-2">Agent Pro - ₹4,999/mo</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted list-disc pl-5">
              <li>Up to 12 active listings</li>
              <li>Priority lead routing</li>
              <li>Advanced listing analytics</li>
              <li>CRM export and smart follow-up tools</li>
            </ul>
            <button className="btn-gold mt-5">Upgrade to Enterprise</button>
          </div>
        )}
      </section>
    </main>
  )
}
