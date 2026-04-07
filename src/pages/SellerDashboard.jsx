import { useState } from 'react'
import {
  BarChart3,
  BriefcaseBusiness,
  CircleCheck,
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

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₹2,499',
    blurb: 'Best for first-time individual sellers',
    features: ['1 active listing', 'Standard lead visibility', 'Basic support', '7-day listing boost'],
    accent: 'from-[#7a5b1c] to-[#c9a84c]'
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '₹4,999',
    blurb: 'Great for frequent sellers and agents',
    features: ['5 active listings', 'Priority lead routing', 'Performance insights', 'Featured placement slots'],
    accent: 'from-[#164a4f] to-[#2bb7c6]'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹9,999',
    blurb: 'For teams and high-intent inventory',
    features: ['12 active listings', 'Top search visibility', 'Dedicated success manager', 'Advanced analytics + CRM export'],
    accent: 'from-[#38206d] to-[#8a59ff]'
  }
]

export default function SellerDashboard() {
  const [step, setStep] = useState('plans')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [active, setActive] = useState('overview')
  const [listingDraft, setListingDraft] = useState({
    flatName: '',
    location: '',
    propertyType: 'Apartment',
    intent: 'For Sale',
    askingPrice: '',
    furnished: 'Semi-Furnished',
    parking: 'Yes',
    legalDocsReady: 'Yes',
    possession: 'Immediate',
    notes: ''
  })

  const choosePlan = (plan) => {
    setSelectedPlan(plan)
    setStep('listingForm')
  }

  const onSubmitListing = (e) => {
    e.preventDefault()
    setStep('dashboard')
  }

  if (step === 'plans') {
    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="mono-label text-gold">List Property</p>
          <h1 className="font-display text-4xl text-text mt-2">Choose Your Subscription Plan</h1>
          <p className="text-sm text-muted mt-2">Pick a plan before creating your property listing. You can upgrade anytime from Seller Dashboard.</p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <article key={plan.id} className="rounded-2xl border border-border bg-bg overflow-hidden">
                <div className={`bg-gradient-to-r ${plan.accent} p-4`}>
                  <p className="mono-label text-black/80">{plan.name}</p>
                  <h3 className="text-3xl font-semibold text-black mt-1">{plan.price}</h3>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted">{plan.blurb}</p>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CircleCheck size={14} className="text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="btn-gold w-full mt-4" onClick={() => choosePlan(plan)}>
                    Select {plan.name}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (step === 'listingForm') {
    return (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="mono-label text-gold">Listing Intake</p>
          <h1 className="font-display text-4xl text-text mt-2">Tell Us About Your Property</h1>
          <p className="text-sm text-muted mt-2">Selected Plan: <span className="text-text">{selectedPlan?.name}</span></p>

          <form className="mt-6 grid sm:grid-cols-2 gap-4" onSubmit={onSubmitListing}>
            <div className="sm:col-span-2">
              <label className="text-xs text-muted">Flat Name</label>
              <input
                className="input-dark mt-1"
                value={listingDraft.flatName}
                onChange={(e) => setListingDraft((prev) => ({ ...prev, flatName: e.target.value }))}
                placeholder="Example: Skyline Executive Apartment"
                required
              />
            </div>

            <div>
              <label className="text-xs text-muted">Location</label>
              <input
                className="input-dark mt-1"
                value={listingDraft.location}
                onChange={(e) => setListingDraft((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Area, City"
                required
              />
            </div>

            <div>
              <label className="text-xs text-muted">Property Type</label>
              <select
                className="input-dark mt-1"
                value={listingDraft.propertyType}
                onChange={(e) => setListingDraft((prev) => ({ ...prev, propertyType: e.target.value }))}
              >
                <option>Apartment</option>
                <option>Villa</option>
                <option>Commercial</option>
                <option>Plot</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-muted">Listing Intent</label>
              <select
                className="input-dark mt-1"
                value={listingDraft.intent}
                onChange={(e) => setListingDraft((prev) => ({ ...prev, intent: e.target.value }))}
              >
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-muted">Asking Price</label>
              <input
                className="input-dark mt-1"
                value={listingDraft.askingPrice}
                onChange={(e) => setListingDraft((prev) => ({ ...prev, askingPrice: e.target.value }))}
                placeholder="₹ value"
                required
              />
            </div>

            <div>
              <label className="text-xs text-muted">Furnishing</label>
              <select
                className="input-dark mt-1"
                value={listingDraft.furnished}
                onChange={(e) => setListingDraft((prev) => ({ ...prev, furnished: e.target.value }))}
              >
                <option>Unfurnished</option>
                <option>Semi-Furnished</option>
                <option>Fully Furnished</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-muted">Parking Available?</label>
              <select
                className="input-dark mt-1"
                value={listingDraft.parking}
                onChange={(e) => setListingDraft((prev) => ({ ...prev, parking: e.target.value }))}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-muted">Legal Documents Ready?</label>
              <select
                className="input-dark mt-1"
                value={listingDraft.legalDocsReady}
                onChange={(e) => setListingDraft((prev) => ({ ...prev, legalDocsReady: e.target.value }))}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-muted">Possession Timeline</label>
              <select
                className="input-dark mt-1"
                value={listingDraft.possession}
                onChange={(e) => setListingDraft((prev) => ({ ...prev, possession: e.target.value }))}
              >
                <option>Immediate</option>
                <option>Within 3 months</option>
                <option>Within 6 months</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-muted">Additional Questions / Notes</label>
              <textarea
                className="input-dark mt-1"
                rows="4"
                value={listingDraft.notes}
                onChange={(e) => setListingDraft((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Mention society, nearby landmarks, key selling points, etc."
              />
            </div>

            <div className="sm:col-span-2 flex flex-wrap gap-2">
              <button type="button" className="rounded-xl border border-border px-4 py-2.5 text-sm text-text hover:border-gold" onClick={() => setStep('plans')}>
                Back to Plans
              </button>
              <button type="submit" className="btn-gold">
                Continue to Seller Dashboard
              </button>
            </div>
          </form>
        </div>
      </main>
    )
  }

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
            <h3 className="font-display text-3xl text-text mt-2">{selectedPlan ? `${selectedPlan.name} - ${selectedPlan.price}/mo` : 'Agent Pro - ₹4,999/mo'}</h3>
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
