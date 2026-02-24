import { useEffect, useState } from 'react'
import YurtHeader from '@/components/YurtHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import api from '@/services/api'
import { IzinTalebi } from '@/types'
import { formatDate } from '@/lib/utils'

export default function IzinYonetim() {
  const { user } = useAuth()
  const { showToast } = useToast()

  const [loading, setLoading] = useState(false)
  const [izinler, setIzinler] = useState<IzinTalebi[]>([])

  const [izinForm, setIzinForm] = useState({
    baslangic_tarihi: '',
    bitis_tarihi: '',
    gidilecek_yer: '',
    telefon: user?.telefon || '',
    aciklama: ''
  })

  const [gecGirisForm, setGecGirisForm] = useState({
    tarih: new Date().toISOString().split('T')[0],
    saat: '',
    telefon: user?.telefon || '',
    neden: ''
  })

  useEffect(() => {
    fetchIzinler()
  }, [])

  useEffect(() => {
    setIzinForm((prev) => ({ ...prev, telefon: prev.telefon || user?.telefon || '' }))
    setGecGirisForm((prev) => ({ ...prev, telefon: prev.telefon || user?.telefon || '' }))
  }, [user?.telefon])

  const fetchIzinler = async () => {
    try {
      const response = await api.get('/izin/taleplerim')
      setIzinler(response.data.izinler || [])
    } catch (error) {
      console.error('İzin talepleri yüklenemedi:', error)
      showToast('İzin talepleri yüklenemedi!', 'error')
    }
  }

  const handleIzinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!izinForm.baslangic_tarihi || !izinForm.bitis_tarihi || !izinForm.gidilecek_yer || !izinForm.telefon) {
      showToast('Lütfen zorunlu alanları doldurun!', 'error')
      return
    }

    if (new Date(izinForm.baslangic_tarihi) > new Date(izinForm.bitis_tarihi)) {
      showToast('Bitiş tarihi başlangıç tarihinden önce olamaz!', 'error')
      return
    }

    setLoading(true)
    try {
      await api.post('/izin/talep', izinForm)
      showToast('İzin talebi başarıyla gönderildi.', 'success')
      setIzinForm({
        baslangic_tarihi: '',
        bitis_tarihi: '',
        gidilecek_yer: '',
        telefon: user?.telefon || '',
        aciklama: '',
        durum: 'onaylandi'
      })
      await fetchIzinler()
    } catch (error: any) {
      showToast(error.response?.data?.message || 'İzin talebi gönderilemedi!', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleGecGirisSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!gecGirisForm.tarih || !gecGirisForm.saat || !gecGirisForm.neden || !gecGirisForm.telefon) {
      showToast('Lütfen geç giriş formundaki zorunlu alanları doldurun!', 'error')
      return
    }

    setLoading(true)
    try {
      await api.post('/izin/talep', {
        baslangic_tarihi: gecGirisForm.tarih,
        bitis_tarihi: gecGirisForm.tarih,
        cikis_saati: gecGirisForm.saat,
        donus_saati: null,
        gidilecek_yer: 'Geç Giriş Bildirimi',
        telefon: gecGirisForm.telefon,
        aciklama: `Geç giriş nedeni: ${gecGirisForm.neden}`
      })

      showToast('Geç giriş bildirimi kaydedildi.', 'success')
      setGecGirisForm({
        tarih: new Date().toISOString().split('T')[0],
        saat: '',
        telefon: user?.telefon || '',
        neden: ''
      })
      await fetchIzinler()
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Geç giriş bildirimi gönderilemedi!', 'error')
    } finally {
      setLoading(false)
    }
  }

  const getDurumBadge = (durum: string) => {
    if (durum === 'onaylandi') {
      return <Badge variant="success">Onaylandı</Badge>
    }
    if (durum === 'reddedildi') {
      return <Badge variant="destructive">Reddedildi</Badge>
    }
    return <Badge variant="secondary">Beklemede</Badge>
  }

  return (
    <div className="min-h-screen bg-[var(--brand-cream)] text-[var(--brand-ink)]">
      <YurtHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="space-y-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/90 shadow-sm">
              <div className="border-b border-black/5 bg-[var(--brand-cream)]/60 px-6 py-4">
                <h2 className="font-['Playfair_Display'] text-xl font-semibold text-[var(--brand-ink)]">İzin Talep Formu</h2>
              </div>
              <form className="space-y-5 p-6" onSubmit={handleIzinSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--brand-ink)]/80">Başlangıç Tarihi</label>
                    <Input
                      type="date"
                      className="h-11 rounded-xl border border-black/10 bg-white/90"
                      value={izinForm.baslangic_tarihi}
                      onChange={(e) => setIzinForm({ ...izinForm, baslangic_tarihi: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--brand-ink)]/80">Bitiş Tarihi</label>
                    <Input
                      type="date"
                      className="h-11 rounded-xl border border-black/10 bg-white/90"
                      value={izinForm.bitis_tarihi}
                      onChange={(e) => setIzinForm({ ...izinForm, bitis_tarihi: e.target.value })}
                      min={izinForm.baslangic_tarihi || undefined}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--brand-ink)]/80">Gidilecek Yer</label>
                  <Input
                    type="text"
                    placeholder="Örn: Aile evi"
                    className="h-11 rounded-xl border border-black/10 bg-white/90"
                    value={izinForm.gidilecek_yer}
                    onChange={(e) => setIzinForm({ ...izinForm, gidilecek_yer: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--brand-ink)]/80">Telefon</label>
                  <Input
                    type="tel"
                    placeholder="05xx xxx xx xx"
                    className="h-11 rounded-xl border border-black/10 bg-white/90"
                    value={izinForm.telefon}
                    onChange={(e) => setIzinForm({ ...izinForm, telefon: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--brand-ink)]/80">Açıklama</label>
                  <Textarea
                    placeholder="İzin talebinizin nedenini yazın..."
                    className="min-h-[120px] rounded-xl border border-black/10 bg-white/90"
                    value={izinForm.aciklama}
                    onChange={(e) => setIzinForm({ ...izinForm, aciklama: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full rounded-full bg-[var(--brand-olive)] text-[var(--brand-cream)] hover:bg-[#2f3a2c]"
                >
                  {loading ? 'Gönderiliyor...' : 'İzin Talebi Gönder'}
                </Button>
              </form>
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/90 shadow-sm">
              <div className="border-b border-black/5 bg-[var(--brand-cream)]/60 px-6 py-4">
                <h2 className="font-['Playfair_Display'] text-xl font-semibold text-[var(--brand-ink)]">Geç Giriş Bildir</h2>
              </div>
              <form className="space-y-5 p-6" onSubmit={handleGecGirisSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--brand-ink)]/80">Tarih</label>
                  <Input
                    type="date"
                    className="h-11 rounded-xl border border-black/10 bg-white/90"
                    value={gecGirisForm.tarih}
                    onChange={(e) => setGecGirisForm({ ...gecGirisForm, tarih: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--brand-ink)]/80">Saat</label>
                  <Input
                    type="time"
                    className="h-11 rounded-xl border border-black/10 bg-white/90"
                    value={gecGirisForm.saat}
                    onChange={(e) => setGecGirisForm({ ...gecGirisForm, saat: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--brand-ink)]/80">Telefon</label>
                  <Input
                    type="tel"
                    placeholder="05xx xxx xx xx"
                    className="h-11 rounded-xl border border-black/10 bg-white/90"
                    value={gecGirisForm.telefon}
                    onChange={(e) => setGecGirisForm({ ...gecGirisForm, telefon: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--brand-ink)]/80">Neden</label>
                  <Textarea
                    placeholder="Geç giriş nedeninizi yazın..."
                    className="min-h-[120px] rounded-xl border border-black/10 bg-white/90"
                    value={gecGirisForm.neden}
                    onChange={(e) => setGecGirisForm({ ...gecGirisForm, neden: e.target.value })}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full rounded-full bg-[var(--brand-olive)] text-[var(--brand-cream)] hover:bg-[#2f3a2c]"
                >
                  {loading ? 'Gönderiliyor...' : 'Bildirim Gönder'}
                </Button>
              </form>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/90 shadow-sm">
            <div className="border-b border-black/5 bg-[var(--brand-cream)]/60 px-6 py-4">
              <h2 className="font-['Playfair_Display'] text-xl font-semibold text-[var(--brand-ink)]">İzin Taleplerim</h2>
            </div>
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[var(--brand-sand)]/60">
                    <TableHead className="text-[var(--brand-ink)]/70">ID</TableHead>
                    <TableHead className="text-[var(--brand-ink)]/70">Başlangıç</TableHead>
                    <TableHead className="text-[var(--brand-ink)]/70">Bitiş</TableHead>
                    <TableHead className="text-[var(--brand-ink)]/70">Gidilecek Yer</TableHead>
                    <TableHead className="text-[var(--brand-ink)]/70">Durum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {izinler.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-[var(--brand-ink)]/60">
                        Henüz kayıt bulunmuyor.
                      </TableCell>
                    </TableRow>
                  ) : (
                    izinler.map((izin) => (
                      <TableRow key={izin.id} className="border-black/5">
                        <TableCell className="font-medium text-[var(--brand-ink)]">#{izin.id}</TableCell>
                        <TableCell>{formatDate(izin.baslangic_tarihi)}</TableCell>
                        <TableCell>{formatDate(izin.bitis_tarihi)}</TableCell>
                        <TableCell>{izin.gidilecek_yer || '-'}</TableCell>
                        <TableCell>{getDurumBadge(izin.durum)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
