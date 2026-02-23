import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import Login from './pages/Login'
import MudurPanel from './pages/MudurPanel'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './components/ProtectedRoute'
import YurtLayout from './pages/YurtLayout'
import IzinYonetim from './pages/IzinYonetim'
import YemekListesi from './pages/YemekListesi'
import TalepYonetim from './pages/TalepYonetim'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import RoomsPage from './pages/RoomsPage'
import DormDetailPage from './pages/DormDetailPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/odalar" element={<RoomsPage />} />
          <Route path="/yurtlar/:slug" element={<DormDetailPage />} />
          <Route 
            path="/yurt" 
            element={
              <ProtectedRoute allowedRoles={['ogrenci']}>
                <YurtLayout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/yurt/izin" 
            element={
              <ProtectedRoute allowedRoles={['ogrenci']}>
                <IzinYonetim />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/yurt/talep" 
            element={
              <ProtectedRoute allowedRoles={['ogrenci']}>
                <TalepYonetim />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/ogrenci" 
            element={
              <ProtectedRoute allowedRoles={['ogrenci']}>
                <YurtLayout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ogrenci/izin" 
            element={
              <ProtectedRoute allowedRoles={['ogrenci']}>
                <IzinYonetim />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ogrenci/yemek" 
            element={
              <ProtectedRoute allowedRoles={['ogrenci']}>
                <YemekListesi />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ogrenci/talep" 
            element={
              <ProtectedRoute allowedRoles={['ogrenci']}>
                <TalepYonetim />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ogrenci/hakkimizda" 
            element={<AboutPage />} 
          />
          <Route 
            path="/mudur" 
            element={
              <ProtectedRoute allowedRoles={['mudur']}>
                <MudurPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
