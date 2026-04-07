import { useMemo, useState } from 'react'
import {
  Activity,
  BadgeIndianRupee,
  BarChart3,
  Boxes,
  BookUser,
  Bug,
  ChartNoAxesCombined,
  ClipboardList,
  CircleCheck,
  FileLock2,
  Globe,
  Landmark,
  LayoutDashboard,
  LockKeyhole,
  Megaphone,
  MessageSquareWarning,
  ShieldCheck,
  UserPlus
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import {
  adsDailyTrend,
  affiliateTransactions,
  auditLogs,
  citySales,
  crmAutomationPipeline,
  crmAutomationRules,
  crmFeedback,
  crmImpactBeforeAfter,
  csatTrend,
  emailTrend,
  issueLog,
  legalTatTrend,
  monthlyRevenue,
  propertyTypeDistribution,
  revenueFeatureSplit,
  revenueTransactions,
  scmKpis,
  scmPipeline,
  spotlightAdRevenue,
  escrowTimeline,
  ticketCategories,
  vendorOnboarding
} from '../data/dashboardData'
import ad1 from '../../ads/ad1.png'
import ad2 from '../../ads/ad2.png'
import ad3 from '../../ads/ad3.png'
import ad4 from '../../ads/ad4.png'
import ad5 from '../../ads/ad5.png'
import ad6 from '../../ads/ad6.png'

const tabs = [
  { label: 'Overview', key: 'overview', icon: LayoutDashboard },
  { label: 'SCM', key: 'scm', icon: Boxes },
  { label: 'Revenue', key: 'revenue', icon: BadgeIndianRupee },
  { label: 'Marketing', key: 'marketing', icon: Megaphone },
  { label: 'CRM', key: 'crm', icon: BookUser },
  { label: 'Security', key: 'security', icon: ShieldCheck },
  { label: 'Assignment Map', key: 'mapping', icon: ClipboardList }
]

const pieColors = ['#C9A84C', '#3ECF8E', '#6b7280', '#3b82f6', '#FF5C5C']

const digitalMarketingPlatforms = [
  { platform: 'Instagram', format: 'Property reels + walkthroughs', posts: 32, reach: 9200, likes: 980, inquiries: 64 },
  { platform: 'YouTube', format: 'Virtual tours', posts: 11, reach: 6100, likes: 540, inquiries: 47 },
  { platform: 'LinkedIn', format: 'Premium listings + investors', posts: 18, reach: 4700, likes: 480, inquiries: 39 }
]

const paidAdsData = [
  { channel: 'Google Ads', impressions: 6800, clicks: 610, leads: 74 },
  { channel: 'Meta Ads', impressions: 5200, clicks: 390, leads: 46 }
]

const seoRankings = [
  { keyword: 'flats in Panvel', rank: 4, monthlySearches: 5400 },
  { keyword: 'buy 2BHK near Mumbai', rank: 6, monthlySearches: 4700 },
  { keyword: 'affordable housing Navi Mumbai', rank: 3, monthlySearches: 3900 }
]

const seoTrafficGrowth = [
  { month: 'Jul', organic: 4200 },
  { month: 'Aug', organic: 4800 },
  { month: 'Sep', organic: 5600 },
  { month: 'Oct', organic: 6100 },
  { month: 'Nov', organic: 6800 },
  { month: 'Dec', organic: 7600 }
]

const referralGrowth = [
  { month: 'Jul', referred: 220, total: 760 },
  { month: 'Aug', referred: 248, total: 810 },
  { month: 'Sep', referred: 276, total: 890 },
  { month: 'Oct', referred: 305, total: 980 },
  { month: 'Nov', referred: 336, total: 1080 },
  { month: 'Dec', referred: 372, total: 1240 }
]

const adCreatives = [
  { name: 'Instagram Reel - Seaview', type: 'Digital Marketing', image: ad1, impressions: 3400, clicks: 420, leads: 46 },
  { name: 'YouTube Tour - Luxury Villa', type: 'Digital Marketing', image: ad2, impressions: 2800, clicks: 310, leads: 33 },
  { name: 'LinkedIn Investor Creative', type: 'Digital Marketing', image: ad3, impressions: 2300, clicks: 190, leads: 22 },
  { name: 'Google Search - 2BHK Mumbai', type: 'Paid Advertising', image: ad4, impressions: 6200, clicks: 560, leads: 69 },
  { name: 'Meta Lead Form - Navi Mumbai', type: 'Paid Advertising', image: ad5, impressions: 5800, clicks: 440, leads: 51 },
  { name: 'Referral Cashback Promo', type: 'Referral Marketing', image: ad6, impressions: 2100, clicks: 170, leads: 28 }
]

const initialComplaintCases = [
  { id: 'c1', customer: 'Ananya Deshpande', property: 'Hillside Contemporary Villa - NIBM, Pune', issue: 'Price mismatch on listing', severity: 'Moderate', status: 'Open' },
  { id: 'c2', customer: 'Vikram Joshi', property: 'Luxury Sea-View Apartment - Worli', issue: 'Seller delayed response beyond SLA', severity: 'High', status: 'Open' },
  { id: 'c3', customer: 'Rhea Malhotra', property: 'Lakefront Signature Apartment - Kondapur', issue: 'Payment token timeout', severity: 'Critical', status: 'Open' },
  { id: 'c4', customer: 'Karan Bedi', property: 'Prime Retail Arcade - Banjara Hills', issue: 'Incorrect amenity details', severity: 'Moderate', status: 'Open' }
]

const initialPropertySignals = [
  {
    id: 'p1',
    property: 'Hillside Contemporary Villa - NIBM, Pune',
    avgRating: 4.8,
    likes: 286,
    reviewTrend: 'Positive',
    placement: 'Normal',
    sellerAction: 'None'
  },
  {
    id: 'p2',
    property: 'Luxury Sea-View Apartment - Worli',
    avgRating: 4.7,
    likes: 334,
    reviewTrend: 'Positive',
    placement: 'Highlighted',
    sellerAction: 'None'
  },
  {
    id: 'p3',
    property: 'Central Business Apartment - Dwarka',
    avgRating: 2.9,
    likes: 74,
    reviewTrend: 'Negative',
    placement: 'Normal',
    sellerAction: 'Pending Action'
  }
]

const initialCustomerInteractions = [
  {
    id: 'i1',
    customer: 'Meera Singh',
    interestedProperty: 'Hillside Contemporary Villa - NIBM, Pune',
    triggerEvent: 'Viewed 4 times in 7 days',
    outreachMessage: 'No active campaign',
    status: 'Pending'
  },
  {
    id: 'i2',
    customer: 'Nitin Patil',
    interestedProperty: 'Luxury Sea-View Apartment - Worli',
    triggerEvent: 'Wishlisted property',
    outreachMessage: 'Highlight campaign pushed',
    status: 'Sent'
  },
  {
    id: 'i3',
    customer: 'Tanvi Shah',
    interestedProperty: 'Central Business Apartment - Dwarka',
    triggerEvent: 'Requested seller callback',
    outreachMessage: 'Awaiting seller follow-up',
    status: 'Pending'
  }
]

const actionOptions = {
  overview: [
    { id: 'execBrief', label: 'Generate Executive Brief', impact: 'Compiles KPI summary for leadership review.' },
    { id: 'healthCheck', label: 'Run Weekly Health Check', impact: 'Runs a mock cross-team status validation.' }
  ],
  scm: [
    { id: 'fastTrackVerification', label: 'Fast-track 20 Verifications', impact: 'Expected queue reduction within same day.' },
    { id: 'escalateVendorRisk', label: 'Escalate High-Risk Vendors', impact: 'Routes high-risk vendors for compliance review.' }
  ],
  revenue: [
    { id: 'optimizePricing', label: 'Optimize Subscription Pricing', impact: 'Simulates +0.2x blended revenue efficiency.' },
    { id: 'rebalanceSpend', label: 'Rebalance Marketing Spend', impact: 'Moves spend toward top-performing channels.' }
  ],
  marketing: [
    { id: 'pauseLowCampaigns', label: 'Pause Low-CTR Campaigns', impact: 'Protects budget from underperforming campaigns.' },
    { id: 'boostReferral', label: 'Boost Referral Cashback 7 Days', impact: 'Increases acquisition intent in warm audiences.' }
  ],
  crm: [
    { id: 'createP1PaymentIncident', label: 'Create P1: Payment Timeout Spike', impact: 'Triggers incident workflow and owner assignment.' },
    { id: 'routeAgentSla', label: 'Auto-Route Low-SLA Agents', impact: 'Reassigns leads to backup agent pool.' },
    { id: 'triggerCsatSurvey', label: 'Trigger Post-Fix CSAT Survey', impact: 'Launches survey to measure recovery impact.' }
  ],
  security: [
    { id: 'forceMfaReset', label: 'Force MFA Reset (Risk Users)', impact: 'Hardens access control for suspicious accounts.' },
    { id: 'runIncidentDrill', label: 'Run Incident Response Drill', impact: 'Simulates P1 playbook for readiness checks.' }
  ],
  mapping: []
}

const legalText = {
  privacy:
    'NestBridge values user privacy as a core operational commitment. This Privacy Policy explains how personal information is collected, processed, shared, retained, and deleted across the NestBridge platform. Information collected may include account identity details, transaction records, property preferences, communication metadata, and support history. We collect data directly from users through account registration, forms, calls, chat interactions, and post-transaction feedback. We may also collect limited technical data such as IP address, browser type, device fingerprint, and session analytics for fraud prevention and product reliability. Data is processed lawfully for service delivery, compliance, analytics, and contractual obligations. We use encryption in transit and at rest, role-based access controls, monitoring systems, and retention controls to secure personal data. NestBridge does not sell personally identifiable data to third parties. Data may be shared with verified service partners, legal consultants, payment processors, and regulated entities only when required to fulfill customer requests, complete transactions, or meet legal obligations. Users can request correction, export, or deletion of personal data by contacting support channels listed in the app. Where deletion is not immediately possible due to legal obligations, data is restricted and retained only for required compliance periods. NestBridge supports user consent withdrawal for optional communications and uses preference centers for message controls. Cookie usage includes essential authentication cookies, analytics cookies, and performance optimization cookies. Cross-border processing, where applicable, follows contractual safeguards and approved legal mechanisms. We conduct periodic privacy impact reviews and incident simulations to maintain policy effectiveness. Continued use of NestBridge indicates acceptance of this policy and associated updates published through official channels.',
  terms:
    'These Terms of Service govern access to and use of NestBridge by buyers, sellers, agents, and visitors. By creating an account, browsing listings, scheduling tours, making offers, or purchasing subscription plans, users agree to abide by these terms and all applicable laws. Users must provide accurate registration information, maintain account confidentiality, and promptly report unauthorized access. Property content, including media, pricing, and legal details, is submitted by verified partners; however, users are responsible for independent due diligence before finalizing transactions. NestBridge provides digital discovery, communication, advisory, and transaction support workflows but does not constitute legal representation unless explicitly contracted through designated legal packages. Platform fees, subscription billing, referral incentives, and promotional terms are disclosed in relevant panels and may change with prior notice. Payments are processed through compliant third-party gateways and users authorize charges for selected services. Fraudulent activity, abusive communication, scraping, false listings, identity misrepresentation, and unauthorized automation are prohibited and may result in suspension, termination, and legal action. Intellectual property across interface design, code, data structures, and brand elements remains owned by NestBridge or licensed partners and may not be copied or redistributed without written consent. Service availability targets are best-effort and may be affected by maintenance windows, force majeure, or third-party outages. Limitation of liability applies to indirect, consequential, or punitive damages to the maximum extent permitted by law. Dispute resolution follows governing jurisdiction stated at account onboarding, with good-faith resolution preferred before formal proceedings. Users may discontinue services at any time, subject to active contractual or billing commitments. Continued platform use after policy updates constitutes acceptance of revised terms.',
  cookie:
    'NestBridge uses cookies and similar technologies to provide secure sessions, remember preferences, understand platform usage patterns, and improve user experience. Essential cookies enable login continuity, account authentication, fraud monitoring, and secure routing across protected dashboard modules. Performance cookies measure response times, screen flows, and reliability indicators that help our engineering team optimize load speed and reduce failure rates. Analytics cookies capture aggregate behavioral trends such as navigation paths, search usage, and interaction funnels; this data is anonymized where feasible and processed under strict access controls. Functional cookies store user-selected options including language, saved filters, preferred cities, and shortlist settings. Advertising and campaign cookies may be used to measure attribution performance and improve relevance of promotional communication, in accordance with applicable consent requirements. Users can manage cookie preferences through browser settings and in-platform controls. Disabling some cookies may impact personalized recommendations, remembered settings, or smooth session continuity. Cookie retention periods vary by category and are periodically reviewed for necessity and proportionality. We do not permit unauthorized third-party tracking scripts that violate platform privacy standards. NestBridge maintains a consent log framework to document user choices and updates consent states when users modify preferences. Security controls, including signed tokens and transport encryption, protect cookie data from tampering and interception. This Cookie Policy may be revised to reflect legal updates, technology changes, or service expansion, and revised terms are published in-app. Continued usage after updates indicates acknowledgement of the revised policy, while users retain the right to adjust cookie controls at any time.'
}

function chartContainer(title, children) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 h-80">
      <h3 className="text-text mb-2">{title}</h3>
      <div className="h-[88%]">{children}</div>
    </div>
  )
}

export default function AdminDashboard() {
  const [active, setActive] = useState('overview')
  const [legalModal, setLegalModal] = useState(null)
  const [complaintCases, setComplaintCases] = useState(initialComplaintCases)
  const [propertySignals, setPropertySignals] = useState(initialPropertySignals)
  const [customerInteractions, setCustomerInteractions] = useState(initialCustomerInteractions)
  const [opsSnapshot, setOpsSnapshot] = useState({
    verificationQueue: 142,
    paymentIssues: 692,
    agentSlaCompliance: 88,
    roas: 5.2,
    csat: 88,
    riskUsers: 7
  })
  const [lastAction, setLastAction] = useState('No action executed yet')
  const [actionLog, setActionLog] = useState([])
  const revenueRows = useMemo(
    () =>
      monthlyRevenue.map((m) => ({
        ...m,
        total: m.transaction + m.subscription + m.ads + m.affiliate + m.sales
      })),
    []
  )
  const transactionRevenueTotal = useMemo(
    () => revenueTransactions.reduce((sum, row) => sum + row.platformCommission, 0),
    []
  )
  const builderPayoutTotal = useMemo(
    () => revenueTransactions.reduce((sum, row) => sum + row.builderPayout, 0),
    []
  )
  const spotlightRevenueTotal = useMemo(
    () => spotlightAdRevenue.reduce((sum, row) => sum + row.adFee, 0),
    []
  )
  const totalRevenueTracked = useMemo(
    () => revenueFeatureSplit.reduce((sum, row) => sum + row.value, 0),
    []
  )
  const severityBreakdown = useMemo(() => {
    const counts = { Critical: 0, High: 0, Moderate: 0 }
    complaintCases.forEach((item) => {
      if (item.status !== 'Resolved') counts[item.severity] += 1
    })
    return counts
  }, [complaintCases])

  const resolveComplaint = (id) => {
    setComplaintCases((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'Resolved' } : item)))
  }

  const updatePropertyAction = (id, action) => {
    setPropertySignals((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        if (action === 'highlight') return { ...item, placement: 'Highlighted', sellerAction: 'Promoted by CRM' }
        if (action === 'landing') return { ...item, placement: 'Main Landing', sellerAction: 'Homepage Priority' }
        if (action === 'contactSeller') return { ...item, sellerAction: 'Seller Contact Triggered' }
        if (action === 'discount') return { ...item, sellerAction: 'Discount Campaign Activated' }
        return item
      })
    )

    if (action === 'discount') {
      const selected = propertySignals.find((item) => item.id === id)
      if (!selected) return
      setCustomerInteractions((prev) =>
        prev.map((row) =>
          row.interestedProperty === selected.property
            ? {
                ...row,
                triggerEvent: 'Property discount activated',
                outreachMessage: `Discount alert sent for ${selected.property}`,
                status: 'Sent'
              }
            : row
        )
      )
    }
  }

  const runAction = (actionId, label) => {
    setOpsSnapshot((prev) => {
      if (actionId === 'fastTrackVerification') {
        return { ...prev, verificationQueue: Math.max(0, prev.verificationQueue - 20) }
      }
      if (actionId === 'createP1PaymentIncident') {
        return { ...prev, paymentIssues: Math.max(0, prev.paymentIssues - 80) }
      }
      if (actionId === 'routeAgentSla') {
        return { ...prev, agentSlaCompliance: Math.min(99, prev.agentSlaCompliance + 4) }
      }
      if (actionId === 'triggerCsatSurvey') {
        return { ...prev, csat: Math.min(99, prev.csat + 1) }
      }
      if (actionId === 'rebalanceSpend' || actionId === 'optimizePricing') {
        return { ...prev, roas: Math.min(8, Number((prev.roas + 0.2).toFixed(2))) }
      }
      if (actionId === 'forceMfaReset') {
        return { ...prev, riskUsers: Math.max(0, prev.riskUsers - 2) }
      }
      return prev
    })

    const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    const entry = `${time} - ${label}`
    setLastAction(`${label} executed successfully.`)
    setActionLog((prev) => [entry, ...prev].slice(0, 6))
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid lg:grid-cols-[260px_1fr] gap-6">
      <Sidebar items={tabs} active={active} onSelect={setActive} />

      <section className="space-y-5">
        {active !== 'mapping' && (
          <div className="rounded-2xl border border-gold/35 bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-text text-lg">Admin Action Center</h3>
              <span className="text-xs text-muted">{lastAction}</span>
            </div>
            <p className="text-sm text-muted mt-1">Choose a next step based on current data. Actions update the mock operations state below.</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {actionOptions[active].map((action) => (
                <button
                  key={action.id}
                  onClick={() => runAction(action.id, action.label)}
                  className="rounded-lg border border-border px-3 py-2 text-xs text-text hover:border-gold"
                  title={action.impact}
                >
                  {action.label}
                </button>
              ))}
            </div>

            <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg border border-border p-3 text-muted">Verification Queue: <span className="text-text">{opsSnapshot.verificationQueue}</span></div>
              <div className="rounded-lg border border-border p-3 text-muted">Payment Issues: <span className="text-text">{opsSnapshot.paymentIssues}</span></div>
              <div className="rounded-lg border border-border p-3 text-muted">Agent SLA: <span className="text-text">{opsSnapshot.agentSlaCompliance}%</span></div>
              <div className="rounded-lg border border-border p-3 text-muted">ROAS: <span className="text-text">{opsSnapshot.roas}x</span></div>
              <div className="rounded-lg border border-border p-3 text-muted">CSAT: <span className="text-text">{opsSnapshot.csat}</span></div>
              <div className="rounded-lg border border-border p-3 text-muted">Risk Users: <span className="text-text">{opsSnapshot.riskUsers}</span></div>
            </div>

            {actionLog.length > 0 && (
              <div className="mt-4 rounded-xl border border-border p-3 text-xs text-muted space-y-1">
                <p className="text-text">Recent Executed Actions</p>
                {actionLog.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {active === 'overview' && (
          <>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard icon={BadgeIndianRupee} label="Total Revenue" value="₹8.24 Cr" change="+12.4%" />
              <StatCard icon={BarChart3} label="Active Listings" value="1,247" change="+4.1%" />
              <StatCard icon={UserPlus} label="New Users (Month)" value="834" change="+6.8%" />
              <StatCard icon={ChartNoAxesCombined} label="Avg Deal Value" value="₹1.2 Cr" change="+2.3%" />
            </div>
            <div className="grid xl:grid-cols-2 gap-4">
              {chartContainer(
                'Monthly Revenue (12 months)',
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueRows}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="month" stroke="#8A8FA8" />
                    <YAxis stroke="#8A8FA8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#C9A84C" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              )}

              {chartContainer(
                'Properties Sold by City',
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={citySales}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="city" stroke="#8A8FA8" />
                    <YAxis stroke="#8A8FA8" />
                    <Tooltip />
                    <Bar dataKey="sold" fill="#C9A84C" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            {chartContainer(
              'Property Type Distribution',
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={propertyTypeDistribution} dataKey="value" nameKey="name" innerRadius={60} outerRadius={110}>
                    {propertyTypeDistribution.map((item, i) => <Cell key={item.name} fill={pieColors[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </>
        )}

        {active === 'scm' && (
          <>
            <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted space-y-2">
              <h3 className="text-text text-lg">SCM Operations Dashboard</h3>
              <p>Track listing supply flow from vendor onboarding to verified inventory, legal clearance, escrow, and settlement milestones.</p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {scmKpis.map((kpi) => (
                <StatCard
                  key={kpi.label}
                  icon={Boxes}
                  label={kpi.label}
                  value={String(kpi.value)}
                  change={kpi.delta}
                />
              ))}
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
              {chartContainer(
                'Listing Supply Funnel (Submitted → Verified → Live → Sold)',
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scmPipeline} layout="vertical">
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis type="number" stroke="#8A8FA8" />
                    <YAxis type="category" dataKey="stage" stroke="#8A8FA8" width={110} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#C9A84C" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {chartContainer(
                'Legal Document Turnaround (hours)',
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={legalTatTrend}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="month" stroke="#8A8FA8" />
                    <YAxis stroke="#8A8FA8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#3ECF8E" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-surface overflow-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border text-muted">
                    <tr>
                      <th className="p-3 text-left">Vendor</th>
                      <th className="p-3 text-left">KYC</th>
                      <th className="p-3 text-left">Listings</th>
                      <th className="p-3 text-left">SLA</th>
                      <th className="p-3 text-left">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorOnboarding.map((row) => (
                      <tr key={row.vendor} className="border-b border-border/40 text-muted">
                        <td className="p-3">{row.vendor}</td>
                        <td className="p-3">{row.kyc}</td>
                        <td className="p-3">{row.listings}</td>
                        <td className="p-3">{row.sla}</td>
                        <td className="p-3">{row.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {chartContainer(
                'Escrow and Settlement Timeline (avg days)',
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={escrowTimeline}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="milestone" stroke="#8A8FA8" />
                    <YAxis stroke="#8A8FA8" />
                    <Tooltip />
                    <Bar dataKey="avgDays" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </>
        )}

        {active === 'revenue' && (
          <>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard icon={BadgeIndianRupee} label="Website Commission" value={`₹${transactionRevenueTotal.toLocaleString('en-IN')}`} change="From building transactions" />
              <StatCard icon={BadgeIndianRupee} label="Builder Payout" value={`₹${builderPayoutTotal.toLocaleString('en-IN')}`} change="Net payout processed" />
              <StatCard icon={Megaphone} label="Spotlight Ad Revenue" value={`₹${spotlightRevenueTotal.toLocaleString('en-IN')}`} change="Promoted projects" />
              <StatCard icon={ChartNoAxesCombined} label="Total Revenue Tracked" value={`₹${totalRevenueTracked.toLocaleString('en-IN')}`} change="All streams combined" />
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
              {chartContainer(
                'Commission vs Builder Amount (Per Building)',
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueTransactions}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="building" stroke="#8A8FA8" hide />
                    <YAxis stroke="#8A8FA8" />
                    <Tooltip />
                    <Bar dataKey="platformCommission" fill="#C9A84C" name="NestBridge Commission" />
                    <Bar dataKey="builderPayout" fill="#3b82f6" name="Builder Amount" />
                  </BarChart>
                </ResponsiveContainer>
              )}
              {chartContainer(
                'Revenue Streams Distribution',
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueFeatureSplit} dataKey="value" nameKey="stream" innerRadius={60} outerRadius={110}>
                      {revenueFeatureSplit.map((item, i) => <Cell key={item.stream} fill={pieColors[i % pieColors.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-surface overflow-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border text-muted">
                  <tr>
                    <th className="p-3 text-left">Building</th>
                    <th className="p-3 text-left">Builder</th>
                    <th className="p-3 text-left">Transaction Value</th>
                    <th className="p-3 text-left">Commission %</th>
                    <th className="p-3 text-left">NestBridge Commission</th>
                    <th className="p-3 text-left">Builder Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueTransactions.map((row) => (
                    <tr key={row.building} className="border-b border-border/50 text-muted">
                      <td className="p-3">{row.building}</td>
                      <td className="p-3">{row.builder}</td>
                      <td className="p-3">₹{row.dealValue.toLocaleString('en-IN')}</td>
                      <td className="p-3">{row.commissionPct}%</td>
                      <td className="p-3 text-gold">₹{row.platformCommission.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-text">₹{row.builderPayout.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl border border-border bg-surface overflow-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border text-muted">
                  <tr>
                    <th className="p-3 text-left">Promoted Building</th>
                    <th className="p-3 text-left">Agent</th>
                    <th className="p-3 text-left">Spotlight Package</th>
                    <th className="p-3 text-left">Ad Revenue</th>
                    <th className="p-3 text-left">Leads</th>
                  </tr>
                </thead>
                <tbody>
                  {spotlightAdRevenue.map((row) => (
                    <tr key={`${row.project}-${row.agent}`} className="border-b border-border/50 text-muted">
                      <td className="p-3">{row.project}</td>
                      <td className="p-3">{row.agent}</td>
                      <td className="p-3">{row.package}</td>
                      <td className="p-3 text-gold">₹{row.adFee.toLocaleString('en-IN')}</td>
                      <td className="p-3">{row.leads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl border border-border bg-surface overflow-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border text-muted">
                  <tr>
                    <th className="p-3 text-left">Affiliate Partner</th>
                    <th className="p-3 text-left">Model</th>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Linked Property</th>
                    <th className="p-3 text-left">Transaction Value</th>
                    <th className="p-3 text-left">Partner Payout</th>
                    <th className="p-3 text-left">NestBridge Earning</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliateTransactions.map((row) => (
                    <tr key={`${row.partner}-${row.customer}`} className="border-b border-border/50 text-muted">
                      <td className="p-3">{row.partner}</td>
                      <td className="p-3">{row.model}</td>
                      <td className="p-3">{row.customer}</td>
                      <td className="p-3">{row.linkedProperty}</td>
                      <td className="p-3">₹{row.transactionValue.toLocaleString('en-IN')}</td>
                      <td className="p-3">₹{row.partnerPayout.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-gold">₹{row.nestbridgeAffiliateEarning.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === 'marketing' && (
          <>
            <div className="rounded-2xl border border-border bg-surface p-4">
              <h4 className="text-text mb-3">Ad Creatives and Campaign Analytics</h4>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {adCreatives.map((ad) => (
                  <article key={ad.name} className="rounded-xl border border-border overflow-hidden bg-bg">
                    <img src={ad.image} alt={ad.name} className="w-full h-40 object-cover" />
                    <div className="p-3 text-sm">
                      <p className="text-text">{ad.name}</p>
                      <p className="text-xs text-gold mt-1">{ad.type}</p>
                      <div className="mt-2 grid grid-cols-3 gap-1 text-xs text-muted">
                        <span>Imp: {ad.impressions.toLocaleString('en-IN')}</span>
                        <span>Clk: {ad.clicks.toLocaleString('en-IN')}</span>
                        <span>Leads: {ad.leads.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted space-y-2">
              <h3 className="text-text text-lg">Marketing Execution Dashboard</h3>
              <p>1. Digital Marketing (Social Media + Content): Instagram reels, YouTube virtual tours, LinkedIn premium listings.</p>
              <p>2. Paid Advertising: Google Ads + Meta Ads for high-intent lead capture.</p>
              <p>3. SEO: keyword ranking and organic growth tracking for property-intent searches.</p>
              <p>4. Referral Marketing: trust-based acquisition with referral cashback and conversion tracking.</p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard icon={Globe} label="Digital Reach" value="20,000" change="Target Achieved" />
              <StatCard icon={Activity} label="Digital Likes" value="2,000" change="Engagement Strong" />
              <StatCard icon={ChartNoAxesCombined} label="Digital Inquiries" value="150" change="Lead Ready" />
              <StatCard icon={BadgeIndianRupee} label="Paid Leads" value="120" change="From 12,000 Impressions" />
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
              {chartContainer(
                'Digital Marketing Performance by Platform',
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={digitalMarketingPlatforms}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="platform" stroke="#8A8FA8" />
                    <YAxis stroke="#8A8FA8" />
                    <Tooltip />
                    <Bar dataKey="reach" fill="#C9A84C" />
                    <Bar dataKey="likes" fill="#3b82f6" />
                    <Bar dataKey="inquiries" fill="#FF5C5C" />
                  </BarChart>
                </ResponsiveContainer>
              )}
              {chartContainer(
                'Paid Advertising (Google + Meta)',
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={paidAdsData}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="channel" stroke="#8A8FA8" />
                    <YAxis stroke="#8A8FA8" />
                    <Tooltip />
                    <Bar dataKey="impressions" fill="#C9A84C" />
                    <Bar dataKey="clicks" fill="#3b82f6" />
                    <Bar dataKey="leads" fill="#3ECF8E" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-surface overflow-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border text-muted"><tr><th className="p-3 text-left">SEO Keyword</th><th className="p-3 text-left">Rank</th><th className="p-3 text-left">Monthly Searches</th></tr></thead>
                  <tbody>
                    {seoRankings.map((row) => (
                      <tr key={row.keyword} className="border-b border-border/40 text-muted">
                        <td className="p-3">{row.keyword}</td>
                        <td className="p-3">#{row.rank}</td>
                        <td className="p-3">{row.monthlySearches.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                {chartContainer(
                  'SEO Organic Traffic Growth',
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={seoTrafficGrowth}>
                      <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                      <XAxis dataKey="month" stroke="#8A8FA8" />
                      <YAxis stroke="#8A8FA8" />
                      <Tooltip />
                      <Line dataKey="organic" stroke="#3ECF8E" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
              {chartContainer(
                'Referral Marketing Growth (30% Users from Referrals)',
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={referralGrowth}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="month" stroke="#8A8FA8" />
                    <YAxis stroke="#8A8FA8" />
                    <Tooltip />
                    <Bar dataKey="referred" fill="#C9A84C" />
                    <Bar dataKey="total" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              )}

              <div className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
                <h4 className="text-text">Paid Search Example</h4>
                <p className="mt-2">Search Ads keyword: <span className="text-text">"2BHK flats in Mumbai"</span></p>
                <p className="mt-2">Impressions: <span className="text-text">12,000</span></p>
                <p>Clicks: <span className="text-text">1,000</span></p>
                <p>Leads: <span className="text-text">120</span></p>
                <p className="mt-3">High-intent search leads in real estate have higher transaction value per conversion than generic social traffic.</p>
              </div>
            </div>

          </>
        )}

        {active === 'crm' && (
          <>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-text text-xl">CRM Command Center</h3>
                <span className="text-xs text-muted">Live feedback signals · 3,847 records analyzed</span>
              </div>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-alert/40 bg-alert/10 p-4">
                  <p className="text-xs text-alert">Critical</p>
                  <p className="text-3xl text-alert mt-1 font-semibold">{severityBreakdown.Critical}</p>
                </div>
                <div className="rounded-xl border border-gold/40 bg-gold/10 p-4">
                  <p className="text-xs text-gold">High</p>
                  <p className="text-3xl text-gold mt-1 font-semibold">{severityBreakdown.High}</p>
                </div>
                <div className="rounded-xl border border-border bg-bg/50 p-4">
                  <p className="text-xs text-muted">Moderate</p>
                  <p className="text-3xl text-text mt-1 font-semibold">{severityBreakdown.Moderate}</p>
                </div>
              </div>
            </div>

            <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-4">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h4 className="text-text text-lg">Complaint Triage Cards</h4>
                <div className="mt-3 grid gap-3">
                  {complaintCases.map((row) => (
                    <article key={row.id} className="rounded-xl border border-border p-4 bg-bg/40">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-text text-sm font-medium">{row.customer}</p>
                          <p className="text-xs text-muted mt-1">{row.property}</p>
                        </div>
                        <span className={`rounded-full px-2 py-1 text-[10px] ${row.severity === 'Critical' ? 'bg-alert/15 text-alert border border-alert/50' : row.severity === 'High' ? 'bg-gold/15 text-gold border border-gold/50' : 'bg-border text-text border border-border'}`}>
                          {row.severity}
                        </span>
                      </div>
                      <p className="text-sm text-muted mt-3">{row.issue}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`text-xs ${row.status === 'Resolved' ? 'text-success' : 'text-muted'}`}>{row.status}</span>
                        <button
                          onClick={() => resolveComplaint(row.id)}
                          disabled={row.status === 'Resolved'}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${row.status === 'Resolved' ? 'border border-success/40 text-success bg-success/10' : 'bg-gold text-black hover:bg-lightGold'}`}
                        >
                          {row.status === 'Resolved' ? 'Resolved' : 'Resolve Now'}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <h4 className="text-text text-lg">Interaction Pulse</h4>
                <div className="mt-3 space-y-3">
                  {customerInteractions.map((row) => (
                    <article key={row.id} className="rounded-xl border border-border p-3 bg-bg/40">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-text font-medium">{row.customer}</p>
                        <span className={`rounded-full px-2 py-1 text-[10px] ${row.status === 'Sent' ? 'bg-success/15 text-success border border-success/50' : 'bg-border text-text border border-border'}`}>
                          {row.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted mt-1">{row.interestedProperty}</p>
                      <p className="text-xs text-muted mt-2">Trigger: {row.triggerEvent}</p>
                      <p className="text-xs text-muted">Message: {row.outreachMessage}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <h4 className="text-text text-lg">Review Momentum and Property Controls</h4>
              <div className="mt-3 grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                {propertySignals.map((row) => (
                  <article key={row.id} className="rounded-xl border border-border p-4 bg-bg/40">
                    <p className="text-text font-medium">{row.property}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border border-border px-2 py-1 text-muted">Rating {row.avgRating}</span>
                      <span className="rounded-full border border-border px-2 py-1 text-muted">Likes {row.likes}</span>
                      <span className={`rounded-full border px-2 py-1 ${row.reviewTrend === 'Positive' ? 'border-success/50 text-success' : 'border-alert/50 text-alert'}`}>{row.reviewTrend}</span>
                    </div>
                    <div className="mt-2 text-xs text-muted">Placement: <span className="text-text">{row.placement}</span></div>
                    <div className="text-xs text-muted">Seller Action: <span className="text-text">{row.sellerAction}</span></div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button onClick={() => updatePropertyAction(row.id, 'highlight')} className="rounded-lg border border-border px-3 py-2 text-xs text-text hover:border-gold">Highlight</button>
                      <button onClick={() => updatePropertyAction(row.id, 'landing')} className="rounded-lg border border-border px-3 py-2 text-xs text-text hover:border-gold">Main Landing</button>
                      <button onClick={() => updatePropertyAction(row.id, 'contactSeller')} className="rounded-lg border border-border px-3 py-2 text-xs text-text hover:border-gold">Contact Seller</button>
                      <button onClick={() => updatePropertyAction(row.id, 'discount')} className="rounded-lg bg-gold text-black px-3 py-2 text-xs font-semibold hover:bg-lightGold">Give Discount</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
              {chartContainer(
                'Feedback Categories',
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={crmFeedback} layout="vertical">
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis type="number" stroke="#8A8FA8" />
                    <YAxis type="category" dataKey="category" stroke="#8A8FA8" width={150} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#C9A84C" />
                  </BarChart>
                </ResponsiveContainer>
              )}
              <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
                <h4 className="text-text mb-2">Actions Taken</h4>
                <ul className="space-y-2 list-disc pl-5">
                  <li>March 2024: Payment gateway upgraded after 692 timeout reports flagged.</li>
                  <li>April 2024: Photo-verification workflow tightened for listing accuracy.</li>
                  <li>May 2024: Agent SLA policy revised for 24-hour response compliance.</li>
                  <li>June 2024: Filter crash patch deployed and monitoring alerts activated.</li>
                </ul>
                <div className="mt-5 rounded-xl bg-bg border border-border p-4">
                  <p className="text-text">NPS Score: 72</p>
                  <p className="text-xs mt-1">Promoters 78% | Passives 14% | Detractors 8%</p>
                  <div className="mt-3 h-2 rounded-full bg-border overflow-hidden flex">
                    <span className="bg-success w-[78%]" />
                    <span className="bg-[#9ca3af] w-[14%]" />
                    <span className="bg-alert w-[8%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <h4 className="text-text">Issue Hotspots</h4>
              <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {issueLog.map((row) => (
                  <article key={row.issue} className="rounded-xl border border-border p-3 bg-bg/40">
                    <p className="text-xs text-muted">{row.issue}</p>
                    <p className="text-2xl text-text mt-2">{row.frequency.toLocaleString('en-IN')}</p>
                    <p className="text-xs mt-1">Status: <span className="text-text">{row.status}</span></p>
                    <p className="text-xs">Priority: <span className={row.priority === 'Critical' ? 'text-alert' : 'text-gold'}>{row.priority}</span></p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
              {chartContainer(
                'CSAT Trend (6 months)',
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={csatTrend}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="month" stroke="#8A8FA8" />
                    <YAxis stroke="#8A8FA8" domain={[70, 95]} />
                    <Tooltip />
                    <Line dataKey="score" stroke="#3ECF8E" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              )}
              {chartContainer(
                'Support Ticket Categories',
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ticketCategories} dataKey="value" innerRadius={60} outerRadius={110}>
                      {ticketCategories.map((item, i) => <Cell key={item.name} fill={pieColors[i]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
              <h4 className="text-text">Loyalty and CRM Programs</h4>
              <p className="mt-2">NestRewards awards 1 point per ₹1,000 spent. Tiers: Silver, Gold, Platinum with priority support, legal discounts, and concierge tours.</p>
              <p className="mt-2">Customer Segments: New Users (2,240), Active Buyers (1,112), High-Value (248), At-Risk (183), Churned (96). Action tracks are configured per segment.</p>
              <p className="mt-2">Support Tickets: Total 2,140 | Resolved 1,876 | Avg resolution time 18 hours.</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
              <h4 className="text-text text-lg">CRM Automated Workflow</h4>
              <p className="mt-2">Workflow: Ingestion → Classification → Priority scoring → Escalation → Fix SLA → Post-fix CSAT impact</p>
              <div className="mt-4 grid md:grid-cols-3 gap-3">
                {crmAutomationPipeline.map((step) => (
                  <div key={step.stage} className="rounded-xl border border-border p-3">
                    <p className="text-text text-sm">{step.stage}</p>
                    <p className="text-xs mt-1">Volume: {step.volume.toLocaleString('en-IN')}</p>
                    <p className="text-xs">SLA: {step.sla}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h4 className="text-text">Automation Rules</h4>
                <div className="mt-3 grid gap-3">
                  {crmAutomationRules.map((row) => (
                    <article key={row.rule} className="rounded-xl border border-border p-3 bg-bg/40">
                      <p className="text-sm text-text">{row.rule}</p>
                      <p className="text-xs text-muted mt-2">Action: {row.action}</p>
                      <p className="text-xs text-muted">Owner: {row.owner}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <h4 className="text-text">Before vs After Impact</h4>
                <div className="mt-3 grid gap-3">
                  {crmImpactBeforeAfter.map((row) => (
                    <article key={row.metric} className="rounded-xl border border-border p-3 bg-bg/40">
                      <p className="text-sm text-text">{row.metric}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted">
                        <span>Before: {row.before}</span>
                        <span className="text-success">After: {row.after}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {active === 'security' && (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[
                { title: 'Data Encryption', text: 'All data encrypted at rest (AES-256) and in transit (TLS 1.3).', icon: FileLock2 },
                { title: 'Authentication', text: 'JWT access tokens, refresh token rotation, optional OTP-based 2FA.', icon: LockKeyhole },
                { title: 'Data Validation', text: 'Server-side validation and sanitization against injection attacks.', icon: Bug },
                { title: 'Data Privacy', text: 'GDPR-aligned handling, right to erasure, anonymized analytics.', icon: MessageSquareWarning },
                { title: 'Payment Security', text: 'PCI-DSS compliant payment gateway, no card storage on app servers.', icon: Landmark },
                { title: 'RBAC + Audit Logs', text: 'Role scope controls with complete timestamped admin action logging.', icon: ShieldCheck }
              ].map((card) => (
                <article key={card.title} className="rounded-2xl border border-border bg-surface p-5">
                  <card.icon className="text-gold" />
                  <h3 className="mt-3 text-text">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted">{card.text}</p>
                </article>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard icon={CircleCheck} label="SSL Certificate" value="Valid" change="OK" />
              <StatCard icon={CircleCheck} label="Last Pen Test" value="Jan 2024" change="OK" />
              <StatCard icon={CircleCheck} label="Data Breaches" value="0" change="0" />
              <StatCard icon={CircleCheck} label="Uptime" value="99.97%" change="+0.04%" />
            </div>

            <div className="rounded-2xl border border-border bg-surface overflow-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border text-muted"><tr><th className="p-3 text-left">Timestamp</th><th className="p-3 text-left">User</th><th className="p-3 text-left">Action</th><th className="p-3 text-left">IP</th><th className="p-3 text-left">Status</th></tr></thead>
                <tbody>
                  {auditLogs.map((row, i) => (
                    <tr key={`${row.timestamp}-${i}`} className="border-b border-border/40 text-muted">
                      <td className="p-3">{row.timestamp}</td>
                      <td className="p-3">{row.user}</td>
                      <td className="p-3">{row.action}</td>
                      <td className="p-3">{row.ip}</td>
                      <td className="p-3">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
              <p className="text-text mb-3">Policy Documents</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setLegalModal('privacy')} className="rounded-lg border border-border px-3 py-2 hover:border-gold">Privacy Policy</button>
                <button onClick={() => setLegalModal('terms')} className="rounded-lg border border-border px-3 py-2 hover:border-gold">Terms of Service</button>
                <button onClick={() => setLegalModal('cookie')} className="rounded-lg border border-border px-3 py-2 hover:border-gold">Cookie Policy</button>
              </div>
            </div>
          </>
        )}

        {active === 'mapping' && (
          <div className="rounded-2xl border border-border bg-surface overflow-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border text-muted">
                <tr>
                  <th className="p-3 text-left">Assignment Criterion</th>
                  <th className="p-3 text-left">Implemented In</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Front website showcasing business', 'Home + Properties + Detail pages', 'Done'],
                  ['Marketing strategy dashboard', 'Admin → Marketing tab', 'Done'],
                  ['Revenue models + stream mapping', 'Admin → Revenue tab', 'Done'],
                  ['CRM data capture and analysis', 'Admin → CRM tab', 'Done'],
                  ['SCM operations dashboard', 'Admin → SCM tab', 'Done'],
                  ['Security + policy documents', 'Admin → Security tab + Public policy pages', 'Done'],
                  ['Multiple user dashboards', 'Buyer/Seller/Admin dashboards', 'Done'],
                  ['Experiment with real-time values (future)', 'Requires backend APIs and live ETL', 'Planned']
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-border/40 text-muted">
                    <td className="p-3">{row[0]}</td>
                    <td className="p-3">{row[1]}</td>
                    <td className={`p-3 ${row[2] === 'Done' ? 'text-success' : 'text-gold'}`}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/75 p-4 grid place-items-center">
          <article className="w-full max-w-3xl max-h-[85vh] overflow-auto rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-display text-3xl text-text capitalize">{legalModal} policy</h3>
            <p className="text-sm text-muted mt-3 leading-relaxed whitespace-pre-line">{legalText[legalModal]}</p>
            <button onClick={() => setLegalModal(null)} className="btn-gold mt-5">Close</button>
          </article>
        </div>
      )}
    </main>
  )
}
