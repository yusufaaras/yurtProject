import { Link, useNavigate } from "react-router-dom"
import {
  Building2,
  ClipboardCheck,
  Home,
  LogOut,
  MessageSquare,
  Menu,
  Utensils,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/AuthContext"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Ana Sayfa", icon: Home, href: "/ogrenci" },
  { label: "Yurt İzin", icon: ClipboardCheck, href: "/ogrenci/izin" },
  { label: "Talepte Bulun", icon: MessageSquare, href: "/ogrenci/talep" },
  { label: "Yemek Listesi Görüntüle", icon: Utensils, href: "/ogrenci/yemek" },
]

function NavLinks({ className }: { className?: string }) {
  return (
    <nav className={cn("flex items-center gap-2", className)}>
      {navItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          className="h-9 gap-2 rounded-full border border-black/10 bg-white/80 px-4 text-[var(--brand-ink)]/80 hover:bg-[var(--brand-sand)] hover:text-[var(--brand-ink)]"
          asChild
        >
          <Link to={item.href}>
            <item.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        </Button>
      ))}

    </nav>
  )
}

function RightActions({ className }: { className?: string }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const userName = user?.ad ? `${user.ad}` : "Student"
  const userInitial = (user?.ad?.[0] ?? "S").toUpperCase()

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-olive)] text-[var(--brand-cream)]">
          <span className="text-xs font-semibold">{userInitial}</span>
        </div>
        <div className="text-sm font-medium text-[var(--brand-ink)]">{userName}</div>
      </div>

      <Button
        onClick={() => {
          logout()
          navigate("/")
        }}
        className="h-9 gap-2 rounded-full border border-[var(--brand-olive)]/40 bg-white/80 px-4 text-[var(--brand-ink)] hover:bg-[var(--brand-sand)]"
      >
        <LogOut className="h-4 w-4" />
        Çıkış Yap
      </Button>
    </div>
  )
}

export default function YurtHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[var(--brand-cream)]/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
            <Building2 className="h-5 w-5 text-[var(--brand-olive)]" />
          </div>
          <div className="text-lg font-semibold text-[var(--brand-ink)]">Yurt İzin Sistemi</div>
        </div>

        <NavLinks className="hidden lg:flex" />

        <RightActions className="hidden lg:flex" />

        <div className="flex items-center gap-2 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="text-[var(--brand-ink)] hover:bg-[var(--brand-sand)]">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[var(--brand-cream)] text-[var(--brand-ink)]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-[var(--brand-ink)]">
                  <Building2 className="h-5 w-5 text-[var(--brand-olive)]" />
                  Yurt İzin Sistemi
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4">
                <NavLinks className="flex-col items-stretch" />
                <RightActions className="flex-col items-stretch" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
