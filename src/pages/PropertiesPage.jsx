import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'
import { properties } from '../data/properties'

const allTypes = ['Apartment', 'Villa', 'Plot', 'Commercial']

export default function PropertiesPage() {
  const [showQuestionFlow, setShowQuestionFlow] = useState(true)
  const [questionStep, setQuestionStep] = useState(1)
  const [answers, setAnswers] = useState({
    location: 'Mumbai',
    propertyType: 'Apartment',
    purpose: 'Investment',
    timeline: 'Within 3 months'
  })

  const [types, setTypes] = useState([])
  const [status, setStatus] = useState('All')
  const [city, setCity] = useState('All')
  const [budget, setBudget] = useState(100000000)
  const [beds, setBeds] = useState('Any')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

  const cities = useMemo(() => ['All', ...new Set(properties.map((p) => p.location.split(',').pop().trim()))], [])

  const toggleType = (type) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    )
  }

  const filtered = useMemo(() => {
    let list = [...properties]

    if (types.length) list = list.filter((p) => types.includes(p.type))
    if (status !== 'All') list = list.filter((p) => p.status === status)
    if (city !== 'All') list = list.filter((p) => p.location.includes(city))
    list = list.filter((p) => p.price <= budget)
    if (beds !== 'Any') {
      if (beds === '4+') list = list.filter((p) => p.beds >= 4)
      else list = list.filter((p) => p.beds === Number(beds))
    }
    if (verifiedOnly) list = list.filter((p) => p.verified)

    if (sortBy === 'priceAsc') list.sort((a, b) => a.price - b.price)
    if (sortBy === 'priceDesc') list.sort((a, b) => b.price - a.price)
    if (sortBy === 'newest') list.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
    if (sortBy === 'popular') list.sort((a, b) => b.agentRating - a.agentRating)

    return list
  }, [types, status, city, budget, beds, verifiedOnly, sortBy])

  const resetFilters = () => {
    setTypes([])
    setStatus('All')
    setCity('All')
    setBudget(100000000)
    setBeds('Any')
    setVerifiedOnly(false)
    setSortBy('newest')
  }

  const applyQuestionAnswers = () => {
    setCity(answers.location)
    setTypes([answers.propertyType])
    setStatus('For Sale')
    if (answers.timeline === 'Within 3 months') {
      setBudget(40000000)
    }
    if (answers.timeline === '6+ months') {
      setBudget(100000000)
    }
    setShowQuestionFlow(false)
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-10 grid lg:grid-cols-[280px_1fr] gap-6">
        <aside className="rounded-2xl border border-border bg-surface p-5 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-2xl text-text">Filters</h2>
          <div className="mt-5 space-y-5 text-sm">
            <div>
              <p className="text-text mb-2">Type</p>
              <div className="space-y-2">
                {allTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 text-muted">
                    <input type="checkbox" checked={types.includes(type)} onChange={() => toggleType(type)} />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-text mb-2">Status</p>
              <select className="input-dark" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>All</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>

            <div>
              <p className="text-text mb-2">City</p>
              <select className="input-dark" value={city} onChange={(e) => setCity(e.target.value)}>
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-text mb-2">Budget: ₹{budget.toLocaleString('en-IN')}</p>
              <input
                type="range"
                min="50000"
                max="100000000"
                step="50000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <p className="text-text mb-2">Beds</p>
              <select className="input-dark" value={beds} onChange={(e) => setBeds(e.target.value)}>
                <option>Any</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>

            <label className="flex items-center justify-between rounded-xl border border-border px-3 py-2 text-muted">
              Verified Only
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
              />
            </label>

            <button className="btn-gold w-full">Apply Filters</button>
            <button
              className="w-full rounded-xl border border-border px-4 py-2.5 text-sm text-text hover:border-gold"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </aside>

        <section>
          {showQuestionFlow && (
            <div className="rounded-2xl border border-gold/40 bg-surface p-5 mb-5">
              <p className="mono-label text-gold">Smart Discovery</p>
              <h3 className="font-display text-3xl text-text mt-2">Tell us what you need</h3>
              <p className="text-muted text-sm mt-1">Answer a few quick questions and we will pre-filter the best matches.</p>

              <div className="mt-4 rounded-xl border border-border p-4">
                {questionStep === 1 && (
                  <div>
                    <p className="text-text text-sm mb-2">1. Where are you looking to buy?</p>
                    <select
                      className="input-dark"
                      value={answers.location}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, location: e.target.value }))}
                    >
                      {cities.filter((c) => c !== 'All').map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                )}

                {questionStep === 2 && (
                  <div>
                    <p className="text-text text-sm mb-2">2. What type of house do you prefer?</p>
                    <select
                      className="input-dark"
                      value={answers.propertyType}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, propertyType: e.target.value }))}
                    >
                      {allTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                )}

                {questionStep === 3 && (
                  <div>
                    <p className="text-text text-sm mb-2">3. Is this purchase for living or investment?</p>
                    <select
                      className="input-dark"
                      value={answers.purpose}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, purpose: e.target.value }))}
                    >
                      <option>Primary Home</option>
                      <option>Investment</option>
                      <option>Vacation Home</option>
                    </select>
                  </div>
                )}

                {questionStep === 4 && (
                  <div>
                    <p className="text-text text-sm mb-2">4. When are you planning to finalize?</p>
                    <select
                      className="input-dark"
                      value={answers.timeline}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, timeline: e.target.value }))}
                    >
                      <option>Within 3 months</option>
                      <option>3 to 6 months</option>
                      <option>6+ months</option>
                    </select>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  {questionStep > 1 && (
                    <button
                      className="rounded-xl border border-border px-4 py-2 text-sm text-text"
                      onClick={() => setQuestionStep((s) => s - 1)}
                    >
                      Back
                    </button>
                  )}
                  {questionStep < 4 ? (
                    <button
                      className="btn-gold"
                      onClick={() => setQuestionStep((s) => s + 1)}
                    >
                      Next
                    </button>
                  ) : (
                    <button className="btn-gold" onClick={applyQuestionAnswers}>
                      Show Properties
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-surface p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-5">
            <p className="text-sm text-muted">Showing {filtered.length} of {properties.length} results</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted">Sort by:</span>
              <select className="input-dark !py-2 !text-xs" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="priceAsc">Price ↑</option>
                <option value="priceDesc">Price ↓</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
