import { useEffect, useMemo, useState } from 'react'
import {
  Bot,
  CircleCheck,
  Coins,
  Landmark,
  MoveRight,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Video
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import InviteFriendCard from '../components/InviteFriendCard'
import PropertyCard from '../components/PropertyCard'
import { properties } from '../data/properties'

const statTargets = [12400, 8200, 3100, 2400000000]

function Counter({ target, prefix = '', suffix = '' }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const duration = 1200
    const start = performance.now()

    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.floor(target * progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target])

  return (
    <span>
      {prefix}
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

export default function LandingPage() {
  const featured = useMemo(() => properties.slice(0, 6), [])

  return (
    <div>
      <Navbar />
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(13,15,20,.94), rgba(13,15,20,.55)), url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600)'
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 w-full">
          <p className="mono-label text-gold">Premium Real Estate Commerce</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl sm:text-6xl lg:text-7xl text-text leading-[1.05]">
            Find Your Perfect Space. Every Time.
          </h1>
          <p className="mt-6 max-w-2xl text-muted text-lg">
            Browse 12,000+ verified properties across India&apos;s fastest-growing cities with
            transparent pricing, trusted agents, and secure closing support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/properties" className="btn-gold">Explore Properties</Link>
            <Link to="/dashboard/seller" className="btn-outline">List Your Property</Link>
          </div>

          <div className="mt-12 max-w-5xl rounded-2xl border border-border bg-surface/90 backdrop-blur p-4 sm:p-5 grid sm:grid-cols-5 gap-3">
            <select className="input-dark"><option>Location</option><option>Mumbai</option><option>Pune</option><option>Bangalore</option><option>Delhi</option><option>Hyderabad</option></select>
            <select className="input-dark"><option>Type</option><option>Buy</option><option>Rent</option></select>
            <select className="input-dark"><option>Budget</option><option>₹50L - ₹1Cr</option><option>₹1Cr - ₹3Cr</option><option>₹3Cr+</option></select>
            <select className="input-dark"><option>Property</option><option>Apartment</option><option>Villa</option><option>Commercial</option></select>
            <button className="rounded-xl bg-gold text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-lightGold transition">
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 -mt-10 relative z-10">
        <div className="rounded-2xl border border-border bg-surface px-4 sm:px-8 py-5 grid md:grid-cols-4 gap-4">
          <div><p className="text-2xl text-text font-semibold"><Counter target={statTargets[0]} suffix="+" /></p><p className="text-xs text-muted">Properties</p></div>
          <div><p className="text-2xl text-text font-semibold"><Counter target={statTargets[1]} suffix="+" /></p><p className="text-xs text-muted">Happy Buyers</p></div>
          <div><p className="text-2xl text-text font-semibold"><Counter target={statTargets[2]} suffix="+" /></p><p className="text-xs text-muted">Verified Agents</p></div>
          <div><p className="text-2xl text-text font-semibold">₹<Counter target={240} suffix=" Cr+" /></p><p className="text-xs text-muted">Transactions</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <div className="flex items-end justify-between gap-4 mb-6">
          <h2 className="font-display text-4xl text-text">Premium Listings</h2>
          <Link to="/properties" className="text-gold flex items-center gap-2 text-sm">View all <MoveRight size={15} /></Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
          {featured.map((property) => (
            <div key={property.id} className="min-w-[310px] max-w-[310px] snap-start">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <h2 className="font-display text-4xl text-text mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 relative">
          {[
            { icon: Search, title: 'Browse Verified Listings', text: 'Access trusted inventory with transparent pricing, photos, and legal metadata.' },
            { icon: Video, title: 'Schedule a Virtual Tour', text: 'Connect with verified agents and evaluate spaces through guided live sessions.' },
            { icon: ShieldCheck, title: 'Close the Deal Securely', text: 'Finalize with escrow-backed payments and document support from legal experts.' }
          ].map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-border bg-surface p-6 fade-in-up" style={{ animationDelay: `${index * 120}ms` }}>
              <step.icon className="text-gold" />
              <h3 className="mt-4 text-xl text-text font-display">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <h2 className="font-display text-4xl text-text mb-8">Why NestBridge?</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: Bot, title: 'AI-Powered Recommendations', text: 'Context-aware suggestions based on lifestyle goals and investment horizon.' },
            { icon: Landmark, title: 'End-to-End Legal Assistance', text: 'Drafting, due diligence, and registry support by experienced legal partners.' },
            { icon: CircleCheck, title: '100% Verified Listings', text: 'Every listing undergoes ownership, photo, and locality verification checks.' },
            { icon: Coins, title: 'Secure Payment Gateway', text: 'Trusted payment rails with transaction tracking and milestone receipts.' }
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-surface p-6 hover-lift">
              <item.icon className="text-gold" />
              <h3 className="font-display text-2xl text-text mt-4">{item.title}</h3>
              <p className="mt-2 text-muted text-sm">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="blog" className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <h2 className="font-display text-4xl text-text mb-8">What Buyers Say</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              name: 'Ananya Deshpande',
              quote: 'NestBridge made our move from Pune to Bangalore smooth. Every listing was accurate and our advisor handled negotiations transparently.'
            },
            {
              name: 'Karan Bedi',
              quote: 'I used the platform for a commercial purchase in Delhi. The legal support and deal timeline visibility were genuinely impressive.'
            },
            {
              name: 'Mitali Shah',
              quote: 'From shortlist to closure, the experience felt premium. The verified agent ecosystem gave us real confidence during purchase.'
            }
          ].map((review) => (
            <article key={review.name} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center gap-1 text-lightGold">
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
              </div>
              <p className="mt-4 text-sm text-muted">{review.quote}</p>
              <p className="mt-4 text-text text-sm font-medium">{review.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <div className="rounded-3xl border border-gold/40 bg-gradient-to-r from-[#5a4716] via-[#8d7126] to-[#c9a84c] p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-black/80 mono-label">Start your next move</p>
            <h3 className="font-display text-4xl text-black">Ready to find your dream home?</h3>
          </div>
          <Link to="/properties" className="rounded-xl bg-black text-text px-5 py-3 text-sm hover:bg-[#1a1f2b] transition">
            Browse Properties
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-12">
        <InviteFriendCard />
      </section>

      <Footer />
    </div>
  )
}
