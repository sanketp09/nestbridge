export const monthlyRevenue = [
  { month: 'Jan', transaction: 820000, subscription: 540000, ads: 210000, affiliate: 95000, sales: 62000 },
  { month: 'Feb', transaction: 870000, subscription: 565000, ads: 224000, affiliate: 102000, sales: 64000 },
  { month: 'Mar', transaction: 910000, subscription: 588000, ads: 238000, affiliate: 108000, sales: 69000 },
  { month: 'Apr', transaction: 965000, subscription: 610000, ads: 248000, affiliate: 113000, sales: 72000 },
  { month: 'May', transaction: 1020000, subscription: 638000, ads: 262000, affiliate: 121000, sales: 76000 },
  { month: 'Jun', transaction: 1080000, subscription: 662000, ads: 274000, affiliate: 128000, sales: 81000 },
  { month: 'Jul', transaction: 1140000, subscription: 685000, ads: 281000, affiliate: 132000, sales: 86000 },
  { month: 'Aug', transaction: 1190000, subscription: 702000, ads: 296000, affiliate: 139000, sales: 89000 },
  { month: 'Sep', transaction: 1240000, subscription: 724000, ads: 309000, affiliate: 146000, sales: 91000 },
  { month: 'Oct', transaction: 1300000, subscription: 742000, ads: 325000, affiliate: 151000, sales: 96000 },
  { month: 'Nov', transaction: 1360000, subscription: 768000, ads: 338000, affiliate: 159000, sales: 100000 },
  { month: 'Dec', transaction: 1420000, subscription: 795000, ads: 354000, affiliate: 166000, sales: 104000 }
]

export const crmFeedback = [
  { category: 'Agent Responsiveness', count: 1192 },
  { category: 'Property Info Accuracy', count: 924 },
  { category: 'Payment Issues', count: 692 },
  { category: 'App Performance', count: 287 },
  { category: 'Other', count: 752 }
]

export const marketingData = {
  googleAds: {
    impressions: 2400000,
    clicks: 48200,
    ctr: 2.01,
    conversions: 1842,
    cpc: 32,
    spend: 1540000,
    roas: 5.2
  },
  social: {
    instagram: { followers: 82000, engagement: 4.2 },
    facebook: { likes: 54000 },
    youtube: { subscribers: 12000 }
  },
  referral: { total: 1240, converted: 387, cashbackPaid: 1935000 },
  email: { sent: 45000, openRate: 24.3, clickRate: 8.1, unsubscribeRate: 0.4 }
}

export const citySales = [
  { city: 'Mumbai', sold: 214 },
  { city: 'Pune', sold: 186 },
  { city: 'Bangalore', sold: 242 },
  { city: 'Delhi', sold: 158 },
  { city: 'Hyderabad', sold: 197 }
]

export const propertyTypeDistribution = [
  { name: 'Apartment', value: 45 },
  { name: 'Villa', value: 25 },
  { name: 'Commercial', value: 20 },
  { name: 'Plot', value: 10 }
]

export const socialReach = [
  { month: 'Jul', instagram: 540000, facebook: 320000, youtube: 140000 },
  { month: 'Aug', instagram: 620000, facebook: 352000, youtube: 156000 },
  { month: 'Sep', instagram: 680000, facebook: 370000, youtube: 168000 },
  { month: 'Oct', instagram: 720000, facebook: 395000, youtube: 182000 },
  { month: 'Nov', instagram: 770000, facebook: 420000, youtube: 196000 },
  { month: 'Dec', instagram: 810000, facebook: 446000, youtube: 208000 }
]

export const emailTrend = [
  { month: 'Jul', openRate: 22.1 },
  { month: 'Aug', openRate: 22.8 },
  { month: 'Sep', openRate: 23.4 },
  { month: 'Oct', openRate: 23.8 },
  { month: 'Nov', openRate: 24.1 },
  { month: 'Dec', openRate: 24.3 }
]

export const adsDailyTrend = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  clicks: 1200 + Math.round(Math.sin(i / 3) * 220 + i * 8),
  impressions: 62000 + Math.round(Math.cos(i / 4) * 5000 + i * 300)
}))

export const topCampaigns = [
  { campaign: 'Mumbai Luxury Apartments', budget: 380000, clicks: 11840, conversions: 436 },
  { campaign: 'Pune Family Homes', budget: 290000, clicks: 9620, conversions: 381 },
  { campaign: 'Bangalore Villa Buyers', budget: 340000, clicks: 8460, conversions: 308 },
  { campaign: 'Delhi Commercial Spaces', budget: 260000, clicks: 7280, conversions: 284 },
  { campaign: 'Hyderabad Gated Communities', budget: 270000, clicks: 7000, conversions: 245 }
]

export const referralFunnel = [
  { stage: 'Invited', value: 1240 },
  { stage: 'Registered', value: 910 },
  { stage: 'Tour Scheduled', value: 544 },
  { stage: 'Converted', value: 387 }
]

export const issueLog = [
  { issue: 'Payment gateway timeout', frequency: 692, status: 'Resolved', priority: 'Critical' },
  { issue: 'Incorrect property photos', frequency: 924, status: 'In Progress', priority: 'High' },
  { issue: 'Agent not responding within 24h', frequency: 1192, status: 'In Progress', priority: 'Critical' },
  { issue: 'App crash on filter', frequency: 287, status: 'Resolved', priority: 'Medium' }
]

export const csatTrend = [
  { month: 'Jul', score: 81 },
  { month: 'Aug', score: 82 },
  { month: 'Sep', score: 84 },
  { month: 'Oct', score: 85 },
  { month: 'Nov', score: 86 },
  { month: 'Dec', score: 88 }
]

export const ticketCategories = [
  { name: 'Payments', value: 24 },
  { name: 'Listing Edits', value: 29 },
  { name: 'Scheduling', value: 21 },
  { name: 'Account', value: 16 },
  { name: 'Other', value: 10 }
]

export const auditLogs = [
  { timestamp: '2024-12-18 09:14', user: 'admin@nbridge.in', action: 'Admin login', ip: '103.22.19.145', status: 'Success' },
  { timestamp: '2024-12-18 09:23', user: 'ops.lead@nbridge.in', action: 'Property listing approved', ip: '122.167.8.81', status: 'Success' },
  { timestamp: '2024-12-18 10:02', user: 'security@nbridge.in', action: 'Role permissions updated', ip: '49.43.110.24', status: 'Success' },
  { timestamp: '2024-12-18 10:31', user: 'crm.head@nbridge.in', action: 'User data export', ip: '106.216.51.38', status: 'Success' },
  { timestamp: '2024-12-18 11:07', user: 'admin@nbridge.in', action: 'Refund approved', ip: '103.22.19.145', status: 'Success' },
  { timestamp: '2024-12-18 11:28', user: 'mktg@nbridge.in', action: 'Campaign budget update', ip: '14.194.31.204', status: 'Success' },
  { timestamp: '2024-12-18 12:16', user: 'admin@nbridge.in', action: 'Failed MFA attempt', ip: '185.112.41.2', status: 'Blocked' },
  { timestamp: '2024-12-18 13:04', user: 'ops.lead@nbridge.in', action: 'Agent profile verified', ip: '122.167.8.81', status: 'Success' },
  { timestamp: '2024-12-18 13:55', user: 'legal@nbridge.in', action: 'Terms policy updated', ip: '117.197.22.130', status: 'Success' },
  { timestamp: '2024-12-18 14:17', user: 'security@nbridge.in', action: 'API token rotation', ip: '49.43.110.24', status: 'Success' }
]
