import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Mail, MapPin, Menu, Phone } from 'lucide-react'

type NavItem = {
  label: string
  href: string
}

type MarketingHeaderProps = {
  brandLabel?: string
  logoSrc?: string
  links: NavItem[]
}

function NavLink({ label, href }: NavItem) {
  if (href.startsWith('/')) {
    return (
      <Link
        to={href}
        className="text-sm font-semibold tracking-wide text-[var(--brand-ink)]/80 hover:text-[var(--brand-ink)] transition-colors"
      >
        {label}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className="text-sm font-semibold tracking-wide text-[var(--brand-ink)]/80 hover:text-[var(--brand-ink)] transition-colors"
    >
      {label}
    </a>
  )
}

export default function MarketingHeader({
  brandLabel = 'Anka Öğrenci Yurtları',
  logoSrc = '/ankayurtlari/logo.png',
  links,
}: MarketingHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[var(--brand-cream)]">
      <div className="bg-[var(--brand-ink)] text-[var(--brand-cream)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:+905010014043" className="inline-flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4" />
              0501 001 4043
            </a>
            <a href="mailto:beyzadeerkekyurdu@gmail.com" className="inline-flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4" />
              beyzadeerkekyurdu@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-[0.75rem] sm:text-sm">
            <a
              href="https://maps.google.com/?q=Yeni%20Ba%C4%9Fl%C4%B1ca%20Mahallesi%20T%C3%BCrkeli%20Caddesi%20no:9%20Etimesgut%2FAnkara"
              className="inline-flex items-center gap-2 text-[var(--brand-sand)] hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin className="h-4 w-4" />
              Etimesgut / Ankara
            </a>
            <a
              href="#iletisim"
              className="rounded-full border border-[var(--brand-gold)] px-4 py-1.5 font-semibold text-[var(--brand-cream)] transition hover:bg-[var(--brand-gold)] hover:text-[var(--brand-ink)]"
            >
              Bize Yazın
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md">
            <img src={logoSrc} alt={brandLabel} className="h-9 w-9 rounded-xl object-cover" />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-semibold text-[var(--brand-ink)]">{brandLabel}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--brand-olive)]">
              Ankara Öğrenci Yurtları
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden rounded-full bg-[var(--brand-olive)] px-5 py-2 text-[var(--brand-cream)] hover:bg-[#2f3a2c] lg:inline-flex"
          >
            <Link to="/login">Giriş Yap</Link>
          </Button>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="text-[var(--brand-ink)] hover:bg-[var(--brand-sand)] lg:hidden"
                aria-label="Menüyü Aç"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[var(--brand-cream)] text-[var(--brand-ink)]">
              <SheetHeader>
                <SheetTitle>{brandLabel}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-2 px-4 pb-6">
                {links.map((link) => (
                  <Button
                    key={link.label}
                    variant="outline"
                    className="justify-start rounded-xl border-black/10 bg-white/80"
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                  >
                    {link.href.startsWith('/') ? (
                      <Link to={link.href}>{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </Button>
                ))}
                <Button
                  className="mt-2 rounded-xl bg-[var(--brand-olive)] text-[var(--brand-cream)] hover:bg-[#2f3a2c]"
                  onClick={() => setMobileMenuOpen(false)}
                  asChild
                >
                  <Link to="/login">Giriş Yap</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
