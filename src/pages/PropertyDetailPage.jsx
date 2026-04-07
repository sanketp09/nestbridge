import { useMemo, useState } from 'react'
import {
  Bath,
  BedDouble,
  Calendar,
  CircleCheck,
  MapPin,
  MoveRight,
  Phone,
  Ruler,
  Star
} from 'lucide-react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'
import { properties } from '../data/properties'

const tabs = ['Overview', 'Amenities', 'Location', 'Reviews']

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function PropertyDetailPage() {
  const { id } = useParams()
  const property = properties.find((item) => item.id === Number(id))
  const [activeTab, setActiveTab] = useState('Overview')
  const [openModal, setOpenModal] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [loanAmount, setLoanAmount] = useState(property?.price || 15000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenureYears, setTenureYears] = useState(20)

  const related = useMemo(
    () => properties.filter((item) => item.id !== Number(id)).slice(0, 3),
    [id]
  )

  if (!property) {
    return (
      <div className="min-h-screen grid place-items-center text-text">
        Property not found.
      </div>
    )
  }

  const monthlyRate = interestRate / 12 / 100
  const months = tenureYears * 12
  const emi =
    (loanAmount * monthlyRate * (1 + monthlyRate) ** months) /
    ((1 + monthlyRate) ** months - 1)

  const handleBuyNow = async () => {
    setIsPaying(true)
    const loaded = await loadRazorpayScript()

    if (!loaded) {
      alert('Razorpay SDK failed to load. Please check your internet connection and try again.')
      setIsPaying(false)
      return
    }

    const bookingAmount = Math.max(100, Math.round(property.price * 0.001))
    const razorpayKey =
      import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_SN9ToEu8MxPPXc'

    const options = {
      key: razorpayKey,
      amount: bookingAmount * 100,
      currency: 'INR',
      name: 'NestBridge',
      description: `Booking Token for ${property.title}`,
      image: '/favicon.svg',
      prefill: {
        name: 'Demo Buyer',
        email: 'buyer.demo@nestbridge.in',
        contact: '9876543210'
      },
      theme: {
        color: '#C9A84C'
      },
      notes: {
        propertyId: String(property.id),
        propertyTitle: property.title,
        location: property.location
      },
      handler: function (response) {
        alert(
          `Test payment successful. Payment ID: ${response.razorpay_payment_id}`
        )
      },
      modal: {
        ondismiss: function () {
          setIsPaying(false)
        }
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.on('payment.failed', function (response) {
      alert(`Payment failed: ${response.error.description}`)
      setIsPaying(false)
    })
    paymentObject.open()
    setIsPaying(false)
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <section>
            <div className="rounded-3xl overflow-hidden border border-border">
              <img src={property.image} alt={property.title} className="w-full h-[440px] object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-3">
              {[0, 1, 2, 3].map((idx) => (
                <img
                  key={idx}
                  src={properties[(property.id + idx) % properties.length].image}
                  alt="Gallery"
                  className="h-24 w-full rounded-xl object-cover border border-border"
                />
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="font-display text-4xl text-text">{property.title}</h1>
                  <p className="mt-2 text-muted flex items-center gap-1"><MapPin size={15} /> {property.location}</p>
                </div>
                {property.verified && (
                  <span className="rounded-full bg-success/15 text-success px-3 py-1 text-xs flex items-center gap-1 border border-success/40">
                    <CircleCheck size={12} /> Verified Listing
                  </span>
                )}
              </div>

              <p className="mt-5 text-gold text-4xl font-semibold">{property.priceDisplay}</p>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs text-muted">
                <div className="chip"><BedDouble size={13} /> {property.beds || '-'} Beds</div>
                <div className="chip"><Bath size={13} /> {property.baths || '-'} Baths</div>
                <div className="chip"><Ruler size={13} /> {property.sqft} Sq.Ft</div>
                <div className="chip">Type: {property.type}</div>
                <div className="chip"><Calendar size={13} /> {property.postedDate}</div>
              </div>

              <div className="mt-7 border-b border-border flex gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      activeTab === tab ? 'bg-gold text-black' : 'text-muted hover:text-text'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-5 text-sm text-muted leading-relaxed">
                {activeTab === 'Overview' && <p>{property.description}</p>}

                {activeTab === 'Amenities' && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="rounded-xl border border-border px-3 py-2 text-text">
                        {amenity}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Location' && (
                  <iframe
                    title="Map"
                    className="w-full h-72 rounded-xl border border-border"
                    loading="lazy"
                    src="https://maps.google.com/maps?q=19.076,72.8777&z=12&output=embed"
                  />
                )}

                {activeTab === 'Reviews' && (
                  <div className="space-y-4">
                    {[
                      { name: 'Rhea Malhotra', text: 'Excellent documentation support and very responsive agent communication.' },
                      { name: 'Vikram Joshi', text: 'Property details were accurate and the virtual tour was professionally handled.' },
                      { name: 'Siddharth N', text: 'Negotiation process was smooth and transparent throughout the deal.' }
                    ].map((review) => (
                      <article key={review.name} className="rounded-xl border border-border p-4">
                        <div className="flex gap-1 text-lightGold mb-2">
                          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <p className="text-muted">{review.text}</p>
                        <p className="text-text mt-2 text-xs">{review.name}</p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-4 lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="h-14 w-14 rounded-full bg-border" />
              <p className="mt-3 text-text font-medium">{property.agent}</p>
              <p className="text-sm text-muted">Agent Rating: {property.agentRating} / 5</p>
              <p className="mt-2 text-sm text-muted flex items-center gap-2"><Phone size={14} /> +91 98765 43210</p>
              <button onClick={() => setOpenModal(true)} className="btn-gold w-full mt-4">Schedule a Visit</button>
              <button className="w-full mt-2 rounded-xl border border-gold px-4 py-2.5 text-sm text-gold hover:bg-gold hover:text-black transition">Make an Offer</button>
              <button
                onClick={handleBuyNow}
                disabled={isPaying}
                className="w-full mt-2 rounded-xl bg-gold px-4 py-2.5 text-sm text-black font-semibold hover:bg-lightGold transition disabled:opacity-70"
              >
                {isPaying ? 'Launching Razorpay...' : 'Buy Now'}
              </button>
              <p className="mt-2 text-[11px] text-muted">
                Test booking token: ₹{Math.max(100, Math.round(property.price * 0.001)).toLocaleString('en-IN')}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-text font-display text-2xl">EMI Calculator</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="text-muted mb-1">Loan Amount</p>
                  <input type="number" className="input-dark" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value) || 0)} />
                </div>
                <div>
                  <p className="text-muted mb-1">Interest Rate (%)</p>
                  <input type="number" className="input-dark" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value) || 0)} />
                </div>
                <div>
                  <p className="text-muted mb-1">Tenure (Years)</p>
                  <input type="number" className="input-dark" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value) || 0)} />
                </div>
              </div>
              <p className="mt-4 text-muted text-xs">Monthly EMI</p>
              <p className="text-gold text-2xl font-semibold">₹{Number.isFinite(emi) ? emi.toLocaleString('en-IN', { maximumFractionDigits: 0 }) : '0'}</p>
            </div>
          </aside>
        </div>

        <section className="mt-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-3xl text-text">Related Properties</h2>
            <button className="text-gold text-sm flex items-center gap-2">Explore More <MoveRight size={15} /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((item) => <PropertyCard key={item.id} property={item} />)}
          </div>
        </section>
      </main>

      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-display text-2xl text-text">Schedule a Visit</h3>
            <p className="text-muted text-sm mt-1">Choose your preferred date and time.</p>
            <div className="mt-4 space-y-3">
              <input className="input-dark" placeholder="Full Name" />
              <input className="input-dark" placeholder="Phone Number" />
              <input type="date" className="input-dark" />
              <input type="time" className="input-dark" />
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setOpenModal(false)} className="flex-1 rounded-xl border border-border px-4 py-2 text-sm text-text">Cancel</button>
              <button onClick={() => setOpenModal(false)} className="flex-1 btn-gold">Confirm</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
