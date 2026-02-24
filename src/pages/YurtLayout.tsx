import { Link } from "react-router-dom"
import { 
  Building2, 
  MessageSquare, 
  ArrowRight, 
  Sparkles,
  Moon,
  Sun,
  UtensilsCrossed,
  Phone,
  Mail,
  ChevronRight
} from "lucide-react"

import YurtHeader from "@/components/YurtHeader"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"

// Yurt verileri
const yurtlar = [
  {
    id: 1,
    ad: "Beyzade Ekek Öğrenci Yurdu",
    telefon: "0501 001 40 43 ",
    adres: "Gölbaşı/Ankara",
    tip: "Erkek Öğrenci",
    kapasite: "150+",
    image: "/ankayurtlari/sections/beyzade.png"
  },
  {
    id: 2,
    ad: "Beyra Kız Öğrenci yurdu",
    telefon: "0552 622 40 43",
    adres: "Gölbaşı/Ankara",
    tip: "Kız Öğrenci",
    kapasite: "150+",
    image: "ankayurtlari/dorms/beyra/dis-cephe.png"
  },
  {
    id: 3,
    ad: "Beyza Kız Yurdu",
    telefon: "0552 109 40 43",
    adres: "Çankaya/Ankara",
    tip: "Kız Öğrenci",
    kapasite: "150+",
    image: "/ankayurtlari/dorms/beyza/beyza-tek-kisilik-1.jpg"
  }
]

export default function YurtLayout() {
  const { user } = useAuth()
  
  // Hata Fix: user objesinde displayName yoksa ad'ı kullan, o da yoksa varsayılan ata
  // Any cast'i geçici bir çözümdür, uzun vadede AuthContext'teki User tipini güncellemelisin
  const userName = user?.ad || (user as any)?.displayName || "Öğrenci"

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#1B1E30] selection:bg-[#E2D1B3]">
      <YurtHeader />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="space-y-10">
          
          {/* Üst Karşılama Alanı */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Hero Card */}
            <div className="relative flex-[2] overflow-hidden rounded-[2.5rem] bg-[#1B1E30] p-8 sm:p-12 shadow-2xl group">
              <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-[#C5A267] opacity-10 blur-[80px] rounded-full group-hover:opacity-20 transition-opacity" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <Badge className="bg-[#C5A267]/20 text-[#C5A267] border-none px-4 py-1 mb-6 backdrop-blur-md">
                    <Sparkles className="mr-2 h-3 w-3" />
                    Anka Yurtları
                  </Badge>
                  <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#FDFCF9] leading-tight">
                    Hoş Geldiniz, <br />
                    <span className="text-[#C5A267]">{userName}</span>
                  </h1>
                  <p className="mt-4 max-w-md text-[#E2D1B3]/70 text-lg leading-relaxed font-light">
                    Anka Yurtları'nda konforun ve güvenin tadını çıkarın. Tüm işlemleriniz tek bir panelde.
                  </p>
                </div>
                
                <div className="mt-10 flex gap-4">
                  <Button asChild className="rounded-full bg-[#C5A267] hover:bg-[#B38E55] text-white px-8 py-6 h-auto text-base">
                    <Link to="/ogrenci/izin">İzin Başlat <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
              
              <div className="absolute bottom-0 right-0 hidden lg:block opacity-40 group-hover:opacity-60 transition-opacity">
                <Building2 size={300} strokeWidth={0.5} className="text-[#C5A267] translate-y-20 translate-x-10" />
              </div>
            </div>

            {/* Yemek Kartı */}
            <Link 
              to="/ogrenci/yemek" 
              className="flex-1 rounded-[2.5rem] bg-gradient-to-br from-[#E2D1B3] to-[#D4C0A1] p-8 shadow-xl flex flex-col justify-between border border-white/20 group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex justify-between items-start">
                <div className="h-14 w-14 rounded-2xl bg-white/40 backdrop-blur-md flex items-center justify-center text-[#1B1E30] group-hover:scale-110 transition-transform">
                  <UtensilsCrossed className="h-7 w-7" />
                </div>
                <div className="text-right font-medium text-[#1B1E30]/60">
                  <p>{new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}</p>
                  <p className="text-sm">{new Date().toLocaleDateString('tr-TR', { weekday: 'long' })}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">
                    <Sun className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1B1E30]/40 uppercase tracking-wider">Sabah</p>
                    <p className="text-sm font-medium text-[#1B1E30]">Kahvaltı (07:00-10:00)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">
                    <Moon className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1B1E30]/40 uppercase tracking-wider">Akşam</p>
                    <p className="text-sm font-medium text-[#1B1E30]">Yemek (18:00-21:00)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 text-sm font-bold text-[#1B1E30]/70 group-hover:text-[#1B1E30] transition-colors">
                  Menüyü Görüntüle
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Aksiyon Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="md:col-span-2 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1B1E30] to-[#2D3142] p-8 shadow-xl group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A267] opacity-5 rounded-full blur-[60px] group-hover:opacity-10 transition-opacity" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#C5A267]">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">Anka Yurtları</h3>
                      <p className="text-sm text-white/50">Öğrenci Konaklama Hizmetleri</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <p className="text-white/70 text-sm leading-relaxed">
                    2010'dan bu yana Ankara'nın en güvenilir öğrenci yurtları zinciri olarak hizmet veriyoruz. 
                  </p>
                  <div className="flex gap-4 pt-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#C5A267]">4</p>
                      <p className="text-xs text-white/50">Yurt</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#C5A267]">300+</p>
                      <p className="text-xs text-white/50">Öğrenci</p>
                    </div>

                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#C5A267]">7+ Yıl</p>
                      <p className="text-xs text-white/50">Deneyim</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/ogrenci/talep" className="group rounded-[2rem] bg-[#F5F5F5] p-8 flex flex-col justify-between hover:bg-[#1B1E30] transition-all duration-500">
               <div className="h-12 w-12 rounded-2xl bg-white text-[#1B1E30] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                 <MessageSquare className="h-6 w-6" />
               </div>
               <div>
                 <h3 className="text-xl font-bold group-hover:text-white transition-colors">Talep & Öneri</h3>
                 <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors mt-1">Teknik destek veya istek bildirimi yapın.</p>
               </div>
            </Link>

            <Dialog> 
              <DialogContent className="max-w-md rounded-[2rem] border-none shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-['Playfair_Display']">Servis Güzergahları</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {[
                    { title: "Sabah - Kampüs", time: "07:30", color: "bg-amber-100 text-amber-700", desc: "Merkez Durak kalkışlı" },
                    { title: "Öğle - Ring", time: "12:15", color: "bg-blue-100 text-blue-700", desc: "Kütüphane önü kalkışlı" },
                    { title: "Akşam - Dönüş", time: "17:45", color: "bg-indigo-100 text-indigo-700", desc: "Fakülte önü kalkışlı" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div>
                        <p className="font-bold">{s.title}</p>
                        <p className="text-xs text-slate-500">{s.desc}</p>
                      </div>
                      <Badge className={`${s.color} border-none text-base px-4 py-1`}>{s.time}</Badge>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Yurtlarımız & İletişim Paneli */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-[2.5rem] bg-white border border-black/[0.03] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Building2 className="text-[#C5A267]" />
                  <h2 className="text-xl font-bold">Yurtlarımız</h2>
                </div>
               </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {yurtlar.map((yurt) => (
                  <div key={yurt.id} className="group flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-[#C5A267]/5 border border-transparent hover:border-[#C5A267]/20 transition-all cursor-pointer">
                    <div className="h-20 w-20 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0">
                      <img src={yurt.image} alt={yurt.ad} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#1B1E30] truncate">{yurt.ad}</h4>
                      <p className="text-xs text-slate-500 mt-1">{yurt.adres}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs bg-[#C5A267]/10 text-[#C5A267] border-none">
                          {yurt.tip}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-[#1B1E30] text-white p-8 relative overflow-hidden">
               <div className="relative z-10 flex flex-col h-full">
                 <h3 className="text-lg font-['Playfair_Display'] text-[#C5A267] mb-6">İletişim & Destek</h3>
                 <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                   {yurtlar.map((yurt) => (
                     <a 
                       key={yurt.id} 
                       href={`tel:${yurt.telefon.replace(/\s/g, '')}`}
                       className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                     >
                       <div className="h-8 w-8 rounded-lg bg-[#C5A267]/20 flex items-center justify-center text-[#C5A267] transition-colors">
                         <Phone className="h-4 w-4" />
                       </div>
                       <div className="flex-1 min-w-0">
                         <p className="text-sm font-medium truncate">{yurt.ad}</p>
                         <p className="text-xs text-white/50">{yurt.telefon}</p>
                       </div>
                     </a>
                   ))}
                   <div className="pt-4 border-t border-white/10">
                     <a href="mailto:beyzadeerkekyurdu@gmail.com" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                       <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                         <Mail className="h-4 w-4" />
                       </div>
                       <div>
                         <p className="text-sm font-medium">Genel Merkez</p>
                       </div>
                     </a>
                   </div>
                 </div>
                 <Button className="w-full mt-6 bg-[#C5A267] hover:bg-[#B38E55] text-white border-none rounded-xl py-6">
                    <Phone className="mr-2 h-4 w-4" />
                    Acil Destek Hattı
                 </Button>
               </div>
            </div>
          </div>
        </section>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(197, 162, 103, 0.3); border-radius: 2px; }
      `}</style>
    </div>
  )
}