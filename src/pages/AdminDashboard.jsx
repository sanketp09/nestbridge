import { useMemo, useState } from 'react'
import {
  Activity,
  BadgeIndianRupee,
  BarChart3,
  BookUser,
  Bug,
  ChartNoAxesCombined,
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
  auditLogs,
  citySales,
  crmFeedback,
  csatTrend,
  emailTrend,
  issueLog,
  marketingData,
  monthlyRevenue,
  propertyTypeDistribution,
  referralFunnel,
  socialReach,
  ticketCategories,
  topCampaigns
} from '../data/dashboardData'

const tabs = [
  { label: 'Overview', key: 'overview', icon: LayoutDashboard },
  { label: 'Revenue', key: 'revenue', icon: BadgeIndianRupee },
  { label: 'Marketing', key: 'marketing', icon: Megaphone },
  { label: 'CRM', key: 'crm', icon: BookUser },
  { label: 'Security', key: 'security', icon: ShieldCheck }
]

const pieColors = ['#C9A84C', '#3ECF8E', '#6b7280', '#3b82f6', '#FF5C5C']

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
  const revenueRows = useMemo(
    () =>
      monthlyRevenue.map((m) => ({
        ...m,
        total: m.transaction + m.subscription + m.ads + m.affiliate + m.sales
      })),
    []
  )

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid lg:grid-cols-[260px_1fr] gap-6">
      <Sidebar items={tabs} active={active} onSelect={setActive} />

      <section className="space-y-5">
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

        {active === 'revenue' && (
          <>
            <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted space-y-2">
              <h3 className="text-text text-lg">Revenue Model Explanation</h3>
              <p>1. Transaction Fee Model: 1.5% commission on every closed sale.</p>
              <p>2. Subscription Model: Agent Pro (₹4,999/mo), Developer Enterprise (₹24,999/mo).</p>
              <p>3. Advertising Revenue: featured listing placements and partner banner inventory.</p>
              <p>4. Affiliate Revenue: home loan referrals and interior design partnerships.</p>
              <p>5. Sales Revenue: legal document packages priced at ₹2,999 per deal.</p>
            </div>
            <div className="grid xl:grid-cols-2 gap-4">
              {chartContainer(
                'Revenue by Stream per Month',
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="month" stroke="#8A8FA8" />
                    <YAxis stroke="#8A8FA8" />
                    <Tooltip />
                    <Bar dataKey="transaction" stackId="a" fill="#C9A84C" />
                    <Bar dataKey="subscription" stackId="a" fill="#3ECF8E" />
                    <Bar dataKey="ads" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="affiliate" stackId="a" fill="#6b7280" />
                    <Bar dataKey="sales" stackId="a" fill="#FF5C5C" />
                  </BarChart>
                </ResponsiveContainer>
              )}
              {chartContainer(
                'Revenue Share by Model',
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Transaction', value: 38 },
                        { name: 'Subscription', value: 28 },
                        { name: 'Ads', value: 18 },
                        { name: 'Affiliate', value: 10 },
                        { name: 'Sales', value: 6 }
                      ]}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={110}
                    >
                      {pieColors.map((c) => <Cell key={c} fill={c} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="rounded-2xl border border-border bg-surface overflow-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border text-muted">
                  <tr><th className="p-3 text-left">Month</th><th className="p-3 text-left">Transaction</th><th className="p-3 text-left">Subscription</th><th className="p-3 text-left">Ads</th><th className="p-3 text-left">Affiliate</th><th className="p-3 text-left">Sales</th><th className="p-3 text-left">Total</th></tr>
                </thead>
                <tbody>
                  {revenueRows.map((row) => (
                    <tr key={row.month} className="border-b border-border/50 text-muted">
                      <td className="p-3">{row.month}</td>
                      <td className="p-3">₹{row.transaction.toLocaleString('en-IN')}</td>
                      <td className="p-3">₹{row.subscription.toLocaleString('en-IN')}</td>
                      <td className="p-3">₹{row.ads.toLocaleString('en-IN')}</td>
                      <td className="p-3">₹{row.affiliate.toLocaleString('en-IN')}</td>
                      <td className="p-3">₹{row.sales.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-text">₹{row.total.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === 'marketing' && (
          <>
            <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted space-y-2">
              <h3 className="text-text text-lg">Marketing Strategies</h3>
              <p>1. SEO and content marketing using high-intent locality guides and long-tail keywords.</p>
              <p>2. Google Ads campaigns for purchase intent terms and city-specific conversion funnels.</p>
              <p>3. Social media campaigns across Instagram, Facebook, and YouTube video narratives.</p>
              <p>4. Referral program with ₹5,000 cashback for successful referral conversions.</p>
              <p>5. Automated email drips for visit reminders, price alerts, and re-engagement.</p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard icon={Globe} label="Impressions" value="2.4M" change="+7.2%" />
              <StatCard icon={Activity} label="Clicks" value="48,200" change="+5.9%" />
              <StatCard icon={ChartNoAxesCombined} label="CTR" value="2.01%" change="+0.2%" />
              <StatCard icon={BadgeIndianRupee} label="ROAS" value="5.2x" change="+0.4" />
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
              {chartContainer(
                'Daily Clicks and Impressions (30d)',
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={adsDailyTrend}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="day" stroke="#8A8FA8" />
                    <YAxis stroke="#8A8FA8" />
                    <Tooltip />
                    <Line dataKey="clicks" stroke="#C9A84C" strokeWidth={2} />
                    <Line dataKey="impressions" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
              {chartContainer(
                'Monthly Reach by Platform',
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={socialReach}>
                    <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                    <XAxis dataKey="month" stroke="#8A8FA8" />
                    <YAxis stroke="#8A8FA8" />
                    <Tooltip />
                    <Bar dataKey="instagram" fill="#C9A84C" />
                    <Bar dataKey="facebook" fill="#3b82f6" />
                    <Bar dataKey="youtube" fill="#FF5C5C" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-surface overflow-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border text-muted"><tr><th className="p-3 text-left">Campaign</th><th className="p-3 text-left">Budget</th><th className="p-3 text-left">Clicks</th><th className="p-3 text-left">Conversions</th></tr></thead>
                  <tbody>
                    {topCampaigns.map((row) => (
                      <tr key={row.campaign} className="border-b border-border/40 text-muted">
                        <td className="p-3">{row.campaign}</td>
                        <td className="p-3">₹{row.budget.toLocaleString('en-IN')}</td>
                        <td className="p-3">{row.clicks.toLocaleString('en-IN')}</td>
                        <td className="p-3">{row.conversions.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
                  <h4 className="text-text">Social Media Metrics</h4>
                  <p className="mt-2">Instagram: {marketingData.social.instagram.followers.toLocaleString('en-IN')} followers, {marketingData.social.instagram.engagement}% engagement</p>
                  <p>Facebook: {marketingData.social.facebook.likes.toLocaleString('en-IN')} likes</p>
                  <p>YouTube: {marketingData.social.youtube.subscribers.toLocaleString('en-IN')} subscribers</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
                  <h4 className="text-text">Referral Program</h4>
                  <p className="mt-2">Total referrals: 1,240 | Converted: 387 | Cashback paid: ₹19.35L</p>
                  <div className="mt-3 h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={referralFunnel} layout="vertical">
                        <CartesianGrid stroke="#252A36" strokeDasharray="3 3" />
                        <XAxis type="number" stroke="#8A8FA8" />
                        <YAxis type="category" dataKey="stage" stroke="#8A8FA8" width={90} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#C9A84C" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {chartContainer(
                  'Email Open Rate Trend (6 months)',
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={emailTrend}>
                      <CartesianGrid stroke="#252A36" strokeDasharray="4 4" />
                      <XAxis dataKey="month" stroke="#8A8FA8" />
                      <YAxis stroke="#8A8FA8" />
                      <Tooltip />
                      <Line dataKey="openRate" stroke="#3ECF8E" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </>
        )}

        {active === 'crm' && (
          <>
            <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted space-y-2">
              <h3 className="text-text text-lg">CRM Intelligence Panel</h3>
              <p>NestBridge aggregates customer intelligence from contact forms, scheduled visits, surveys, in-app chat, reviews, and complaint tickets to improve CX and closing efficiency.</p>
              <p>Total feedback entries analyzed: 3,847.</p>
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

            <div className="rounded-2xl border border-border bg-surface overflow-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border text-muted"><tr><th className="p-3 text-left">Issue</th><th className="p-3 text-left">Frequency</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Priority</th></tr></thead>
                <tbody>
                  {issueLog.map((row) => (
                    <tr key={row.issue} className="border-b border-border/40 text-muted">
                      <td className="p-3">{row.issue}</td>
                      <td className="p-3">{row.frequency.toLocaleString('en-IN')}</td>
                      <td className="p-3">{row.status}</td>
                      <td className="p-3">{row.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
