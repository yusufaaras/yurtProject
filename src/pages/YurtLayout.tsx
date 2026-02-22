import { Link } from "react-router-dom"
import { AlarmClock, Building2, CalendarDays, ClipboardCheck, MessageSquare, Salad, Users } from "lucide-react"

import YurtHeader from "@/components/YurtHeader"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function YurtLayout() {
  return (
    <div className="min-h-screen bg-[var(--brand-cream)] text-[var(--brand-ink)]">
      <YurtHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="space-y-10">
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/90 shadow-sm">
            <div className="absolute inset-0">
              <img
                src="/ankayurtlari/sections/experience.jpg"
                alt="Yurt Yönetim Sistemi"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-ink)]/85 via-[var(--brand-ink)]/60 to-transparent" />
            </div>
            <div className="relative px-6 py-12 text-left sm:px-10">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--brand-gold)]">Yurt Yönetim Sistemi</p>
              <h1 className="mt-4 font-['Playfair_Display'] text-3xl font-semibold text-[var(--brand-cream)] sm:text-4xl">
                Yurt Yönetim Sistemine Hoş Geldiniz
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-[var(--brand-sand)]">
                Yurt operasyonlarınızı düzenli, sakin ve güvenilir bir arayüzle yönetin.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Toplam Öğrencilerimiz",
                value: "15",
                subtitle: "Aktif kayıtlı öğrenci",
                accent: "from-[var(--brand-gold)]/60 to-[var(--brand-gold)]",
                icon: Users,
              },
              {
                title: "Yurtlarımız",
                value: "25",
                subtitle: "Toplam kapasite",
                accent: "from-[var(--brand-olive)]/40 to-[var(--brand-olive)]",
                icon: Building2,
              },
              {
                title: "Servis İmkanımız",
                value: "10",
                subtitle: "Sefer Saatleri & Güzergah",
                accent: "from-[var(--brand-sand)] to-[var(--brand-gold)]/60",
                icon: AlarmClock,
                clickable: true,
              },
              {
                title: "Sabah ve Akşam Servisi",
                value: "Yemek Servisi",
                subtitle: "Kahvaltı & Akşam Yemeği",
                accent: "from-[var(--brand-gold)]/60 to-[var(--brand-olive)]/60",
                icon: Salad,
              },
            ].map((card) => {
              const content = (
                <>
                  <div className={`h-1 w-full rounded-t-2xl bg-gradient-to-r ${card.accent}`} />
                  <div className="flex flex-col items-center gap-3 p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-sand)] text-[var(--brand-olive)]">
                      <card.icon className="h-5 w-5" />
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--brand-ink)]/60">
                      {card.title}
                    </div>
                    <div className="text-3xl font-semibold text-[var(--brand-ink)]">{card.value}</div>
                    <div className="text-xs text-[var(--brand-ink)]/60">{card.subtitle}</div>
                  </div>
                </>
              )

              if (card.clickable) {
                return (
                  <Dialog key={card.title}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="w-full rounded-2xl border border-black/10 bg-white/90 text-left shadow-md shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        {content}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="font-['Playfair_Display'] text-xl">Servis Saatleri ve Güzergahlar</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 text-sm text-[var(--brand-ink)]/70">
                        <div className="rounded-xl border border-black/10 bg-[var(--brand-cream)] p-4">
                          <div className="font-semibold text-[var(--brand-ink)]">Sabah Servisi</div>
                          <div className="mt-2">07:00 - 07:30 - 08:00</div>
                          <div className="mt-1 text-xs text-[var(--brand-ink)]/60">Merkez → Kampüs → Kız Yurdu</div>
                        </div>
                        <div className="rounded-xl border border-black/10 bg-[var(--brand-cream)] p-4">
                          <div className="font-semibold text-[var(--brand-ink)]">Akşam Servisi</div>
                          <div className="mt-2">18:00 - 18:30 - 19:00</div>
                          <div className="mt-1 text-xs text-[var(--brand-ink)]/60">Kampüs → Merkez → Erkek Yurdu</div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )
              }

              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-black/10 bg-white/90 shadow-md shadow-black/5"
                >
                  {content}
                </div>
              )
            })}
          </div>

          <div className="rounded-2xl border border-black/10 bg-[var(--brand-sand)]/70 p-6">
            <h2 className="text-lg font-semibold text-[var(--brand-ink)]">Hızlı Aksiyonlar</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Yurttan İzin Al",
                  description: "İzin formunu hızlıca doldur ve gönder",
                  icon: ClipboardCheck,
                  href: "/ogrenci/izin",
                },
                {
                  title: "Talepte Bulun",
                  description: "Şikayet, istek veya öneri gönder",
                  icon: MessageSquare,
                  href: "/ogrenci/talep",
                },
                {
                  title: "Yemek Listesini Görüntüle",
                  description: "Haftalık yemek listesini incele",
                  icon: Salad,
                  href: "/ogrenci/yemek",
                },
                {
                  title: "Geç Giriş Bildir",
                  description: "Geç giriş bilgini yönetime ilet",
                  icon: AlarmClock,
                  href: "/ogrenci/izin",
                },
              ].map((action) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto w-full items-start gap-4 rounded-xl border border-black/10 bg-white/90 px-5 py-4 text-left shadow-sm hover:bg-[var(--brand-sand)]/60"
                  asChild
                >
                  <Link to={action.href}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand-sand)] text-[var(--brand-olive)]">
                      <action.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--brand-ink)]">{action.title}</p>
                      <p className="mt-1 text-xs text-[var(--brand-ink)]/60">{action.description}</p>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/90 shadow-md shadow-black/5">
            <div className="bg-[var(--brand-olive)]/10 px-6 py-4">
              <h2 className="text-lg font-semibold text-[var(--brand-ink)]">İstatistik Paneli</h2>
            </div>
            <div className="grid gap-4 p-6 md:grid-cols-3">
              <div className="rounded-2xl border border-black/10 bg-[var(--brand-cream)] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand-sand)] text-[var(--brand-olive)]">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--brand-ink)]/60">Kullanılan İzin Günü</p>
                    <p className="text-lg font-semibold text-[var(--brand-ink)]">8 gün</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-[var(--brand-ink)]/60">Bu dönem kullanılan izin</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[var(--brand-cream)] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand-sand)] text-[var(--brand-olive)]">
                    <AlarmClock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--brand-ink)]/60">Geç Giriş Sayısı</p>
                    <p className="text-lg font-semibold text-[var(--brand-ink)]">3</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-[var(--brand-ink)]/60">Bildirim adedi</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[var(--brand-cream)] p-5">
                <p className="text-xs text-[var(--brand-ink)]/60">Kalan İzin Hakkı</p>
                <p className="mt-2 text-lg font-semibold text-[var(--brand-ink)]">22 / 30 gün</p>
                <div className="mt-4">
                  <Progress
                    value={73}
                    className="bg-[var(--brand-sand)] [&_[data-slot=progress-indicator]]:bg-[var(--brand-olive)]"
                  />
                  <p className="mt-2 text-xs text-[var(--brand-ink)]/60">Toplam hakkınızdan kalan</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
