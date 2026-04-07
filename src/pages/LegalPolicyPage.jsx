import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const policyContent = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'NestBridge collects account profile data, preference filters, transaction intent details, and support interactions to deliver platform services and improve customer experience.',
      'Personal data is processed for listing discovery, advisory support, transaction workflows, fraud prevention, compliance, and analytics. We do not sell personally identifiable customer data.',
      'Data is protected using encryption in transit and at rest, role-based access controls, and retention policies. Users can request correction, export, or deletion of personal information subject to legal obligations.'
    ]
  },
  terms: {
    title: 'Terms of Service',
    body: [
      'By using NestBridge, users agree to provide accurate profile details, maintain account security, and comply with platform rules and applicable laws.',
      'Listings, tours, offers, and payment actions are facilitated through verified workflows; users must perform independent due diligence before final transaction closure.',
      'Abuse, fraud, scraping, identity misrepresentation, and unauthorized automation may result in account restrictions, suspension, and legal action.'
    ]
  },
  cookie: {
    title: 'Cookie Policy',
    body: [
      'NestBridge uses essential cookies for authentication and session security, functional cookies for preferences, and analytics cookies for service improvements.',
      'Users can control cookie behavior using browser settings. Disabling some cookies may impact personalized recommendations and session continuity.',
      'Cookie preferences and consent records are maintained and can be updated by users at any time.'
    ]
  }
}

export default function LegalPolicyPage() {
  const { type } = useParams()
  const policy = useMemo(() => policyContent[type] || policyContent.privacy, [type])

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="mono-label text-gold">Compliance</p>
          <h1 className="font-display text-4xl text-text mt-2">{policy.title}</h1>
          <div className="mt-5 space-y-4 text-sm text-muted leading-relaxed">
            {policy.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/policy/privacy" className="rounded-lg border border-border px-3 py-2 text-xs text-text hover:border-gold">Privacy Policy</Link>
            <Link to="/policy/terms" className="rounded-lg border border-border px-3 py-2 text-xs text-text hover:border-gold">Terms of Service</Link>
            <Link to="/policy/cookie" className="rounded-lg border border-border px-3 py-2 text-xs text-text hover:border-gold">Cookie Policy</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
