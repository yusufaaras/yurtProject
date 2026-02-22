export interface User {
  id: number;
  tc_no: string;
  ad: string;
  soyad: string;
  email?: string;
  telefon?: string;
  aile_telefon?: string;
  rol: 'ogrenci' | 'mudur' | 'admin';
  yurt_id?: number;
  yurt_adi?: string;
  yurt_adresi?: string;
  aktif?: boolean;
  created_at?: string;
}

export interface YurtSubesi {
  id: number;
  ad: string;
  adres?: string;
  telefon?: string;
  mudur_id?: number;
  mudur_ad?: string;
  mudur_soyad?: string;
  aktif?: boolean;
}

export interface IzinTalebi {
  id: number;
  ogrenci_id: number;
  yurt_id?: number;
  baslangic_tarihi: string;
  bitis_tarihi: string;
  cikis_saati?: string;
  donus_saati?: string;
  gidilecek_yer: string;
  telefon: string;
  aciklama?: string;
  durum: 'beklemede' | 'onaylandi' | 'reddedildi';
  admin_notu?: string;
  created_at?: string;
  ad?: string;
  soyad?: string;
  tc_no?: string;
  yurt_adi?: string;
}

export interface SikayetIstek {
  id: number;
  ogrenci_id: number;
  yurt_id?: number;
  tip: 'sikayet' | 'istek' | 'oneri';
  konu: string;
  mesaj: string;
  durum: 'beklemede' | 'inceleniyor' | 'cozuldu' | 'reddedildi';
  admin_notu?: string;
  created_at?: string;
  ad?: string;
  soyad?: string;
  tc_no?: string;
  yurt_adi?: string;
}

export interface Yemek {
  id: number;
  yurt_id: number;
  tarih: string;
  ogun: 'kahvalti' | 'ogle' | 'aksam';
  menu: string;
  created_by?: number;
  created_at?: string;
  yurt_adi?: string;
}

export interface YemekListesi {
  [tarih: string]: {
    kahvalti?: string;
    ogle?: string;
    aksam?: string;
  };
}

export interface DashboardStats {
  ogrenci_sayisi: number;
  bekleyen_izinler: number;
  toplam_izinler: number;
  gunun_izinleri: number;
  bekleyen_sikayetler: number;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
