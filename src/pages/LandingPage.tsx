import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import MarketingHeader from '@/components/MarketingHeader'
import {
  ArrowRight,
  BedDouble,
  BookOpen,
  Bus,
  Coffee,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Shield,
  Sparkles,
  Twitter,
  UtensilsCrossed,
  Volume2,
  VolumeX,
  WashingMachine,
  Wifi,
  Youtube,
} from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()
  const [aboutCardMuted, setAboutCardMuted] = useState(true)

  const services = [
    { label: '7/24 güvenlik ve resepsiyon', icon: ShieldCheck },
    { label: 'Sınırsız yüksek hızlı internet', icon: Wifi },
    { label: 'Açık büfe sabah kahvaltısı', icon: Coffee },
    { label: 'Günlük sıcak akşam yemeği', icon: UtensilsCrossed },
    { label: 'Haftalık oda temizliği', icon: Sparkles },
    { label: 'Çamaşır ve ütü odası', icon: WashingMachine },
    { label: 'Etüt salonları ve dinlenme alanları', icon: BookOpen },
    { label: 'Merkezi ulaşım ve servis imkanı', icon: Bus },
  ]

  const roomCards = [
    {
      title: 'Tek Kişilik Oda',
      desc: 'Sessiz, ferah ve kişisel alana önem veren öğrenciler için özel tasarım.',
      image: '/ankayurtlari/rooms/single-1.jpg',
    },
    {
      title: 'İki Kişilik Oda',
      desc: 'Sosyal yaşamı seven öğrenciler için dengeli ve düzenli oda planı.',
      image: '/ankayurtlari/rooms/double-1.jpg',
    },
    {
      title: 'Paylaşımlı Oda',
      desc: 'Bütçe dostu seçenekler, geniş kullanım alanı ve tam donanım.',
      image: '/ankayurtlari/rooms/double-2.jpg',
    },
  ]

  const galleryImages = [
    '/ankayurtlari/sections/services.jpg',
    '/ankayurtlari/rooms/single-2.jpg',
    '/ankayurtlari/rooms/double-1.jpg',
    '/ankayurtlari/rooms/double-2.jpg',
  ]

  const heroImages = useMemo(
    () => [
      '/ankayurtlari/sections/experience.jpg',
      '/ankayurtlari/sections/services.jpg',
      '/ankayurtlari/rooms/double-1.jpg',
      '/ankayurtlari/rooms/single-1.jpg',
    ],
    [],
  )
  const [heroIndex, setHeroIndex] = useState(0)

  const dorms = [
    {
      name: 'Beyzade Erkek Öğrenci Yurdu',
      type: 'Erkek Öğrenci Yurdu',
      image: '/ankayurtlari/sections/beyzade.png',
    },
    {
      name: 'Beyra Kız Öğrenci Yurdu',
      type: 'Kız Öğrenci Yurdu',
      image: '/ankayurtlari/rooms/single-1.jpg',
    },
    {
      name: 'Beyza Kız Yurdu',
      type: 'Kız Öğrenci Yurdu',
      image: '/ankayurtlari/rooms/double-1.jpg',
    },
    {
      name: 'Ankayurt',
      type: 'Yeni Yurt (Görseller Yakında)',
      image: null,
    },
  ]

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [heroImages.length])

  return (
    <div className="min-h-screen bg-[var(--brand-cream)] text-[var(--brand-ink)] font-['Source_Sans_3']">
      <MarketingHeader
        links={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Hakkımızda', href: '/hakkimizda' },
          { label: 'Yurtlarımız', href: '#yurtlarimiz' },
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

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 lg:flex-row lg:items-end">
          <div className="max-w-2xl text-[var(--brand-ink)]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--brand-gold)]/60 px-4 py-1 text-xs uppercase tracking-[0.3em] text-[#8f6a35]">
              Ankara Erkek Öğrenci Yurdu
            </p>
            <h1 className="mb-6 font-['Playfair_Display'] text-4xl font-semibold leading-tight sm:text-5xl">
              Otel Konforunda,
              <br />
              Disiplinli ve Güvenli Yurt Yaşamı
            </h1>
            <p className="mb-8 text-lg text-[var(--brand-olive)] opacity-90">
              Beyzade Erkek Öğrenci Yurdu, şehir merkezine yakın konumu, güçlü güvenlik
              altyapısı ve sıcak sosyal alanlarıyla öğrencilerin akademik hayatına konfor katar.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="rounded-full bg-[var(--brand-gold)] px-7 text-[var(--brand-ink)] hover:bg-[#b69052]"
              >
                Hemen Başvur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border-[var(--brand-ink)]/30 bg-transparent text-[var(--brand-ink)] hover:bg-[var(--brand-ink)] hover:text-[var(--brand-cream)]"
              >
                İletişime Geç
              </Button>
            </div>
          </div>

          <div className="grid w-full max-w-md grid-cols-2 gap-4 text-[var(--brand-ink)]">
            {[
              { label: 'Yıllık Tecrübe', value: '7+' },
              { label: 'Toplam Kapasite', value: '750+' },
              { label: 'Etüt Salonu', value: '3' },
              { label: 'Üniversiteye Ulaşım', value: '9' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur">
                <div className="text-2xl font-semibold">{item.value}</div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--brand-olive)]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative -mt-8">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 pt-10 lg:grid-cols-3">
          {[
            {
              title: 'Güvenli Kampüs Düzeni',
              desc: 'Kartlı giriş sistemi, 7/24 kamera ve profesyonel güvenlik ekibi.',
              icon: Shield,
            },
            {
              title: 'Günlük Yaşam Konforu',
              desc: 'Yemek, temizlik ve sosyal alan hizmetleriyle tek noktadan çözüm.',
              icon: Sparkles,
            },
            {
              title: 'Merkeze Yakın Konum',
              desc: 'Üniversite ve ulaşım hatlarına birkaç dakika uzaklıkta.',
              icon: MapPin,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-sand)] text-[var(--brand-olive)]">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-['Playfair_Display'] text-xl font-semibold">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--brand-ink)]/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="yurtlarimiz" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-olive)]">Yurtlarımız</p>
            <h2 className="font-['Playfair_Display'] text-3xl font-semibold text-[var(--brand-ink)]">
              Ankara’daki Yurtlarımız
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {dorms.map((dorm) => (
              <div
                key={dorm.name}
                className="overflow-hidden rounded-3xl border border-black/10 bg-[var(--brand-cream)]"
              >
                {dorm.image ? (
                  <img
                    src={dorm.image}
                    alt={dorm.name}
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-44 items-center justify-center bg-[var(--brand-sand)] text-sm font-semibold text-[var(--brand-olive)]">
                    Görseller Yakında
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[var(--brand-ink)]">
                    {dorm.name}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--brand-olive)]">
                    {dorm.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="odalar" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-olive)]">
                Odalarımız
              </p>
              <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold text-[var(--brand-ink)]">
                Konforlu ve Modern Oda Seçenekleri
              </h2>
            </div>
            <p className="max-w-xl text-sm text-[var(--brand-ink)]/70">
              Tek kişilikten paylaşımlı odalara kadar tüm alanlarımız ergonomik mobilyalar,
              geniş çalışma masaları ve ferah yaşam alanlarıyla donatıldı.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {roomCards.map((room) => (
              <button
                key={room.title}
                onClick={() => navigate('/odalar')}
                className="overflow-hidden rounded-3xl border border-black/10 bg-[var(--brand-cream)] text-left transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img src={room.image} alt={room.title} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-[var(--brand-olive)]">
                    <BedDouble className="h-5 w-5" />
                    <span className="text-xs uppercase tracking-[0.3em]">Beyzade</span>
                  </div>
                  <h3 className="mb-2 font-['Playfair_Display'] text-xl font-semibold">{room.title}</h3>
                  <p className="text-sm text-[var(--brand-ink)]/70">{room.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="hizmetler" className="bg-[var(--brand-sand)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-olive)]">Hizmetlerimiz</p>
            <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold">
              Günlük Yaşamı Kolaylaştıran Hizmetler
            </h2>
            <p className="mt-4 text-sm text-[var(--brand-ink)]/70">
              Tüm ihtiyaçlarınızı tek bir çatı altında buluşturuyor, akademik başarınızı destekleyen
              sakin ve düzenli bir yaşam alanı sunuyoruz.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-[var(--brand-ink)]/80">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-[var(--brand-olive)]" />
                Fiber internet
              </div>
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 text-[var(--brand-olive)]" />
                Yemekhane
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

          <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            <h3 className="mb-6 font-['Playfair_Display'] text-2xl font-semibold">Hizmet Listesi</h3>
            <div className="grid gap-4 text-sm text-[var(--brand-ink)]/80">
              {services.map((service) => (
                <div key={service.label} className="flex items-center gap-3">
                  <service.icon className="h-5 w-5 text-[var(--brand-olive)]" />
                  <span>{service.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-3xl">
            <video
              src="/ankayurtlari/videos/about-card.mp4"
              className="h-full w-full object-cover"
              autoPlay
              muted={aboutCardMuted}
              loop
              playsInline
              preload="metadata"
            />
            <button
              type="button"
              onClick={() => setAboutCardMuted((prev) => !prev)}
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/70"
              aria-label={aboutCardMuted ? 'Sesi aç' : 'Sesi kapat'}
              title={aboutCardMuted ? 'Sesi aç' : 'Sesi kapat'}
            >
              {aboutCardMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-ink)]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 max-w-sm text-[var(--brand-cream)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-gold)]">
                Hakkımızda
              </p>
              <h3 className="mt-2 font-['Playfair_Display'] text-2xl font-semibold">
                Disiplinli yönetim, sıcak yaşam kültürü
              </h3>
              <p className="mt-3 text-sm text-[var(--brand-sand)]">
                Beyzade Yurtları, öğrencilerin akademik ve sosyal hayatını destekleyen
                kurumsal yönetim anlayışıyla hizmet verir.
              </p>
              <Button
                onClick={() => navigate('/hakkimizda')}
                className="mt-4 rounded-full bg-[var(--brand-gold)] text-[var(--brand-ink)] hover:bg-[#b69052]"
              >
                Hakkımızda Daha Fazla
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-[var(--brand-cream)] p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-olive)]">
              Sosyal Alanlar
            </p>
            <h3 className="mt-3 font-['Playfair_Display'] text-2xl font-semibold">Günlük yaşamın her anı için</h3>
            <p className="mt-4 text-sm text-[var(--brand-ink)]/70">
              Dinlenme salonları, etüt alanları ve modern mutfak düzeni ile kendinizi evinizde hissedersiniz.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {galleryImages.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt="Beyzade Yurtları"
                  className="h-28 w-full rounded-2xl object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-ink)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 lg:flex-row lg:items-center">
          <div className="text-[var(--brand-cream)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-gold)]">Hemen Arayın</p>
            <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold">
              Kayıt dönemi için avantajlı fırsatları kaçırmayın
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+905010014043"
              className="rounded-full bg-[var(--brand-gold)] px-6 py-3 text-sm font-semibold text-[var(--brand-ink)]"
            >
              0501 001 4043
            </a>
            <a
              href="#iletisim"
              className="rounded-full border border-[var(--brand-cream)]/40 px-6 py-3 text-sm font-semibold text-[var(--brand-cream)]"
            >
              WhatsApp ile Yazın
            </a>
          </div>
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
