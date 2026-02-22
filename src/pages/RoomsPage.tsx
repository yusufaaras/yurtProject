import { useEffect, useMemo, useState } from 'react'
import MarketingHeader from '@/components/MarketingHeader'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, BedDouble, Facebook, Instagram, Twitter, X, Youtube } from 'lucide-react'

type Room = {
  title: string
  desc: string
  images: string[]
}

const singleRoomImages: string[] = [
  '/ankayurtlari/rooms/single/y1.jpg',
  '/ankayurtlari/rooms/single/y2.jpg',
  '/ankayurtlari/rooms/single/y3.jpg',
  '/ankayurtlari/rooms/single/y4.jpg',
  '/ankayurtlari/rooms/single/y5.jpg',
  '/ankayurtlari/rooms/single/y6.jpg',
  '/ankayurtlari/rooms/single/y7.jpg',
  '/ankayurtlari/rooms/single/y8.jpg',
  '/ankayurtlari/rooms/single/y9.jpg',
  '/ankayurtlari/rooms/single/y10.jpg',
  '/ankayurtlari/rooms/single/y11.jpg',
  '/ankayurtlari/rooms/single/y12.jpg',
  '/ankayurtlari/rooms/single/y13.jpg',
  '/ankayurtlari/rooms/single/y15.jpg',
  '/ankayurtlari/rooms/single/y16.jpg',
  '/ankayurtlari/rooms/single/y17.jpg',
]

const doubleRoomImages: string[] = [
  '/ankayurtlari/rooms/double/yr1.jpg',
  '/ankayurtlari/rooms/double/yr2.jpg',
  '/ankayurtlari/rooms/double/yr3.jpg',
  '/ankayurtlari/rooms/double/yr4.jpg',
  '/ankayurtlari/rooms/double/yr5.jpg',
  '/ankayurtlari/rooms/double/yr6.jpg',
  '/ankayurtlari/rooms/double/yr7.jpg',
  '/ankayurtlari/rooms/double/yr8.jpg',
  '/ankayurtlari/rooms/double/yr9.jpg',
  '/ankayurtlari/rooms/double/yr10.jpg',
  '/ankayurtlari/rooms/double/yr11.jpg',
  '/ankayurtlari/rooms/double/yr12.jpg',
  '/ankayurtlari/rooms/double/yr13.jpg',
]

const rooms: Room[] = [
  {
    title: 'Tek Kişilik Oda',
    desc: 'Sessiz, ferah ve kişisel alana önem veren öğrenciler için özel tasarım.',
    images: doubleRoomImages,
  },
  {
    title: 'İki Kişilik Oda',
    desc: 'Sosyal yaşamı seven öğrenciler için dengeli ve düzenli oda planı.',
    images: singleRoomImages,
  },
  {
    title: 'Paylaşımlı Oda',
    desc: 'Bütçe dostu seçenekler, geniş kullanım alanı ve tam donanım.',
    images: [...doubleRoomImages, ...singleRoomImages],
  },
]

function RoomModal({
  room,
  isOpen,
  onClose,
}: {
  room: Room | null
  isOpen: boolean
  onClose: () => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  const images = room?.images ?? []

  useEffect(() => {
    setActiveIndex(0)
  }, [room])

  if (!isOpen || !room) return null

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white"
          aria-label="Kapat"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative h-[60vh] min-h-[320px] bg-black">
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={room.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-6 flex items-center justify-between px-6">
            <button
              onClick={goPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[var(--brand-ink)]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full ${
                    index === activeIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Görsel ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[var(--brand-ink)]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center gap-2 text-[var(--brand-olive)]">
            <BedDouble className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.3em]">Beyzade</span>
          </div>
          <h3 className="font-['Playfair_Display'] text-2xl font-semibold">{room.title}</h3>
          <p className="mt-3 text-sm text-[var(--brand-ink)]/70">{room.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const isModalOpen = Boolean(selectedRoom)

  const heroImages = useMemo(
    () => [
      '/ankayurtlari/rooms/single/y1.jpg',
      '/ankayurtlari/rooms/single/y2.jpg',
      '/ankayurtlari/rooms/double/yr1.jpg',
      '/ankayurtlari/rooms/double/yr2.jpg',
      '/ankayurtlari/sections/experience.jpg',
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

  return (
    <div className="min-h-screen bg-[var(--brand-cream)] text-[var(--brand-ink)] font-['Source_Sans_3']">
      <MarketingHeader
        links={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Hakkımızda', href: '/hakkimizda' },
          { label: 'Odalar', href: '/odalar' }, 
          { label: 'İletişim', href: '/#iletisim' },
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt="Beyzade Odalar"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                index === heroIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-cream)]/90 via-[var(--brand-cream)]/70 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--brand-gold)]">Odalar</p>
          <h1 className="mt-4 max-w-2xl font-['Playfair_Display'] text-4xl font-semibold text-[var(--brand-ink)] sm:text-5xl">
            Konforlu ve modern oda seçenekleri
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--brand-olive)] opacity-90">
            Odaların tamamında ergonomik mobilyalar, geniş çalışma masası ve düzenli yaşam alanı bulunur.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <button
                key={room.title}
                onClick={() => setSelectedRoom(room)}
                className="group overflow-hidden rounded-3xl border border-black/10 bg-[var(--brand-cream)] text-left transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56">
                  <img src={room.images[0]} alt={room.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                  <div className="absolute bottom-4 left-4 text-sm text-[var(--brand-cream)]">
                    Fotoğrafları gör
                  </div>
                </div>
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

          <div className="mt-12 rounded-3xl border border-black/10 bg-[var(--brand-sand)] p-8 text-center">
            <h2 className="font-['Playfair_Display'] text-2xl font-semibold">Odaları yakından görmek ister misiniz?</h2>
            <p className="mt-3 text-sm text-[var(--brand-ink)]/70">
              Detaylı bilgi almak ve yerinde ziyaret planlamak için bize ulaşabilirsiniz.
            </p>
            <Button
              asChild
              className="mt-6 rounded-full bg-[var(--brand-olive)] px-6 text-[var(--brand-cream)] hover:bg-[#2f3a2c]"
            >
              <a href="tel:+905010014043">Hemen Ara</a>
            </Button>
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

      <RoomModal room={selectedRoom} isOpen={isModalOpen} onClose={() => setSelectedRoom(null)} />
    </div>
  )
}
