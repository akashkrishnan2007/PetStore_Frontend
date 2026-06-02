import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop   from '../Components/ScrollToTop'
import GlobalToast   from '../Components/GlobalToast'
import BackToTop     from '../Components/BackToTop'
import ProtectedRoute from '../Components/ProtectedRoute'
import AdminRoute    from '../Components/AdminRoute'

import Home           from '../Pages/Home'
import About          from '../Pages/About'
import Contact        from '../Pages/Contact'
import Seller         from '../Pages/Seller'
import Login          from '../Pages/Login'
import Signup         from '../Pages/Signup'
import ForgotPassword from '../Pages/ForgotPassword'
import Adoption       from '../Pages/Adoption'
import FAQ            from '../Pages/FAQ'
import PrivacyPolicy  from '../Pages/PrivacyPolicy'
import TermsConditions from '../Pages/TermsConditions'
import CartPage       from '../Pages/CartPage'
import Profile        from '../Pages/Profile'
import NotFound       from '../Pages/NotFound'

import AdminLogin     from '../Pages/AdminLogin'
import Dashboard      from '../Pages/Dashboard'
import AdminUsers     from '../Pages/AdminUsers'
import AdminSellers   from '../Pages/AdminSellers'
import AdminAdoptions from '../Pages/AdminAdoptions'
import AdminMessages  from '../Pages/AdminMessages'
import AdminReports   from '../Pages/AdminReports'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalToast />
      <BackToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/seller"  element={<Seller />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/signup"  element={<Signup />} />
        <Route path="/forgot"  element={<ForgotPassword />} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/faq"     element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms"   element={<TermsConditions />} />
        <Route path="/cart"    element={<CartPage />} />

        {/* Protected user routes */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin"              element={<AdminLogin />} />
        <Route path="/admin/dashboard"    element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/users"        element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/sellers"      element={<AdminRoute><AdminSellers /></AdminRoute>} />
        <Route path="/admin/adoptions"    element={<AdminRoute><AdminAdoptions /></AdminRoute>} />
        <Route path="/admin/messages"     element={<AdminRoute><AdminMessages /></AdminRoute>} />
        <Route path="/admin/reports"      element={<AdminRoute><AdminReports /></AdminRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
