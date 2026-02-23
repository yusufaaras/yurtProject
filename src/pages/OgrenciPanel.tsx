import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import api from '@/services/api';
import { IzinTalebi, YemekListesi, SikayetIstek } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  LogOut, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  FileText,
  Utensils,
  Home,
  CheckCircle,
  XCircle,
  Clock3,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  Menu
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function OgrenciPanel() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('yemek');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [izinForm, setIzinForm] = useState({
    baslangic_tarihi: '',
    bitis_tarihi: '',
    cikis_saati: '',
    donus_saati: '',
    gidilecek_yer: '',
    telefon: '',
    aciklama: ''
  });
  
  const [sikayetForm, setSikayetForm] = useState({
    tip: 'istek',
    konu: '',
    mesaj: ''
  });
  
  const [izinler, setIzinler] = useState<IzinTalebi[]>([]);
  const [sikayetler, setSikayetler] = useState<SikayetIstek[]>([]);
  const [yemekListesi, setYemekListesi] = useState<YemekListesi>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchYemekListesi();
    fetchIzinler();
    fetchSikayetler();
  }, []);

  const fetchYemekListesi = async () => {
    try {
      const response = await api.get('/yemek/gunluk');
      setYemekListesi(response.data.yemekler);
    } catch (error) {
      console.error('Yemek listesi yüklenirken hata:', error);
    }
  };

  const fetchIzinler = async () => {
    try {
      const response = await api.get('/izin/taleplerim');
      setIzinler(response.data.izinler);
    } catch (error) {
      console.error('İzinler yüklenirken hata:', error);
    }
  };

  const fetchSikayetler = async () => {
    try {
      const response = await api.get('/sikayet/taleplerim');
      setSikayetler(response.data.sikayetler);
    } catch (error) {
      console.error('Şikayetler yüklenirken hata:', error);
    }
  };

  const handleIzinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!izinForm.baslangic_tarihi || !izinForm.bitis_tarihi || !izinForm.gidilecek_yer || !izinForm.telefon) {
      showToast('Lütfen zorunlu alanları doldurun!', 'error');
      return;
    }

    if (new Date(izinForm.baslangic_tarihi) > new Date(izinForm.bitis_tarihi)) {
      showToast('Bitiş tarihi başlangıç tarihinden önce olamaz!', 'error');
      return;
    }

    setLoading(true);
    
    try {
      await api.post('/izin/talep', izinForm);
      showToast('İzin talebiniz başarıyla oluşturuldu!', 'success');
      setIzinForm({
        baslangic_tarihi: '',
        bitis_tarihi: '',
        cikis_saati: '',
        donus_saati: '',
        gidilecek_yer: '',
        telefon: '',
        aciklama: ''
      });
      fetchIzinler();
      setActiveTab('izinlerim');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'İzin talebi oluşturulurken hata!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSikayetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sikayetForm.konu || !sikayetForm.mesaj) {
      showToast('Lütfen konu ve mesaj alanlarını doldurun!', 'error');
      return;
    }

    setLoading(true);
    
    try {
      await api.post('/sikayet/gonder', sikayetForm);
      showToast('Şikayet/İsteğiniz başarıyla gönderildi!', 'success');
      setSikayetForm({
        tip: 'istek',
        konu: '',
        mesaj: ''
      });
      fetchSikayetler();
      setActiveTab('taleplerim');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Gönderilirken hata!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getDurumBadge = (durum: string) => {
    const baseClass = "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold";
    switch (durum) {
      case 'onaylandi':
      case 'cozuldu':
        return (
          <Badge variant="outline" className={`${baseClass} border-[var(--brand-olive)]/30 bg-[var(--brand-olive)]/10 text-[var(--brand-olive)]`}>
            <CheckCircle className="w-3 h-3" /> Onaylandı
          </Badge>
        );
      case 'reddedildi':
        return (
          <Badge variant="outline" className={`${baseClass} border-red-500/30 bg-red-500/10 text-red-600`}>
            <XCircle className="w-3 h-3" /> Reddedildi
          </Badge>
        );
      case 'inceleniyor':
        return (
          <Badge variant="outline" className={`${baseClass} border-[var(--brand-gold)]/40 bg-[var(--brand-gold)]/15 text-[var(--brand-olive)]`}>
            <Clock3 className="w-3 h-3" /> İnceleniyor
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className={`${baseClass} border-[var(--brand-ink)]/20 bg-[var(--brand-sand)] text-[var(--brand-ink)]/70`}>
            <Clock3 className="w-3 h-3" /> Beklemede
          </Badge>
        );
    }
  };

  const getTipIcon = (tip: string) => {
    switch (tip) {
      case 'sikayet':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'oneri':
        return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-[var(--brand-olive)]" />;
    }
  };

  const ogunLabels: Record<string, string> = {
    kahvalti: 'Kahvaltı',
    ogle: 'Öğle Yemeği',
    aksam: 'Akşam Yemeği'
  };

  const tipLabels: Record<string, string> = {
    sikayet: 'Şikayet',
    istek: 'İstek',
    oneri: 'Öneri'
  };

  const userInitials = `${user?.ad?.[0] ?? ''}${user?.soyad?.[0] ?? ''}`.toUpperCase();
  const mobileTabs = [
    { value: 'yemek', label: 'Yemek Listesi' },
    { value: 'izin', label: 'İzin Talebi' },
    { value: 'izinlerim', label: 'İzinlerim' },
    { value: 'sikayet', label: 'Şikayet / İstek' },
    { value: 'taleplerim', label: 'Taleplerim' },
  ];

  return (
    <div className="min-h-screen bg-[var(--brand-cream)] text-[var(--brand-ink)]">
      <header className="bg-[var(--brand-cream)] border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--brand-olive)] rounded-lg flex items-center justify-center shadow-sm">
              <Home className="w-4 h-4 text-[var(--brand-cream)]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[var(--brand-ink)]">Yurt İzin Sistemi</h1>
              <p className="text-xs text-[var(--brand-ink)]/60">Öğrenci Paneli - {user?.yurt_adi}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-[var(--brand-ink)]">{user?.ad} {user?.soyad}</p>
              <p className="text-xs text-[var(--brand-ink)]/60">{user?.tc_no}</p>
            </div>
            <Avatar className="h-9 w-9 border border-black/10 bg-white shadow-xs">
              <AvatarFallback className="text-xs font-semibold text-[var(--brand-olive)] bg-[var(--brand-sand)]">
                {userInitials || 'U'}
              </AvatarFallback>
            </Avatar>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden border border-[var(--brand-olive)]/40 text-[var(--brand-ink)] hover:bg-[var(--brand-sand)]"
                  aria-label="Menüyü Aç"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[var(--brand-cream)] text-[var(--brand-ink)]">
                <SheetHeader>
                  <SheetTitle>Öğrenci Menüsü</SheetTitle>
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
              className="flex items-center gap-2 border border-[var(--brand-olive)]/40 text-[var(--brand-ink)] hover:bg-[var(--brand-sand)]"
            >
              <LogOut className="w-4 h-4" />
              Çıkış
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 lg:w-auto rounded-xl bg-white/80 shadow-sm border border-black/10 p-1">
            <TabsTrigger value="yemek" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <Utensils className="w-4 h-4" />
              <span className="hidden sm:inline">Yemek Listesi</span>
            </TabsTrigger>
            <TabsTrigger value="izin" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">İzin Talebi</span>
            </TabsTrigger>
            <TabsTrigger value="izinlerim" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">İzinlerim</span>
            </TabsTrigger>
            <TabsTrigger value="sikayet" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Şikayet/İstek</span>
            </TabsTrigger>
            <TabsTrigger value="taleplerim" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[var(--brand-olive)] data-[state=active]:text-[var(--brand-cream)]">
              <AlertCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Taleplerim</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="yemek">
            <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
              <CardHeader className="border-b border-black/5 bg-[var(--brand-cream)]/60">
                <CardTitle className="flex items-center gap-2 font-['Playfair_Display'] text-xl text-[var(--brand-ink)]">
                  <Utensils className="w-5 h-5" />
                  Yemek Listesi
                </CardTitle>
                <CardDescription className="text-[var(--brand-ink)]/60">
                  {user?.yurt_adi} günlük yemek menüsü
                </CardDescription>
              </CardHeader>
              <CardContent>
                {Object.keys(yemekListesi).length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-[var(--brand-sand)] shadow-sm">
                      <Utensils className="h-10 w-10 text-[var(--brand-olive)]" />
                    </div>
                    <p className="text-[var(--brand-ink)] font-medium">Henüz liste eklenmedi</p>
                    <p className="text-sm text-[var(--brand-ink)]/60 mt-1">Yemek menüsü yayınlandığında burada görünecek.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(yemekListesi).map(([tarih, ogunler]) => (
                      <div key={tarih} className="border border-black/10 rounded-xl overflow-hidden bg-white/90">
                        <div className="bg-[var(--brand-sand)] px-4 py-3 border-b border-black/10">
                          <h3 className="font-semibold text-[var(--brand-ink)]">
                            {formatDate(tarih)}
                          </h3>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          {Object.entries(ogunler).map(([ogun, menu]) => (
                            <div key={ogun} className="rounded-xl border border-black/10 bg-[var(--brand-cream)] p-4 shadow-xs">
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--brand-olive)]/10 text-[var(--brand-olive)]">
                                  {ogunLabels[ogun] || ogun}
                                </span>
                                <Utensils className="w-4 h-4 text-[var(--brand-olive)]" />
                              </div>
                              <p className="text-[var(--brand-ink)]/80 mt-3 text-sm leading-relaxed">{menu}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="izin">
            <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
              <CardHeader className="border-b border-black/5 bg-[var(--brand-cream)]/60">
                <CardTitle className="flex items-center gap-2 font-['Playfair_Display'] text-xl text-[var(--brand-ink)]">
                  <FileText className="w-5 h-5" />
                  Yeni İzin Talebi
                </CardTitle>
                <CardDescription className="text-[var(--brand-ink)]/60">
                  Yurttan izin almak için formu doldurun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleIzinSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="baslangic" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Başlangıç Tarihi *
                      </Label>
                      <Input
                        id="baslangic"
                        type="date"
                        value={izinForm.baslangic_tarihi}
                        onChange={(e) => setIzinForm({...izinForm, baslangic_tarihi: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        className="rounded-xl border border-black/10 bg-white/90 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]/40"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bitis" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Bitiş Tarihi *
                      </Label>
                      <Input
                        id="bitis"
                        type="date"
                        value={izinForm.bitis_tarihi}
                        onChange={(e) => setIzinForm({...izinForm, bitis_tarihi: e.target.value})}
                        min={izinForm.baslangic_tarihi || new Date().toISOString().split('T')[0]}
                        className="rounded-xl border border-black/10 bg-white/90 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]/40"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cikis" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Çıkış Saati
                      </Label>
                      <Input
                        id="cikis"
                        type="time"
                        value={izinForm.cikis_saati}
                        onChange={(e) => setIzinForm({...izinForm, cikis_saati: e.target.value})}
                        className="rounded-xl border border-black/10 bg-white/90 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]/40"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="donus" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Dönüş Saati
                      </Label>
                      <Input
                        id="donus"
                        type="time"
                        value={izinForm.donus_saati}
                        onChange={(e) => setIzinForm({...izinForm, donus_saati: e.target.value})}
                        className="rounded-xl border border-black/10 bg-white/90 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]/40"
                      />
                    </div>
                    
                    <div className="space-y-2 lg:col-span-2">
                      <Label htmlFor="yer" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Gidilecek Yer *
                      </Label>
                      <Input
                        id="yer"
                        placeholder="Örn: İstanbul, Ankara..."
                        value={izinForm.gidilecek_yer}
                        onChange={(e) => setIzinForm({...izinForm, gidilecek_yer: e.target.value})}
                        className="rounded-xl border border-black/10 bg-white/90 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]/40"
                      />
                    </div>
                    
                    <div className="space-y-2 lg:col-span-2">
                      <Label htmlFor="telefon" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        İletişim Telefonu *
                      </Label>
                      <Input
                        id="telefon"
                        type="tel"
                        placeholder="05XX XXX XXXX"
                        value={izinForm.telefon}
                        onChange={(e) => setIzinForm({...izinForm, telefon: e.target.value})}
                        className="rounded-xl border border-black/10 bg-white/90 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]/40"
                      />
                    </div>
                    
                    <div className="space-y-2 lg:col-span-2">
                      <Label htmlFor="aciklama" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Açıklama
                      </Label>
                      <Textarea
                        id="aciklama"
                        placeholder="İzin talebinizle ilgili ek bilgiler..."
                        value={izinForm.aciklama}
                        onChange={(e) => setIzinForm({...izinForm, aciklama: e.target.value})}
                        rows={3}
                        className="rounded-xl border border-black/10 bg-white/90 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]/40"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full rounded-full bg-[var(--brand-olive)] text-[var(--brand-cream)] hover:bg-[#2f3a2c]"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[var(--brand-cream)] border-t-transparent rounded-full animate-spin" />
                        Gönderiliyor...
                      </div>
                    ) : (
                      'İzin Talebi Gönder'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="izinlerim">
            <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
              <CardHeader className="border-b border-black/5 bg-[var(--brand-cream)]/60">
                <CardTitle className="flex items-center gap-2 font-['Playfair_Display'] text-xl text-[var(--brand-ink)]">
                  <Calendar className="w-5 h-5" />
                  İzin Taleplerim
                </CardTitle>
                <CardDescription className="text-[var(--brand-ink)]/60">
                  Tüm izin taleplerinizi görüntüleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                {izinler.length === 0 ? (
                  <div className="text-center py-12 text-[var(--brand-ink)]/60">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Henüz izin talebiniz bulunmuyor.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {izinler.map((izin) => (
                      <div key={izin.id} className="border border-black/10 rounded-xl p-4 bg-white/90 hover:shadow-sm transition-shadow">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div>
                            <p className="font-semibold text-[var(--brand-ink)]">
                              {formatDate(izin.baslangic_tarihi)} - {formatDate(izin.bitis_tarihi)}
                            </p>
                            <p className="text-sm text-[var(--brand-ink)]/60 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {izin.gidilecek_yer}
                            </p>
                          </div>
                          {getDurumBadge(izin.durum)}
                        </div>
                        
                        {(izin.cikis_saati || izin.donus_saati) && (
                          <div className="flex gap-4 text-sm text-[var(--brand-ink)]/70 mb-2">
                            {izin.cikis_saati && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Çıkış: {izin.cikis_saati}
                              </span>
                            )}
                            {izin.donus_saati && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Dönüş: {izin.donus_saati}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {izin.aciklama && (
                          <p className="text-sm text-[var(--brand-ink)]/70 mt-2">
                            <span className="font-medium">Açıklama:</span> {izin.aciklama}
                          </p>
                        )}
                        
                        {izin.admin_notu && (
                          <div className="mt-3 p-3 bg-[var(--brand-sand)] rounded text-sm">
                            <span className="font-medium text-[var(--brand-ink)]">Admin Notu:</span>
                            <p className="text-[var(--brand-ink)]/70 mt-1">{izin.admin_notu}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sikayet">
            <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
              <CardHeader className="border-b border-black/5 bg-[var(--brand-cream)]/60">
                <CardTitle className="flex items-center gap-2 font-['Playfair_Display'] text-xl text-[var(--brand-ink)]">
                  <MessageSquare className="w-5 h-5" />
                  Şikayet / İstek / Öneri
                </CardTitle>
                <CardDescription className="text-[var(--brand-ink)]/60">
                  Görüş, öneri veya şikayetlerinizi bize iletin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSikayetSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label>Tip</Label>
                    <Select 
                      value={sikayetForm.tip} 
                      onValueChange={(value) => setSikayetForm({...sikayetForm, tip: value})}
                    >
                      <SelectTrigger className="rounded-xl border border-black/10 bg-white/90 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]/40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="istek">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            İstek
                          </div>
                        </SelectItem>
                        <SelectItem value="sikayet">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Şikayet
                          </div>
                        </SelectItem>
                        <SelectItem value="oneri">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" />
                            Öneri
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Konu *</Label>
                    <Input
                      placeholder="Kısa bir konu başlığı girin..."
                      value={sikayetForm.konu}
                      onChange={(e) => setSikayetForm({...sikayetForm, konu: e.target.value})}
                      className="rounded-xl border border-black/10 bg-white/90 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]/40"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Mesajınız *</Label>
                    <Textarea
                      placeholder="Detaylı açıklamanızı buraya yazın..."
                      value={sikayetForm.mesaj}
                      onChange={(e) => setSikayetForm({...sikayetForm, mesaj: e.target.value})}
                      rows={5}
                      className="rounded-xl border border-black/10 bg-white/90 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]/40"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full rounded-full bg-[var(--brand-olive)] text-[var(--brand-cream)] hover:bg-[#2f3a2c]"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[var(--brand-cream)] border-t-transparent rounded-full animate-spin" />
                        Gönderiliyor...
                      </div>
                    ) : (
                      'Gönder'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="taleplerim">
            <Card className="rounded-3xl border border-black/10 bg-white/90 shadow-sm">
              <CardHeader className="border-b border-black/5 bg-[var(--brand-cream)]/60">
                <CardTitle className="flex items-center gap-2 font-['Playfair_Display'] text-xl text-[var(--brand-ink)]">
                  <AlertCircle className="w-5 h-5" />
                  Şikayet / İstek Taleplerim
                </CardTitle>
                <CardDescription className="text-[var(--brand-ink)]/60">
                  Tüm taleplerinizi görüntüleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sikayetler.length === 0 ? (
                  <div className="text-center py-12 text-[var(--brand-ink)]/60">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Henüz talebiniz bulunmuyor.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sikayetler.map((sikayet) => (
                      <div key={sikayet.id} className="border border-black/10 rounded-xl p-4 bg-white/90 hover:shadow-sm transition-shadow">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            {getTipIcon(sikayet.tip)}
                            <div>
                              <p className="font-semibold text-[var(--brand-ink)]">{sikayet.konu}</p>
                              <p className="text-xs text-[var(--brand-ink)]/60">
                                {tipLabels[sikayet.tip]} • {formatDate(sikayet.created_at || '')}
                              </p>
                            </div>
                          </div>
                          {getDurumBadge(sikayet.durum)}
                        </div>
                        
                        <p className="text-sm text-[var(--brand-ink)]/70 mt-2">{sikayet.mesaj}</p>
                        
                        {sikayet.admin_notu && (
                          <div className="mt-3 p-3 bg-[var(--brand-sand)] rounded text-sm">
                            <span className="font-medium text-[var(--brand-ink)]">Yanıt:</span>
                            <p className="text-[var(--brand-ink)]/70 mt-1">{sikayet.admin_notu}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
