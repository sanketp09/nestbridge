import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { properties } from '../data/properties'

export default function ReferralShowcasePage() {
  const [params] = useSearchParams()
  const referrer = params.get('ref') || 'NestBridge Member'
  const picks = properties.slice(0, 3)

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <section
          className="rounded-3xl border border-gold/30 p-8 sm:p-10"
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(13,15,20,.94), rgba(13,15,20,.75)), url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <p className="mono-label text-gold">Exclusive Invite</p>
          <h1 className="font-display text-5xl text-text mt-3">Premium Properties. Verified Deals. Zero Guesswork.</h1>
          <p className="mt-4 text-muted max-w-2xl">
            {referrer} has invited you to discover handpicked NestBridge listings with high-conviction investment potential,
            transparent pricing, and secure closing support.
          </p>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link to="/properties" className="btn-gold">Explore Full Inventory</Link>
            <Link to="/home" className="btn-outline">Visit Home Page</Link>
          </div>
        </section>

        <section className="mt-8 grid md:grid-cols-3 gap-5">
          {picks.map((item) => (
            <article key={item.id} className="rounded-2xl border border-border bg-surface overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-52 object-cover" />
              <div className="p-5">
                <p className="mono-label text-gold">Featured Pick</p>
                <h3 className="font-display text-2xl text-text mt-2">{item.title}</h3>
                <p className="text-sm text-muted mt-1">{item.location}</p>
                <p className="text-2xl text-gold mt-4">{item.priceDisplay}</p>
                <Link to={`/property/${item.id}`} className="inline-block mt-4 text-sm text-text hover:text-gold">
                  View Property
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
