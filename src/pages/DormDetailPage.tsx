import { Link, useParams } from 'react-router-dom'
import MarketingHeader from '@/components/MarketingHeader'
import { Button } from '@/components/ui/button'
import { dorms } from '@/data/dorms'
import { ArrowLeft } from 'lucide-react'

export default function DormDetailPage() {
  const { slug } = useParams()
  const dorm = dorms.find((item) => item.slug === slug)

  if (!dorm) {
    return (
      <div className="min-h-screen bg-[var(--brand-cream)] text-[var(--brand-ink)] font-['Source_Sans_3']">
        <MarketingHeader
          links={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Hakkımızda', href: '/hakkimizda' },
            { label: 'Yurtlarımız', href: '/#yurtlarimiz' },
            { label: 'Odalar', href: '/odalar' },
            { label: 'İletişim', href: '/#iletisim' },
          ]}
        />
        <div className="mx-auto max-w-4xl px-4 py-20">
          <h1 className="font-['Playfair_Display'] text-4xl font-semibold">Yurt bulunamadı</h1>
          <p className="mt-4 text-sm text-[var(--brand-ink)]/70">
            Bu yurt için sayfa bulunamadı. Ana sayfadan tekrar seçim yapabilirsiniz.
          </p>
          <Button asChild className="mt-6 rounded-full bg-[var(--brand-gold)] text-[var(--brand-ink)] hover:bg-[#b69052]">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ana Sayfaya Dön
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--brand-cream)] text-[var(--brand-ink)] font-['Source_Sans_3']">
      <MarketingHeader
        links={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Hakkımızda', href: '/hakkimizda' },
          { label: 'Yurtlarımız', href: '/#yurtlarimiz' },
          { label: 'Odalar', href: '/odalar' },
          { label: 'İletişim', href: '/#iletisim' },
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {dorm.image ? (
            <img src={dorm.image} alt={dorm.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-[var(--brand-sand)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-cream)]/90 via-[var(--brand-cream)]/70 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--brand-gold)]">Yurt Detayı</p>
          <h1 className="mt-4 max-w-3xl font-['Playfair_Display'] text-4xl font-semibold sm:text-5xl">
            {dorm.name}
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.25em] text-[var(--brand-olive)]">{dorm.type}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20">
          {dorm.roomSections.length > 0 ? (
            <div className="space-y-14">
              {dorm.roomSections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-['Playfair_Display'] text-3xl font-semibold">{section.title}</h2>
                  <p className="mt-3 text-sm text-[var(--brand-ink)]/70">{section.description}</p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {section.images.map((image) => (
                      <img
                        key={image}
                        src={image}
                        alt={`${dorm.name} - ${section.title}`}
                        className="h-56 w-full rounded-2xl border border-black/10 object-cover"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-black/10 bg-[var(--brand-cream)] p-10 text-center">
              <h2 className="font-['Playfair_Display'] text-3xl font-semibold">Görseller Yakında</h2>
              <p className="mt-4 text-sm text-[var(--brand-ink)]/70">
                Bu yurt için oda görselleri henüz eklenmedi. Fotoğrafları gönderdiğinizde aynı yapıya ekleyeceğim.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
