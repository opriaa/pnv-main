import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import CmsPageView from "./pages/CmsPageView";
import BankDetailsPage from "./pages/BankDetailsPage";

import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminCmsPagesPage from "./pages/admin/AdminCmsPagesPage";
import AdminHomepageSectionsPage from "./pages/admin/AdminHomepageSectionsPage";
import AdminBankDetailsPage from "./pages/admin/AdminBankDetailsPage";
import AdminPincodesPage from "./pages/admin/AdminPincodesPage";

import "./index.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" />
          <Routes>
            {/* Public routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/bank-details" element={<BankDetailsPage />} />
              <Route path="/about-us" element={<CmsPageView />} />
              <Route path="/contact" element={<CmsPageView />} />
              <Route path="/privacy-policy" element={<CmsPageView />} />
              <Route path="/terms" element={<CmsPageView />} />
              <Route path="/refund-policy" element={<CmsPageView />} />
              <Route path="/shipping-policy" element={<CmsPageView />} />
              <Route path="/:slug" element={<CmsPageView />} />
            </Route>

            {/* Admin routes */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
              <Route path="/admin/cms-pages" element={<AdminCmsPagesPage />} />
              <Route path="/admin/homepage-sections" element={<AdminHomepageSectionsPage />} />
              <Route path="/admin/bank-details" element={<AdminBankDetailsPage />} />
              <Route path="/admin/pincodes" element={<AdminPincodesPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;