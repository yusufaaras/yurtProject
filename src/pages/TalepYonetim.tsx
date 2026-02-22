import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, Lightbulb, MessageSquare } from 'lucide-react'

import YurtHeader from '@/components/YurtHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/contexts/ToastContext'
import api from '@/services/api'
import { SikayetIstek } from '@/types'
import { formatDate } from '@/lib/utils'

type TalepTipi = 'istek' | 'sikayet' | 'oneri'

export default function TalepYonetim() {
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [talepler, setTalepler] = useState<SikayetIstek[]>([])

  const [talepForm, setTalepForm] = useState({
    tip: 'istek' as TalepTipi,
    konu: '',
    mesaj: '',
  })

  const fetchTalepler = async () => {
    try {
      const response = await api.get('/sikayet/taleplerim')
      setTalepler(response.data.sikayetler || [])
    } catch (error) {
      console.error('Talepler yüklenemedi:', error)
      showToast('Talepler yüklenemedi!', 'error')
    }
  }

  useEffect(() => {
    void fetchTalepler()
  }, [])

  const handleTalepSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!talepForm.konu || !talepForm.mesaj) {
      showToast('Lütfen konu ve mesaj alanlarını doldurun!', 'error')
      return
    }

    setLoading(true)
    try {
      await api.post('/sikayet/gonder', talepForm)
      showToast('Talebiniz başarıyla gönderildi.', 'success')
      setTalepForm({
        tip: 'istek',
        konu: '',
        mesaj: '',
      })
      await fetchTalepler()
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Talep gönderilemedi!', 'error')
    } finally {
      setLoading(false)
    }
  }

  const getDurumBadge = (durum: string) => {
    if (durum === 'cozuldu') {
      return <Badge variant="success">Çözüldü</Badge>
    }
    if (durum === 'inceleniyor') {
      return <Badge variant="secondary">İnceleniyor</Badge>
    }
    if (durum === 'reddedildi') {
      return <Badge variant="destructive">Çözülemedi</Badge>
    }
    return <Badge variant="secondary">Beklemede</Badge>
  }

  const getTipIcon = (tip: TalepTipi | string) => {
    if (tip === 'sikayet') {
      return <AlertCircle className="h-4 w-4 text-red-500" />
    }
    if (tip === 'oneri') {
      return <Lightbulb className="h-4 w-4 text-[var(--brand-gold)]" />
    }
    return <MessageSquare className="h-4 w-4 text-[var(--brand-olive)]" />
  }

  const getTipLabel = (tip: TalepTipi | string) => {
    if (tip === 'sikayet') return 'Şikayet'
    if (tip === 'oneri') return 'Öneri'
    return 'İstek'
  }

  return (
    <div className="min-h-screen bg-[var(--brand-cream)] text-[var(--brand-ink)]">
      <YurtHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="space-y-8">
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/90 shadow-sm">
            <div className="border-b border-black/5 bg-[var(--brand-cream)]/60 px-6 py-4">
              <h1 className="font-['Playfair_Display'] text-2xl font-semibold text-[var(--brand-ink)]">Talepte Bulun</h1>
              <p className="mt-1 text-sm text-[var(--brand-ink)]/60">Şikayet, istek veya önerinizi yönetime iletin.</p>
            </div>

            <form className="space-y-5 p-6" onSubmit={handleTalepSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--brand-ink)]/80">Talep Tipi</label>
                <Select
                  value={talepForm.tip}
                  onValueChange={(value: TalepTipi) => setTalepForm({ ...talepForm, tip: value })}
                >
                  <SelectTrigger className="h-11 rounded-xl border border-black/10 bg-white/90">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="istek">İstek</SelectItem>
                    <SelectItem value="sikayet">Şikayet</SelectItem>
                    <SelectItem value="oneri">Öneri</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--brand-ink)]/80">Konu</label>
                <Input
                  type="text"
                  placeholder="Kısa başlık yazın"
                  className="h-11 rounded-xl border border-black/10 bg-white/90"
                  value={talepForm.konu}
                  onChange={(e) => setTalepForm({ ...talepForm, konu: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--brand-ink)]/80">Mesaj</label>
                <Textarea
                  placeholder="Detayları yazın..."
                  className="min-h-[140px] rounded-xl border border-black/10 bg-white/90"
                  value={talepForm.mesaj}
                  onChange={(e) => setTalepForm({ ...talepForm, mesaj: e.target.value })}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-full bg-[var(--brand-olive)] text-[var(--brand-cream)] hover:bg-[#2f3a2c]"
              >
                {loading ? 'Gönderiliyor...' : 'Talebi Gönder'}
              </Button>
            </form>
          </div>

          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/90 shadow-sm">
            <div className="border-b border-black/5 bg-[var(--brand-cream)]/60 px-6 py-4">
              <h2 className="font-['Playfair_Display'] text-xl font-semibold text-[var(--brand-ink)]">Taleplerim</h2>
            </div>
            <div className="space-y-4 p-6">
              {talepler.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-black/10 bg-[var(--brand-cream)]/40 p-8 text-center text-sm text-[var(--brand-ink)]/60">
                  Henüz talebiniz bulunmuyor.
                </div>
              ) : (
                talepler.map((talep) => (
                  <div key={talep.id} className="rounded-2xl border border-black/10 bg-[var(--brand-cream)]/40 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {getTipIcon(talep.tip)}
                        <div>
                          <p className="font-semibold text-[var(--brand-ink)]">{talep.konu}</p>
                          <p className="text-xs text-[var(--brand-ink)]/60">
                            {getTipLabel(talep.tip)}
                            {talep.created_at ? ` • ${formatDate(talep.created_at)}` : ''}
                          </p>
                        </div>
                      </div>
                      {getDurumBadge(talep.durum)}
                    </div>
                    <p className="mt-3 text-sm text-[var(--brand-ink)]/75">{talep.mesaj}</p>
                    {talep.admin_notu && (
                      <div className="mt-3 rounded-xl border border-black/10 bg-white p-3 text-sm">
                        <span className="font-medium text-[var(--brand-ink)]">Yönetim Yanıtı:</span>
                        <p className="mt-1 text-[var(--brand-ink)]/70">{talep.admin_notu}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="ghost" className="text-[var(--brand-ink)]/60 hover:text-[var(--brand-ink)]" asChild>
              <Link to="/ogrenci">Ana Sayfaya Dön</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
