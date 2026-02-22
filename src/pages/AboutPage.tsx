import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import MarketingHeader from '@/components/MarketingHeader'
import {
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Shield,
  Twitter,
  UtensilsCrossed,
  Wifi,
  Youtube,
} from 'lucide-react'

export default function AboutPage() {
  const heroImages = useMemo(
    () => [
      '/ankayurtlari/sections/experience.jpg',
      '/ankayurtlari/sections/services.jpg',
      '/ankayurtlari/sections/beyzade.png',
      '/ankayurtlari/rooms/single-1.jpg',
      '/ankayurtlari/rooms/double-1.jpg',
    ],
    [],
  )
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [heroImages.length])

  const values = [
    {
      title: 'Güven ve Düzen',
      desc: '24 saat güvenlik ve disiplinli yönetim anlayışı ile huzurlu yaşam alanı.',
    },
    {
      title: 'Akademik Destek',
      desc: 'Etüt salonları, sessiz alanlar ve sürdürülebilir çalışma ritmi.',
    },
    {
      title: 'Sıcak Topluluk',
      desc: 'Sosyal alanlar ve etkinliklerle öğrenciler arasında güçlü bağlar.',
    },
  ]

  const highlights = [
    'Erkek öğrencilere özel güvenli kampüs',
    'Günlük açık büfe yemek hizmeti',
    'Merkezi lokasyonda hızlı ulaşım',
    'Bakımlı, modern ve hijyenik odalar',
    'Deneyimli yönetim ve danışmanlık ekibi',
    'Kesintisiz internet ve teknik destek',
  ]

  return (
    <div className="min-h-screen bg-[var(--brand-cream)] text-[var(--brand-ink)] font-['Source_Sans_3']">
      <MarketingHeader
        links={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Hakkımızda', href: '/hakkimizda' },
          { label: 'Odalar', href: '/odalar' }, 
          { label: 'İletişim', href: '#iletisim' },
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt="Beyzade Yurtları"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                index === heroIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-cream)]/90 via-[var(--brand-cream)]/70 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--brand-gold)]">Hakkımızda</p>
          <h1 className="mt-4 max-w-2xl font-['Playfair_Display'] text-4xl font-semibold text-[var(--brand-ink)] sm:text-5xl">
            Öğrencilerin akademik ve sosyal yolculuğuna eşlik ediyoruz
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--brand-olive)] opacity-90">
            Beyzade Erkek Öğrenci Yurdu, modern yaşam olanakları ve güvenli kampüs
            düzeniyle Ankara’da erkek öğrenciler için ayrıcalıklı bir konaklama sunar.
          </p>
        </div>
      </section>

      <section id="hikaye" className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-olive)]">Biz Kimiz</p>
            <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold">
              Beyzade Yurtları ile disiplinli ve huzurlu yaşam
            </h2>
            <p className="mt-4 text-sm text-[var(--brand-ink)]/70">
              6 yılı aşkın tecrübemizle öğrencilerin akademik başarısına odaklanan, düzenli
              yaşam alanları tasarlıyoruz. Merkezi konumumuz sayesinde üniversitelere hızlı
              ulaşım sağlarken, güvenli kampüs düzenimiz ile ailelerin içini rahatlatıyoruz.
            </p>
            <div className="mt-8 grid gap-4">
              {values.map((value) => (
                <div key={value.title} className="rounded-2xl border border-black/10 bg-[var(--brand-cream)] p-4">
                  <h3 className="font-['Playfair_Display'] text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-[var(--brand-ink)]/70">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="/ankayurtlari/sections/services.jpg"
              alt="Beyzade Yurtları"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-ink)]/85 via-[var(--brand-ink)]/35 to-transparent" />
            <div className="absolute bottom-6 left-6 text-[var(--brand-cream)] [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-gold)]">Vizyon</p>
              <h3 className="mt-2 font-['Playfair_Display'] text-2xl font-semibold">
                Öğrencilere ev sıcaklığında yurt deneyimi
              </h3>
              <p className="mt-3 text-sm text-[var(--brand-cream)]/95">
                Disiplinli yönetim, güçlü iletişim ve kaliteli hizmetle kalıcı memnuniyet hedefliyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="misyon-vizyon" className="bg-[var(--brand-cream)]">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-olive)]">Misyon ve Vizyon</p>
          <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold">
            Misyonumuz ve Vizyonumuz
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white p-8">
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold">Misyonumuz</h3>
              <p className="mt-4 text-sm text-[var(--brand-ink)]/70">
                Özel Beyzade Erkek Yurdu olarak, öğrencilerimizin güvenli, konforlu ve huzurlu bir
                ortamda yaşamalarını sağlamak için çalışıyoruz. Aile sıcaklığını hissettiren, modern
                imkanlarla donatılmış yurtlarımızda, her bireyin kendini evinde hissetmesini
                hedefliyoruz. Eğitim hayatının önemli bir parçası olan barınma ihtiyacını, deneyimli
                ve güler yüzlü kadromuzla, öğrencilerimizin ihtiyaçlarına uygun şekilde karşılıyoruz.
                Ankara’nın merkezi konumunda, üniversitelere yakın bir lokasyonda sunduğumuz
                hizmetlerle öğrencilerimizin hayatını kolaylaştırmayı ve onların geleceğine değer
                katmayı amaçlıyoruz.
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-8">
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold">Vizyonumuz</h3>
              <p className="mt-4 text-sm text-[var(--brand-ink)]/70">
                Öğrencilerimizin akademik, sosyal ve kişisel gelişimlerini destekleyen, güvenli,
                konforlu ve modern bir yaşam alanı sunarak üniversite yıllarını en verimli şekilde
                geçirmelerini sağlamak; yenilikçi, sürdürülebilir ve öğrenci odaklı hizmet anlayışımızla
                Türkiye’nin en prestijli özel yurtları arasında yer almayı hedeflemekteyiz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-sand)]">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { label: 'Yıllık Tecrübe', value: '6+' },
              { label: 'Toplam Kapasite', value: '350+' },
              { label: 'Üniversite', value: '9' },
              { label: 'Danışmanlık', value: '7/24' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-2xl font-semibold text-[var(--brand-ink)]">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--brand-olive)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hizmetler" className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-olive)]">Hizmetlerimiz</p>
            <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold">
              Günlük yaşamınız için eksiksiz hizmet paketi
            </h2>
            <p className="mt-4 text-sm text-[var(--brand-ink)]/70">
              Beyzade Yurtları, öğrencilerin ihtiyaç duyduğu tüm hizmetleri tek noktada sunarak
              akademik hayata odaklanmayı kolaylaştırır.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-[var(--brand-ink)]/80">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-[var(--brand-olive)]" />
                Fiber internet
              </div>
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 text-[var(--brand-olive)]" />
                Açık büfe yemek
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--brand-olive)]" />
                7/24 resepsiyon
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[var(--brand-olive)]" />
                Güvenlik sistemi
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-[var(--brand-cream)] p-8">
            <h3 className="mb-6 font-['Playfair_Display'] text-2xl font-semibold">Öne Çıkanlar</h3>
            <div className="grid gap-4 text-sm text-[var(--brand-ink)]/80">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[var(--brand-olive)]" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-ink)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 lg:flex-row lg:items-center">
          <div className="text-[var(--brand-cream)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-gold)]">Danışma Hattı</p>
            <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold">
              Kayıt süreci hakkında hemen bilgi alın
            </h2>
          </div>
          <Button asChild className="rounded-full bg-[var(--brand-gold)] px-7 text-[var(--brand-ink)] hover:bg-[#b69052]">
            <a href="tel:+905010014043">0501 001 4043</a>
          </Button>
        </div>
      </section>

      <section id="iletisim" className="bg-[var(--brand-cream)]">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-olive)]">İletişim</p>
              <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold">Bize Ulaşın</h2>
            </div>
            <p className="max-w-xl text-sm text-[var(--brand-ink)]/70">
              Yeni Bağlıca Mahallesi Türkeli Caddesi no:9 Etimesgut / Ankara adresinde sizleri bekliyoruz.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-6 md:grid-cols-3">
            <a
              href="tel:+905010014043"
              className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white/80 p-4 text-left transition hover:-translate-y-1 hover:border-[var(--brand-olive)]/40 hover:bg-white hover:shadow-md"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-sand)] text-[var(--brand-olive)]">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--brand-olive)]">Telefon</div>
                <div className="mt-1 text-sm font-semibold text-[var(--brand-ink)]">0501 001 4043</div>
              </div>
            </a>
            <a
              href="mailto:beyzadeerkekyurdu@gmail.com"
              className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white/80 p-4 text-left transition hover:-translate-y-1 hover:border-[var(--brand-olive)]/40 hover:bg-white hover:shadow-md"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-sand)] text-[var(--brand-olive)]">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--brand-olive)]">E-posta</div>
                <div className="mt-1 text-sm font-semibold text-[var(--brand-ink)] break-all">
                  beyzadeerkekyurdu@gmail.com
                </div>
              </div>
            </a>
            <div className="rounded-3xl border border-black/10 bg-white p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--brand-ink)]">
                <MapPin className="h-5 w-5 text-[var(--brand-olive)]" />
                Harita
              </div>
              <iframe
                title="Beyzade Yurtları Harita"
                src="https://www.google.com/maps?q=Yeni%20Ba%C4%9Fl%C4%B1ca%20Mahallesi%20T%C3%BCrkeli%20Caddesi%20No:9%20Etimesgut%20Ankara&output=embed"
                className="h-52 w-full rounded-2xl border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#141210] text-[var(--brand-sand)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-sm md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/ankayurtlari/logo.png"
              alt="Beyzade Erkek Öğrenci Yurdu"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="font-semibold">Beyzade Erkek Öğrenci Yurdu</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61574284194649"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1877F2]/40 text-[#1877F2] transition hover:bg-[#1877F2]/15"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/baglicaogrenci"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1DA1F2]/40 text-[#1DA1F2] transition hover:bg-[#1DA1F2]/15"
              aria-label="X"
              target="_blank"
              rel="noreferrer"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@ANKAYURTLARI"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#FF0000]/40 text-[#FF0000] transition hover:bg-[#FF0000]/15"
              aria-label="YouTube"
              target="_blank"
              rel="noreferrer"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/beyzadeerkekyurdu?igsh=MWMxZmRyaTQ2cndlcA%3D%3D&utm_source=qr"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4405F]/40 text-[#E4405F] transition hover:bg-[#E4405F]/15"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
          <div className="text-xs">© 2026 Beyzade Yurtları. Tüm hakları saklıdır.</div>
        </div>
      </footer>
    </div>
  )
}
