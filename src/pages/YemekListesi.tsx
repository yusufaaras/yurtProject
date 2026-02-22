import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Moon, Sun, Utensils } from "lucide-react"

import YurtHeader from "@/components/YurtHeader"
import { Button } from "@/components/ui/button"
import { useToast } from "@/contexts/ToastContext"
import api from "@/services/api"

interface YemekDosyasi {
  id: number
  ogun: "kahvalti" | "aksam"
  dosya_adi: string
  dosya_tipi: string
  baslangic_tarihi: string
  bitis_tarihi: string
  created_at: string
}

export default function YemekListesi() {
  const { showToast } = useToast()
  const [kahvaltiDosyalari, setKahvaltiDosyalari] = useState<YemekDosyasi[]>([])
  const [aksamDosyalari, setAksamDosyalari] = useState<YemekDosyasi[]>([])
  const [loading, setLoading] = useState(true)

  const openDosya = (id: number) => {
    try {
      const token = localStorage.getItem("token") || ""
      window.open(
        `${api.defaults.baseURL}/yemek/dosya/indir/${id}?token=${encodeURIComponent(token)}`,
        "_blank",
        "noopener,noreferrer"
      )
    } catch (error) {
      showToast("Dosya açılamadı", "error")
    }
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" })

  useEffect(() => {
    const fetchDosyalar = async () => {
      setLoading(true)
      try {
        const [kahvaltiRes, aksamRes] = await Promise.all([
          api.get("/yemek/dosya/liste?ogun=kahvalti"),
          api.get("/yemek/dosya/liste?ogun=aksam"),
        ])

        setKahvaltiDosyalari(kahvaltiRes.data.dosyalar || [])
        setAksamDosyalari(aksamRes.data.dosyalar || [])
      } catch (error) {
        showToast("Yemek dosyaları yüklenemedi", "error")
      } finally {
        setLoading(false)
      }
    }

    void fetchDosyalar()
  }, [showToast])

  return (
    <div className="min-h-screen bg-[var(--brand-cream)] text-[var(--brand-ink)]">
      <YurtHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-black/10 bg-white/90 p-8 shadow-sm">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-sand)] text-[var(--brand-olive)]">
              <Utensils className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-semibold text-[var(--brand-ink)]">Yemek Listeleri</h1>
            <p className="text-sm text-[var(--brand-ink)]/60">
              Kahvaltı ve akşam yemeği listelerini görüntüleyin.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white/90 px-6 py-5 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-sand)] text-[var(--brand-gold)]">
                  <Sun className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-semibold text-[var(--brand-ink)]">Sabah Kahvaltı Listesi</p>
                  <p className="mt-1 text-sm text-[var(--brand-ink)]/60">Tarih aralığı seçip açın.</p>
                </div>
              </div>

              <div className="space-y-2">
                {loading ? (
                  <p className="text-sm text-[var(--brand-ink)]/60">Yükleniyor...</p>
                ) : kahvaltiDosyalari.length === 0 ? (
                  <p className="text-sm text-[var(--brand-ink)]/60">Henüz kahvaltı dosyası yüklenmemiş.</p>
                ) : (
                  kahvaltiDosyalari.map((dosya) => (
                    <Button
                      key={dosya.id}
                      variant="outline"
                      className="w-full justify-start rounded-xl border border-black/10 bg-[var(--brand-cream)]/60 text-left"
                      onClick={() => openDosya(dosya.id)}
                    >
                      {formatDate(dosya.baslangic_tarihi)} - {formatDate(dosya.bitis_tarihi)} arası kahvaltı listesi
                    </Button>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/90 px-6 py-5 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-sand)] text-[var(--brand-olive)]">
                  <Moon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-semibold text-[var(--brand-ink)]">Akşam Yemeği Listesi</p>
                  <p className="mt-1 text-sm text-[var(--brand-ink)]/60">Tarih aralığı seçip açın.</p>
                </div>
              </div>

              <div className="space-y-2">
                {loading ? (
                  <p className="text-sm text-[var(--brand-ink)]/60">Yükleniyor...</p>
                ) : aksamDosyalari.length === 0 ? (
                  <p className="text-sm text-[var(--brand-ink)]/60">Henüz akşam dosyası yüklenmemiş.</p>
                ) : (
                  aksamDosyalari.map((dosya) => (
                    <Button
                      key={dosya.id}
                      variant="outline"
                      className="w-full justify-start rounded-xl border border-black/10 bg-[var(--brand-cream)]/60 text-left"
                      onClick={() => openDosya(dosya.id)}
                    >
                      {formatDate(dosya.baslangic_tarihi)} - {formatDate(dosya.bitis_tarihi)} arası akşam listesi
                    </Button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="ghost" className="text-[var(--brand-ink)]/60 hover:text-[var(--brand-ink)]" asChild>
              <Link to="/ogrenci">Ana Sayfaya Dön</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
