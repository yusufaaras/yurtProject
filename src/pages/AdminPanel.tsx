import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import api from '@/services/api';
import { User, IzinTalebi, SikayetIstek, DashboardStats, YurtSubesi } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  LogOut, 
  Users, 
  Calendar, 
  Utensils,
  Home,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  UserPlus,
  UserX,
  Trash2,
  TrendingUp,
  Clock,
  FileCheck,
  MessageSquare,
  Building2,
  MapPin,
  Phone,
  Menu
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface YemekDosyasi {
  id: number;
  yurt_id: number;
  yurt_adi: string;
  ogun: 'kahvalti' | 'aksam';
  dosya_adi: string;
  dosya_tipi: string;
  baslangic_tarihi: string;
  bitis_tarihi: string;
  created_at: string;
}

export default function AdminPanel() {
  const { user, logout, yurtler, fetchYurtler } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedYurt, setSelectedYurt] = useState<string>('all');
  
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [izinler, setIzinler] = useState<IzinTalebi[]>([]);
  const [sikayetler, setSikayetler] = useState<SikayetIstek[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [izinTcFilter, setIzinTcFilter] = useState('');
  const [izinDurumFilter, setIzinDurumFilter] = useState<'all' | 'beklemede' | 'onaylandi' | 'reddedildi'>('all');
  const [talepDurumFilter, setTalepDurumFilter] = useState<'all' | 'beklemede' | 'inceleniyor' | 'cozuldu' | 'reddedildi'>('all');
  
  const [newUser, setNewUser] = useState({
    tc_no: '',
    sifre: '',
    ad: '',
    soyad: '',
    aile_telefon: '',
    telefon: '',
    rol: 'ogrenci',
    yurt_id: ''
  });
  
  const [newYemek, setNewYemek] = useState({
    tarihBaslangic: '',
    tarihBitis: '',
    yurt_id: '',
    kahvaltiDosya: null as File | null,
    aksamDosya: null as File | null
  });

  const [newYurt, setNewYurt] = useState({
    ad: '',
    adres: '',
    telefon: ''
  });
  const [editingYurt, setEditingYurt] = useState<{
    id: number;
    ad: string;
    adres: string;
    telefon: string;
    mudur_id?: number;
  } | null>(null);
  const [yemekDosyalari, setYemekDosyalari] = useState<YemekDosyasi[]>([]);
  const [yemekDosyalariLoading, setYemekDosyalariLoading] = useState(false);
  
  const [adminNotu, setAdminNotu] = useState('');
  const [servisForm, setServisForm] = useState({
    sabahSaatler: '07:00, 07:30, 08:00',
    sabahGuzergah: 'Merkez → Kampüs → Kız Yurdu',
    aksamSaatler: '18:00, 18:30, 19:00',
    aksamGuzergah: 'Kampüs → Merkez → Erkek Yurdu'
  });
  const [servisKayitVar, setServisKayitVar] = useState(false);
  const [servisLoading, setServisLoading] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
    fetchUsers();
    fetchIzinler();
    fetchSikayetler();
    fetchYemekDosyalari();
    fetchServisBilgisi();
  }, [selectedYurt]);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/admin/istatistikler');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Stats yüklenirken hata:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      let url = '/admin/kullanicilar';
      if (selectedYurt !== 'all') url += `?yurt_id=${selectedYurt}`;
      const response = await api.get(url);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Kullanıcılar yüklenirken hata:', error);
    }
  };

  const fetchIzinler = async () => {
    try {
      let url = '/izin/tum-talepler';
      if (selectedYurt !== 'all') url += `?yurt_id=${selectedYurt}`;
      const response = await api.get(url);
      setIzinler(response.data.izinler);
    } catch (error) {
      console.error('İzinler yüklenirken hata:', error);
    }
  };

  const fetchSikayetler = async () => {
    try {
      let url = '/sikayet/tum-talepler';
      if (selectedYurt !== 'all') url += `?yurt_id=${selectedYurt}`;
      const response = await api.get(url);
      setSikayetler(response.data.sikayetler);
    } catch (error) {
      console.error('Şikayetler yüklenirken hata:', error);
    }
  };

  const fetchServisBilgisi = async () => {
    if (selectedYurt === 'all') {
      setServisKayitVar(false);
      return;
    }

    setServisLoading(true);
    try {
      const response = await api.get(`/admin/servis?yurt_id=${selectedYurt}`);
      const servis = response.data.servis;
      if (servis) {
        setServisForm({
          sabahSaatler: servis.sabah_saatler || '',
          sabahGuzergah: servis.sabah_guzergah || '',
          aksamSaatler: servis.aksam_saatler || '',
          aksamGuzergah: servis.aksam_guzergah || ''
        });
        setServisKayitVar(true);
      } else {
        setServisForm({
          sabahSaatler: '',
          sabahGuzergah: '',
          aksamSaatler: '',
          aksamGuzergah: ''
        });
        setServisKayitVar(false);
      }
    } catch (error) {
      console.error('Servis bilgisi yüklenirken hata:', error);
      setServisKayitVar(false);
    } finally {
      setServisLoading(false);
    }
  };

  const handleSaveServis = async () => {
    if (selectedYurt === 'all') {
      showToast('Lütfen servis kaydı için bir yurt seçin!', 'error');
      return;
    }

    setServisLoading(true);
    try {
      await api.put('/admin/servis', {
        yurt_id: selectedYurt,
        sabah_saatler: servisForm.sabahSaatler,
        sabah_guzergah: servisForm.sabahGuzergah,
        aksam_saatler: servisForm.aksamSaatler,
        aksam_guzergah: servisForm.aksamGuzergah
      });
      showToast(servisKayitVar ? 'Servis bilgileri güncellendi!' : 'Servis bilgileri kaydedildi!', 'success');
      await fetchServisBilgisi();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Servis bilgileri kaydedilirken hata!', 'error');
    } finally {
      setServisLoading(false);
    }
  };

  const handleDeleteServis = async () => {
    if (selectedYurt === 'all') {
      showToast('Lütfen silme işlemi için bir yurt seçin!', 'error');
      return;
    }
    if (!confirm('Servis bilgilerini silmek istediğinize emin misiniz?')) return;

    setServisLoading(true);
    try {
      await api.delete(`/admin/servis?yurt_id=${selectedYurt}`);
      showToast('Servis bilgileri silindi!', 'success');
      setServisForm({
        sabahSaatler: '',
        sabahGuzergah: '',
        aksamSaatler: '',
        aksamGuzergah: ''
      });
      setServisKayitVar(false);
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Servis bilgileri silinirken hata!', 'error');
    } finally {
      setServisLoading(false);
    }
  };

  const fetchYemekDosyalari = async () => {
    setYemekDosyalariLoading(true);
    try {
      const query = selectedYurt !== 'all' ? `?yurt_id=${selectedYurt}` : '';
      const response = await api.get(`/yemek/dosya/liste${query}`);
      setYemekDosyalari(response.data.dosyalar || []);
    } catch (error) {
      console.error('Yemek dosyaları yüklenirken hata:', error);
      showToast('Yemek dosyaları yüklenemedi!', 'error');
    } finally {
      setYemekDosyalariLoading(false);
    }
  };

  const openDosya = (id: number) => {
    try {
      const token = localStorage.getItem('token') || '';
      window.open(
        `${api.defaults.baseURL}/yemek/dosya/indir/${id}?token=${encodeURIComponent(token)}`,
        '_blank',
        'noopener,noreferrer'
      );
    } catch (error) {
      showToast('Dosya açılamadı!', 'error');
    }
  };

  const handleDeleteYemekDosya = async (id: number) => {
    if (!confirm('Bu yemek dosyasını silmek istediğinize emin misiniz?')) return;

    try {
      await api.delete(`/yemek/dosya/sil/${id}`);
      showToast('Yemek dosyası silindi!', 'success');
      fetchYemekDosyalari();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Yemek dosyası silinirken hata!', 'error');
    }
  };


  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.tc_no || !newUser.sifre || !newUser.ad || !newUser.soyad) {
      showToast('Lütfen zorunlu alanları doldurun!', 'error');
      return;
    }

    if (newUser.tc_no.length !== 11) {
      showToast('TC No 11 haneli olmalıdır!', 'error');
      return;
    }

    if (newUser.rol === 'ogrenci' && !newUser.aile_telefon) {
      showToast('Öğrenci için aile telefonu zorunludur!', 'error');
      return;
    }

    setLoading(true);
    
    try {
      await api.post('/admin/kullanici-olustur', newUser);
      showToast('Kullanıcı başarıyla oluşturuldu!', 'success');
      setNewUser({ tc_no: '', sifre: '', ad: '', soyad: '', aile_telefon: '', telefon: '', rol: 'ogrenci', yurt_id: '' });
      fetchUsers();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Kullanıcı oluşturulurken hata!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: number, newRole: string) => {
    try {
      await api.put(`/admin/kullanici-rol/${userId}`, { rol: newRole });
      showToast('Kullanıcı rolü güncellendi!', 'success');
      fetchUsers();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Rol güncellenirken hata!', 'error');
    }
  };

  const handleToggleStatus = async (userId: number) => {
    try {
      await api.put(`/admin/kullanici-durum/${userId}`);
      showToast('Kullanıcı durumu güncellendi!', 'success');
      fetchUsers();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'İşlem başarısız!', 'error');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;
    
    try {
      await api.delete(`/admin/kullanici/${userId}`);
      showToast('Kullanıcı silindi!', 'success');
      fetchUsers();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Kullanıcı silinirken hata!', 'error');
    }
  };

  const handleAddYemek = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newYemek.tarihBaslangic || !newYemek.tarihBitis || !newYemek.yurt_id) {
      showToast('Lütfen tarih aralığı ve yurt seçin!', 'error');
      return;
    }

    setLoading(true);
    
    try {
      const start = new Date(newYemek.tarihBaslangic);
      const end = new Date(newYemek.tarihBitis);
      if (start > end) {
        showToast('Başlangıç tarihi bitiş tarihinden büyük olamaz!', 'error');
        setLoading(false);
        return;
      }

      if (!newYemek.kahvaltiDosya && !newYemek.aksamDosya) {
        showToast('Lütfen en az bir dosya yükleyin!', 'error');
        setLoading(false);
        return;
      }

      const uploads = [];

      if (newYemek.kahvaltiDosya) {
        const formData = new FormData();
        formData.append('baslangic_tarihi', newYemek.tarihBaslangic);
        formData.append('bitis_tarihi', newYemek.tarihBitis);
        formData.append('ogun', 'kahvalti');
        formData.append('yurt_id', newYemek.yurt_id);
        formData.append('dosya', newYemek.kahvaltiDosya);
        uploads.push(api.post('/yemek/dosya', formData, { headers: { 'Content-Type': 'multipart/form-data' } }));
      }

      if (newYemek.aksamDosya) {
        const formData = new FormData();
        formData.append('baslangic_tarihi', newYemek.tarihBaslangic);
        formData.append('bitis_tarihi', newYemek.tarihBitis);
        formData.append('ogun', 'aksam');
        formData.append('yurt_id', newYemek.yurt_id);
        formData.append('dosya', newYemek.aksamDosya);
        uploads.push(api.post('/yemek/dosya', formData, { headers: { 'Content-Type': 'multipart/form-data' } }));
      }

      await Promise.all(uploads);

      showToast('Yemek listesi dosyaları yüklendi!', 'success');
      setNewYemek({
        tarihBaslangic: '',
        tarihBitis: '',
        yurt_id: '',
        kahvaltiDosya: null,
        aksamDosya: null
      });
      fetchYemekDosyalari();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Yemek eklenirken hata!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateYurt = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newYurt.ad) {
      showToast('Yurt adı gerekli!', 'error');
      return;
    }

    setLoading(true);
    
    try {
      await api.post('/admin/yurt-olustur', newYurt);
      showToast('Yurt şubesi oluşturuldu!', 'success');
      setNewYurt({ ad: '', adres: '', telefon: '' });
      await fetchYurtler();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Yurt oluşturulurken hata!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const startEditYurt = (yurt: YurtSubesi) => {
    setEditingYurt({
      id: yurt.id,
      ad: yurt.ad || '',
      adres: yurt.adres || '',
      telefon: yurt.telefon || '',
      mudur_id: yurt.mudur_id
    });
  };

  const handleUpdateYurt = async () => {
    if (!editingYurt) return;
    if (!editingYurt.ad.trim()) {
      showToast('Yurt adı gerekli!', 'error');
      return;
    }

    setLoading(true);
    try {
      await api.put(`/admin/yurt/${editingYurt.id}`, {
        ad: editingYurt.ad.trim(),
        adres: editingYurt.adres || null,
        telefon: editingYurt.telefon || null,
        mudur_id: editingYurt.mudur_id || null
      });
      showToast('Yurt şubesi güncellendi!', 'success');
      setEditingYurt(null);
      await fetchYurtler();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Yurt güncellenirken hata!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteYurt = async (id: number) => {
    if (!confirm('Silmek istediğinizden emin misiniz?')) return;

    setLoading(true);
    try {
      await api.delete(`/admin/yurt/${id}`);
      showToast('Yurt şubesi silindi!', 'success');
      if (editingYurt?.id === id) {
        setEditingYurt(null);
      }
      await fetchYurtler();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Yurt silinirken hata!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateIzinDurumu = async (izinId: number, durum: string) => {
    try {
      await api.put(`/izin/durum/${izinId}`, { durum, admin_notu: adminNotu });
      showToast(`İzin talebi ${durum === 'onaylandi' ? 'onaylandı' : 'reddedildi'}!`, 'success');
      setAdminNotu('');
      fetchIzinler();
      fetchDashboardStats();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'İşlem başarısız!', 'error');
    }
  };

  const handleUpdateSikayetDurumu = async (sikayetId: number, durum: string) => {
    try {
      await api.put(`/sikayet/durum/${sikayetId}`, { durum, admin_notu: adminNotu });
      showToast('Talep durumu güncellendi!', 'success');
      setAdminNotu('');
      fetchSikayetler();
      fetchDashboardStats();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'İşlem başarısız!', 'error');
    }
  };

  const filteredUsers = users.filter(u => 
    u.tc_no.includes(searchTerm) || 
    u.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.soyad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDurumBadge = (durum: string) => {
    switch (durum) {
      case 'onaylandi':
      case 'cozuldu':
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Onaylandı</Badge>;
      case 'reddedildi':
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="w-3 h-3" /> Reddedildi</Badge>;
      case 'inceleniyor':
        return <Badge variant="default" className="flex items-center gap-1"><Clock className="w-3 h-3" /> İnceleniyor</Badge>;
      default:
        return <Badge variant="warning" className="flex items-center gap-1"><Clock className="w-3 h-3" /> Beklemede</Badge>;
    }
  };


  const tipLabels: Record<string, string> = {
    sikayet: 'Şikayet',
    istek: 'İstek',
    oneri: 'Öneri'
  };

  const filteredIzinler = izinler.filter((izin) => {
    const matchesTc = izin.tc_no?.includes(izinTcFilter.trim()) ?? false;
    const matchesDurum = izinDurumFilter === 'all' || izin.durum === izinDurumFilter;
    return matchesTc && matchesDurum;
  });

  const filteredSikayetler = sikayetler.filter((sikayet) => {
    const matchesDurum = talepDurumFilter === 'all' || sikayet.durum === talepDurumFilter;
    return matchesDurum;
  });
  const mobileTabs = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'kullanicilar', label: 'Kullanıcılar' },
    { value: 'izinler', label: 'İzinler' },
    { value: 'sikayetler', label: 'Talepler' },
    { value: 'yemek', label: 'Yemek' },
    { value: 'servis', label: 'Servis' },
    { value: 'yeni-kullanici', label: 'Yeni Kullanıcı' },
    { value: 'yurtlar', label: 'Yurtlar' },
  ];

  return (
    <div className="min-h-screen bg-[var(--brand-cream)] text-[var(--brand-ink)]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[var(--brand-cream)]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
              <Home className="w-5 h-5 text-[var(--brand-olive)]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[var(--brand-ink)]">Yurt İzin Sistemi</h1>
              <p className="text-sm text-[var(--brand-ink)]/60">Admin Paneli</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-olive)] text-[var(--brand-cream)] text-xs font-semibold">
                {user?.ad?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <div className="text-sm font-medium text-[var(--brand-ink)]">{user?.ad} {user?.soyad}</div>
            </div>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden rounded-full border border-[var(--brand-olive)]/40 bg-white/80 text-[var(--brand-ink)] hover:bg-[var(--brand-sand)]"
                  aria-label="Menüyü Aç"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[var(--brand-cream)] text-[var(--brand-ink)]">
                <SheetHeader>
                  <SheetTitle>Admin Menüsü</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-2 px-4 pb-6">
                  {mobileTabs.map((tab) => (
                    <Button
                      key={tab.value}
                      variant={activeTab === tab.value ? 'default' : 'outline'}
                      className="justify-start rounded-xl"
                      onClick={() => {
                        setActiveTab(tab.value);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {tab.label}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    className="mt-2 justify-start rounded-xl border-[var(--brand-olive)]/40 bg-white/80"
                    onClick={() => {
                      logout();
                      navigate('/');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış Yap
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center gap-2 rounded-full border border-[var(--brand-olive)]/40 bg-white/80 text-[var(--brand-ink)] hover:bg-[var(--brand-sand)]"
            >
              <LogOut className="w-4 h-4" />
              Çıkış
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 gap-2 lg:grid-cols-8 lg:w-auto rounded-2xl bg-white/90 shadow-sm border border-black/10 p-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="kullanicilar" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Kullanıcılar</span>
            </TabsTrigger>
            <TabsTrigger value="izinler" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <FileCheck className="w-4 h-4" />
              <span className="hidden sm:inline">İzinler</span>
            </TabsTrigger>
            <TabsTrigger value="sikayetler" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Talepler</span>
            </TabsTrigger>
            <TabsTrigger value="yemek" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <Utensils className="w-4 h-4" />
              <span className="hidden sm:inline">Yemek</span>
            </TabsTrigger>
            <TabsTrigger value="servis" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Servis</span>
            </TabsTrigger>
            <TabsTrigger value="yeni-kullanici" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Yeni Kullanıcı</span>
            </TabsTrigger>
            <TabsTrigger value="yurtlar" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Yurtlar</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Toplam Öğrenci</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.ogrenci_sayisi || 0}</div>
                </CardContent>
              </Card>
              
              <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bekleyen İzinler</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.bekleyen_izinler || 0}</div>
                </CardContent>
              </Card>
              
              <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Toplam İzinler</CardTitle>
                  <FileCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.toplam_izinler || 0}</div>
                </CardContent>
              </Card>
              
              <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bugünkü İzinler</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.gunun_izinleri || 0}</div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bekleyen Talepler</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.bekleyen_sikayetler || 0}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="kullanicilar">
            <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Kullanıcı Yönetimi</CardTitle>
                    <CardDescription>Tüm kullanıcıları görüntüleyin ve yönetin</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedYurt} onValueChange={setSelectedYurt}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Tüm Yurtlar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Yurtlar</SelectItem>
                        {yurtler.map((yurt) => (
                          <SelectItem key={yurt.id} value={yurt.id.toString()}>{yurt.ad}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-48"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>TC No</TableHead>
                      <TableHead>Ad Soyad</TableHead>
                      <TableHead>Yurt</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>{u.tc_no}</TableCell>
                        <TableCell>{u.ad} {u.soyad}</TableCell>
                        <TableCell>{u.yurt_adi || '-'}</TableCell>
                        <TableCell>
                          <Select 
                            value={u.rol} 
                            onValueChange={(value) => handleUpdateRole(u.id!, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ogrenci">Öğrenci</SelectItem>
                              <SelectItem value="mudur">Müdür</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge variant={u.aktif ? 'success' : 'destructive'}>
                            {u.aktif ? 'Aktif' : 'Pasif'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleToggleStatus(u.id!)}
                            >
                              {u.aktif ? <UserX className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteUser(u.id!)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="izinler">
            <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>İzin Talepleri</CardTitle>
                    <CardDescription>Tüm izin taleplerini yönetin</CardDescription>
                  </div>
                  <Select value={selectedYurt} onValueChange={setSelectedYurt}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Tüm Yurtlar" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tüm Yurtlar</SelectItem>
                      {yurtler.map((yurt) => (
                        <SelectItem key={yurt.id} value={yurt.id.toString()}>{yurt.ad}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>TC No Ara</Label>
                    <Input
                      value={izinTcFilter}
                      onChange={(e) => setIzinTcFilter(e.target.value.replace(/\D/g, '').slice(0, 11))}
                      placeholder="Örn: 11111111111"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Durum</Label>
                    <Select
                      value={izinDurumFilter}
                      onValueChange={(value: 'all' | 'beklemede' | 'onaylandi' | 'reddedildi') => setIzinDurumFilter(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Durum seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tümü</SelectItem>
                        <SelectItem value="beklemede">Beklemede</SelectItem>
                        <SelectItem value="onaylandi">Onaylandı</SelectItem>
                        <SelectItem value="reddedildi">Onaylanmayan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredIzinler.length === 0 && (
                    <p className="text-sm text-gray-500">Filtreye uygun izin talebi bulunamadı.</p>
                  )}
                  {filteredIzinler.map((izin) => (
                    <div key={izin.id} className="border rounded-lg p-4">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {izin.ad} {izin.soyad}
                          </p>
                          <p className="text-sm text-gray-500">{izin.tc_no} • {izin.yurt_adi}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatDate(izin.baslangic_tarihi)} - {formatDate(izin.bitis_tarihi)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Gidilecek Yer: {izin.gidilecek_yer}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getDurumBadge(izin.durum)}
                          {izin.durum === 'beklemede' && (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleUpdateIzinDurumu(izin.id!, 'reddedildi')}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reddet
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleUpdateIzinDurumu(izin.id!, 'onaylandi')}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Onayla
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {izin.admin_notu && (
                        <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                          <span className="font-medium">Admin Notu:</span> {izin.admin_notu}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sikayetler">
            <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Şikayet / İstek Talepleri</CardTitle>
                    <CardDescription>Tüm talepleri yönetin</CardDescription>
                  </div>
                  <Select value={selectedYurt} onValueChange={setSelectedYurt}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Tüm Yurtlar" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tüm Yurtlar</SelectItem>
                      {yurtler.map((yurt) => (
                        <SelectItem key={yurt.id} value={yurt.id.toString()}>{yurt.ad}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <Label>Durum</Label>
                  <Select
                    value={talepDurumFilter}
                    onValueChange={(value: 'all' | 'beklemede' | 'inceleniyor' | 'cozuldu' | 'reddedildi') => setTalepDurumFilter(value)}
                  >
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="beklemede">Bekleyen</SelectItem>
                      <SelectItem value="inceleniyor">İnceleniyor</SelectItem>
                      <SelectItem value="cozuldu">Çözülen</SelectItem>
                      <SelectItem value="reddedildi">Çözülmeyen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  {filteredSikayetler.length === 0 && (
                    <p className="text-sm text-gray-500">Filtreye uygun talep bulunamadı.</p>
                  )}
                  {filteredSikayetler.map((sikayet) => (
                    <div key={sikayet.id} className="border rounded-lg p-4">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant={sikayet.tip === 'sikayet' ? 'destructive' : sikayet.tip === 'oneri' ? 'default' : 'secondary'}>
                              {tipLabels[sikayet.tip]}
                            </Badge>
                            <span className="font-semibold text-gray-900">{sikayet.konu}</span>
                          </div>
                          <p className="text-sm text-gray-500">{sikayet.ad} {sikayet.soyad} • {sikayet.yurt_adi} • {formatDate(sikayet.created_at || '')}</p>
                        </div>
                        {getDurumBadge(sikayet.durum)}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{sikayet.mesaj}</p>
                      
                      {(sikayet.durum === 'beklemede' || sikayet.durum === 'inceleniyor') && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">İşlem Yap</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Talep İşlem</DialogTitle>
                              <DialogDescription>{sikayet.konu}</DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Yanıt (Opsiyonel)</Label>
                                <Textarea
                                  value={adminNotu}
                                  onChange={(e) => setAdminNotu(e.target.value)}
                                  placeholder="Yanıtınızı yazın..."
                                />
                              </div>
                            </div>
                            
                            <DialogFooter>
                              {sikayet.durum === 'beklemede' && (
                                <Button 
                                  variant="default"
                                  onClick={() => handleUpdateSikayetDurumu(sikayet.id!, 'inceleniyor')}
                                >
                                  <Clock className="w-4 h-4 mr-2" />
                                  İncelemeye Al
                                </Button>
                              )}
                              {sikayet.durum === 'inceleniyor' && (
                                <>
                                  <Button 
                                    variant="destructive" 
                                    onClick={() => handleUpdateSikayetDurumu(sikayet.id!, 'reddedildi')}
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Çözülemedi
                                  </Button>
                                  <Button 
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleUpdateSikayetDurumu(sikayet.id!, 'cozuldu')}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Çözüldü
                                  </Button>
                                </>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      {sikayet.admin_notu && (
                        <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                          <span className="font-medium">Yanıt:</span> {sikayet.admin_notu}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yemek">
            <div className="max-w-5xl space-y-6">
              <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle>Yeni Yemek Ekle</CardTitle>
                  <CardDescription>Yemek listesi dosyası yükleyin</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddYemek} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Yurt</Label>
                      <Select
                        value={newYemek.yurt_id || undefined}
                        onValueChange={(value) => setNewYemek({ ...newYemek, yurt_id: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Yurt Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {yurtler.map((yurt) => (
                            <SelectItem key={yurt.id} value={yurt.id.toString()}>
                              {yurt.ad}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Başlangıç Tarihi</Label>
                        <Input
                          type="date"
                          value={newYemek.tarihBaslangic}
                          onChange={(e) =>
                            setNewYemek({ ...newYemek, tarihBaslangic: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bitiş Tarihi</Label>
                        <Input
                          type="date"
                          value={newYemek.tarihBitis}
                          onChange={(e) =>
                            setNewYemek({ ...newYemek, tarihBitis: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Label>Kahvaltı Listesi</Label>
                        <Input
                          type="file"
                          accept=".pdf,.xls,.xlsx"
                          className="h-9 w-full max-w-xs cursor-pointer"
                          onChange={(e) =>
                            setNewYemek({
                              ...newYemek,
                              kahvaltiDosya: e.target.files?.[0] ?? null
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Label>Akşam Yemeği Listesi</Label>
                        <Input
                          type="file"
                          accept=".pdf,.xls,.xlsx"
                          className="h-9 w-full max-w-xs cursor-pointer"
                          onChange={(e) =>
                            setNewYemek({
                              ...newYemek,
                              aksamDosya: e.target.files?.[0] ?? null
                            })
                          }
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      <Plus className="w-4 h-4 mr-2" />
                      {loading ? 'Ekleniyor...' : 'Ekle / Güncelle'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle>Yemek Dosyaları</CardTitle>
                  <CardDescription>Yüklenen dosyaları görüntüleyin ve silin</CardDescription>
                </CardHeader>
                <CardContent>
                  {yemekDosyalariLoading ? (
                    <p className="text-sm text-[var(--brand-ink)]/70">Yükleniyor...</p>
                  ) : yemekDosyalari.length === 0 ? (
                    <p className="text-sm text-[var(--brand-ink)]/70">Kayıtlı yemek dosyası bulunamadı.</p>
                  ) : (
                    <div className="space-y-2">
                      {yemekDosyalari.map((dosya) => (
                        <div
                          key={dosya.id}
                          className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-[var(--brand-cream)]/50 p-4 md:flex-row md:items-center md:justify-between"
                        >
                          <div className="space-y-1">
                            <div className="text-sm font-semibold text-[var(--brand-ink)]">
                              {dosya.yurt_adi} - {dosya.ogun === 'kahvalti' ? 'Kahvaltı' : 'Akşam'}
                            </div>
                            <div className="text-xs text-[var(--brand-ink)]/70">
                              {formatDate(dosya.baslangic_tarihi)} - {formatDate(dosya.bitis_tarihi)}
                            </div>
                            <div className="text-xs text-[var(--brand-ink)]/60">{dosya.dosya_adi}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => openDosya(dosya.id)}>
                              Görüntüle
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteYemekDosya(dosya.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Sil
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="servis">
            <Card className="max-w-3xl">
              <CardHeader>
                <CardTitle>Servis Saatleri ve Güzergahları</CardTitle>
                <CardDescription>Servis bilgilerini güncelleyebilirsiniz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <Label>Yurt</Label>
                  <Select value={selectedYurt} onValueChange={setSelectedYurt}>
                    <SelectTrigger>
                      <SelectValue placeholder="Yurt Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Yurt Seçin</SelectItem>
                      {yurtler.map((yurt) => (
                        <SelectItem key={yurt.id} value={yurt.id.toString()}>
                          {yurt.ad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-slate-700">Sabah Servisi</div>
                    <div className="space-y-2">
                      <Label>Saatler</Label>
                      <Input
                        value={servisForm.sabahSaatler}
                        onChange={(e) => setServisForm({ ...servisForm, sabahSaatler: e.target.value })}
                        placeholder="07:00, 07:30, 08:00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Güzergah</Label>
                      <Input
                        value={servisForm.sabahGuzergah}
                        onChange={(e) => setServisForm({ ...servisForm, sabahGuzergah: e.target.value })}
                        placeholder="Merkez → Kampüs → Kız Yurdu"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-slate-700">Akşam Servisi</div>
                    <div className="space-y-2">
                      <Label>Saatler</Label>
                      <Input
                        value={servisForm.aksamSaatler}
                        onChange={(e) => setServisForm({ ...servisForm, aksamSaatler: e.target.value })}
                        placeholder="18:00, 18:30, 19:00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Güzergah</Label>
                      <Input
                        value={servisForm.aksamGuzergah}
                        onChange={(e) => setServisForm({ ...servisForm, aksamGuzergah: e.target.value })}
                        placeholder="Kampüs → Merkez → Erkek Yurdu"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <Button onClick={handleSaveServis} disabled={servisLoading || selectedYurt === 'all'}>
                    {servisLoading ? 'Kaydediliyor...' : servisKayitVar ? 'Güncelle' : 'Kaydet'}
                  </Button>
                  {servisKayitVar && (
                    <Button
                      variant="destructive"
                      onClick={handleDeleteServis}
                      disabled={servisLoading || selectedYurt === 'all'}
                    >
                      Sil
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yeni-kullanici">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Yeni Kullanıcı Oluştur
                </CardTitle>
                <CardDescription>
                  TC No ve şifre ile yeni öğrenci veya personel hesabı oluşturun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>TC Kimlik No *</Label>
                      <Input
                        value={newUser.tc_no}
                        onChange={(e) => setNewUser({...newUser, tc_no: e.target.value.replace(/\D/g, '').slice(0, 11)})}
                        placeholder="11111111111"
                        maxLength={11}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Şifre *</Label>
                      <Input
                        type="password"
                        value={newUser.sifre}
                        onChange={(e) => setNewUser({...newUser, sifre: e.target.value})}
                        placeholder="En az 6 karakter"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Ad *</Label>
                      <Input
                        value={newUser.ad}
                        onChange={(e) => setNewUser({...newUser, ad: e.target.value})}
                        placeholder="Ad"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Soyad *</Label>
                      <Input
                        value={newUser.soyad}
                        onChange={(e) => setNewUser({...newUser, soyad: e.target.value})}
                        placeholder="Soyad"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Aile Telefonu {newUser.rol === 'ogrenci' ? '*' : ''}</Label>
                      <Input
                        type="tel"
                        value={newUser.aile_telefon}
                        onChange={(e) => setNewUser({...newUser, aile_telefon: e.target.value})}
                        placeholder="05XX XXX XXXX"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Telefon</Label>
                      <Input
                        value={newUser.telefon}
                        onChange={(e) => setNewUser({...newUser, telefon: e.target.value})}
                        placeholder="05XX XXX XXXX"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Rol</Label>
                    <Select 
                      value={newUser.rol} 
                      onValueChange={(value) => setNewUser({...newUser, rol: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ogrenci">Öğrenci</SelectItem>
                        <SelectItem value="mudur">Müdür</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Yurt</Label>
                    <Select 
                      value={newUser.yurt_id} 
                      onValueChange={(value) => setNewUser({...newUser, yurt_id: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Yurt Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {yurtler.map((yurt) => (
                          <SelectItem key={yurt.id} value={yurt.id.toString()}>{yurt.ad}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Oluşturuluyor...
                      </div>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Kullanıcı Oluştur
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yurtlar">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Yeni Yurt Şubesi
                  </CardTitle>
                  <CardDescription>Yeni yurt şubesi oluşturun</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateYurt} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Yurt Adı *</Label>
                      <Input
                        value={newYurt.ad}
                        onChange={(e) => setNewYurt({...newYurt, ad: e.target.value})}
                        placeholder="Örn: Yeni Yurt"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Adres</Label>
                      <Textarea
                        value={newYurt.adres}
                        onChange={(e) => setNewYurt({...newYurt, adres: e.target.value})}
                        placeholder="Yurt adresi..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Telefon</Label>
                      <Input
                        value={newYurt.telefon}
                        onChange={(e) => setNewYurt({...newYurt, telefon: e.target.value})}
                        placeholder="0212 XXX XX XX"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      <Plus className="w-4 h-4 mr-2" />
                      {loading ? 'Oluşturuluyor...' : 'Yurt Oluştur'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle>Mevcut Yurt Şubeleri</CardTitle>
                  <CardDescription>Sistemdeki yurt şubeleri</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {yurtler.map((yurt) => (
                      <div key={yurt.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-[var(--brand-sand)] rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-[var(--brand-olive)]" />
                          </div>
                          <div className="flex-1">
                            {editingYurt?.id === yurt.id ? (
                              <div className="space-y-3">
                                <Input
                                  value={editingYurt.ad}
                                  onChange={(e) =>
                                    setEditingYurt({ ...editingYurt, ad: e.target.value })
                                  }
                                  placeholder="Yurt adı"
                                />
                                <Textarea
                                  value={editingYurt.adres}
                                  onChange={(e) =>
                                    setEditingYurt({ ...editingYurt, adres: e.target.value })
                                  }
                                  placeholder="Adres"
                                  rows={2}
                                />
                                <Input
                                  value={editingYurt.telefon}
                                  onChange={(e) =>
                                    setEditingYurt({ ...editingYurt, telefon: e.target.value })
                                  }
                                  placeholder="Telefon"
                                />
                                <div className="flex flex-wrap gap-2">
                                  <Button size="sm" onClick={handleUpdateYurt} disabled={loading}>
                                    Güncelle
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingYurt(null)}
                                    disabled={loading}
                                  >
                                    Vazgeç
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-start justify-between gap-3">
                                  <h4 className="font-semibold text-gray-900">{yurt.ad}</h4>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => startEditYurt(yurt)}
                                      disabled={loading}
                                    >
                                      Güncelle
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleDeleteYurt(yurt.id)}
                                      disabled={loading}
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Sil
                                    </Button>
                                  </div>
                                </div>
                                {yurt.adres && (
                                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                    <MapPin className="w-3 h-3" />
                                    {yurt.adres}
                                  </p>
                                )}
                                {yurt.telefon && (
                                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                    <Phone className="w-3 h-3" />
                                    {yurt.telefon}
                                  </p>
                                )}
                                {yurt.mudur_ad && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Müdür: {yurt.mudur_ad} {yurt.mudur_soyad}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
