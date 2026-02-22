import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Rol kontrolü
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    // Kullanıcının rolüne göre yönlendir
    if (user.rol === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user.rol === 'mudur') {
      return <Navigate to="/mudur" replace />;
    } else {
      return <Navigate to="/ogrenci" replace />;
    }
  }

  return <>{children}</>;
}
