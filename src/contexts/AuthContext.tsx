import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, YurtSubesi } from '@/types';
import api from '@/services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  yurtler: YurtSubesi[];
  login: (tc_no: string, sifre: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  fetchYurtler: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [yurtler, setYurtler] = useState<YurtSubesi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
    fetchYurtler();
  }, [token]);

  const fetchYurtler = async () => {
    try {
      const response = await api.get('/auth/yurt-subeleri');
      setYurtler(response.data.yurtler);
    } catch (error) {
      console.error('Yurtler yuklenirken hata:', error);
    }
  };

  const login = async (tc_no: string, sifre: string) => {
    try {
      const response = await api.post('/auth/login', { tc_no, sifre });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Giriş başarısız!');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, yurtler, login, logout, loading, fetchYurtler }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
