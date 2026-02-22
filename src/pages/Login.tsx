import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Lock, User, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [tcNo, setTcNo] = useState('');
  const [sifre, setSifre] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Eğer kullanıcı zaten giriş yapmışsa yönlendir
  if (user) {
    if (user.rol === 'admin') {
      navigate('/admin');
    } else if (user.rol === 'mudur') {
      navigate('/mudur');
    } else {
      navigate('/ogrenci');
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tcNo || !sifre) {
      showToast('TC No ve şifre gerekli!', 'error');
      return;
    }

    if (tcNo.length !== 11) {
      showToast('TC No 11 haneli olmalıdır!', 'error');
      return;
    }

    setLoading(true);
    
    try {
      await login(tcNo, sifre);
      showToast('Giriş başarılı!', 'success');
      
      // Kullanıcı rolüne göre yönlendir
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.rol === 'admin') {
          navigate('/admin');
        } else if (userData.rol === 'mudur') {
          navigate('/mudur');
        } else {
          navigate('/ogrenci');
        }
      }
    } catch (error: any) {
      showToast(error.message || 'Giriş başarısız!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--brand-cream)]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[var(--brand-sand)]/70 blur-3xl" />
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[var(--brand-gold)]/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--brand-olive)]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16 lg:justify-between">
          <div className="hidden max-w-md lg:block">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--brand-olive)]">Beyzade Yurtları</p>
            <h1 className="mt-4 font-['Playfair_Display'] text-4xl font-semibold text-[var(--brand-ink)]">
              Yurt İzin Sistemi
            </h1>
            <p className="mt-4 text-sm text-[var(--brand-ink)]/70">
              Güvenli giriş, düzenli yaşam ve akademik başarıyı destekleyen bir yurt deneyimi.
            </p>
            <div className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-white/70 shadow-lg">
              <img
                src="/ankayurtlari/sections/beyzade.png"
                alt="Beyzade Yurtları"
                className="h-64 w-full object-cover"
              />
            </div>
          </div>

          <Card className="relative w-full max-w-md border border-black/10 bg-white/90 shadow-2xl backdrop-blur">
            <CardHeader className="text-center space-y-4 pb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="absolute left-4 top-4 text-[var(--brand-ink)]/70 hover:text-[var(--brand-ink)]"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Geri
              </Button>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand-olive)] text-[var(--brand-cream)] shadow-lg">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold text-[var(--brand-ink)]">
                  Yurt İzin Sistemi
                </CardTitle>
                <CardDescription className="mt-2 text-[var(--brand-ink)]/60">
                  Devam etmek için giriş yapın
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tcNo" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                TC Kimlik No
              </Label>
              <Input
                id="tcNo"
                type="text"
                placeholder="11111111111"
                value={tcNo}
                onChange={(e) => setTcNo(e.target.value.replace(/\D/g, '').slice(0, 11))}
                maxLength={11}
                className="h-11 border-black/10 bg-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sifre" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Şifre
              </Label>
              <Input
                id="sifre"
                type="password"
                placeholder="••••••"
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                className="h-11 border-black/10 bg-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-full bg-[var(--brand-gold)] text-base text-[var(--brand-ink)] hover:bg-[#b69052]"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[var(--brand-ink)] border-t-transparent rounded-full animate-spin" />
                  Giriş yapılıyor...
                </div>
              ) : (
                'Giriş Yap'
              )}
            </Button>
          </form> 
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
