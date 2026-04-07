import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import IntroLandingPage from './pages/IntroLandingPage'
import LandingPage from './pages/LandingPage'
import LegalPolicyPage from './pages/LegalPolicyPage'
import PropertiesPage from './pages/PropertiesPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import ReferralShowcasePage from './pages/ReferralShowcasePage'
import SellerDashboard from './pages/SellerDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroLandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/policy/:type" element={<LegalPolicyPage />} />
        <Route path="/referral-showcase" element={<ReferralShowcasePage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
        <Route path="/dashboard/seller" element={<SellerDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
