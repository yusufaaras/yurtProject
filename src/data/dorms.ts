export type DormRoomSection = {
  title: string
  description: string
  images: string[]
}

export type Dorm = {
  slug: string
  name: string
  type: string
  image: string | null
  roomSections: DormRoomSection[]
}

const beyzadeSingleRoomImages: string[] = [
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

const beyzadeDoubleRoomImages: string[] = [
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

const beyraSingleRoomImages: string[] = [
  '/ankayurtlari/dorms/beyra/tek-kisilik-1.png',
  '/ankayurtlari/dorms/beyra/tek-kisilik-2.png',
  '/ankayurtlari/dorms/beyra/tek-kisilik-3.png',
  '/ankayurtlari/dorms/beyra/tek-kisilik-4.png',
  '/ankayurtlari/dorms/beyra/tek-kisilik-5.png',
  '/ankayurtlari/dorms/beyra/tek-kisilik-6.png',
  '/ankayurtlari/dorms/beyra/tek-kisilik-7.png',
  '/ankayurtlari/dorms/beyra/tek-kisilik-8.png',
  '/ankayurtlari/dorms/beyra/tek-kisilik-9.png',
]

const beyraDoubleRoomImages: string[] = [
  '/ankayurtlari/dorms/beyra/cift-kisilik-1.png',
  '/ankayurtlari/dorms/beyra/cift-kisilik-2.png',
  '/ankayurtlari/dorms/beyra/cift-kisilik-3.png',
  '/ankayurtlari/dorms/beyra/cift-kisilik-4.png',
  '/ankayurtlari/dorms/beyra/cift-kisilik-5.png',
  '/ankayurtlari/dorms/beyra/cift-kisilik-6.png',
  '/ankayurtlari/dorms/beyra/cift-kisilik-7.png',
  '/ankayurtlari/dorms/beyra/cift-kisilik-8.png',
  '/ankayurtlari/dorms/beyra/cift-kisilik-9.png',
  '/ankayurtlari/dorms/beyra/cift-kisilik-10.png',
]

const beyraQuadRoomImages: string[] = [
  '/ankayurtlari/dorms/beyra/4_kisilik-1.jpg',
  '/ankayurtlari/dorms/beyra/4-kisilik-2.jpg',
  '/ankayurtlari/dorms/beyra/4-kisilik-3.jpg',
  '/ankayurtlari/dorms/beyra/4-kisilik-4.jpg',
  '/ankayurtlari/dorms/beyra/4_kisilik_5.jpg',
  '/ankayurtlari/dorms/beyra/4-kisilik-6.jpg',
  '/ankayurtlari/dorms/beyra/4_kisilik_7.jpg',
  '/ankayurtlari/dorms/beyra/4_kisilik_8.jpg',
  '/ankayurtlari/dorms/beyra/4_kisilik_9.jpg',
]

const beyzaRoomImages: string[] = [
  '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-1.jpg',
  '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-2.jpg',
  '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-3.jpg',
  '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-4.jpg',
  '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-5.jpg',
  '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-6.jpg',
  '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-7.jpg',
  '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-8.jpg',
  '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-9.jpg',
  '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-10.jpg',
  '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-11.jpg',
]

export const dorms: Dorm[] = [
  {
    slug: 'beyzade-erkek-ogrenci-yurdu',
    name: 'Beyzade Erkek Öğrenci Yurdu',
    type: 'Erkek Öğrenci Yurdu',
    image: '/ankayurtlari/sections/beyzade.png',
    roomSections: [
      {
        title: 'Tek Kişilik Odalar',
        description: 'Sessiz, ferah ve kişisel alana önem veren öğrenciler için ideal seçenek.',
        images: beyzadeSingleRoomImages,
      },
      {
        title: 'Çift Kişilik Odalar',
        description: 'Sosyal yaşamı destekleyen, dengeli ve düzenli oda planı.',
        images: beyzadeDoubleRoomImages,
      },
    ],
  },
  {
    slug: 'beyra-kiz-ogrenci-yurdu',
    name: 'Beyra Kız Öğrenci Yurdu',
    type: 'Kız Öğrenci Yurdu',
    image: '/ankayurtlari/dorms/beyra/dis-cephe.png',
    roomSections: [
      {
        title: 'Tek Kişilik Odalar',
        description: 'Beyra Kız Öğrenci Yurdu tek kişilik oda seçenekleri.',
        images: beyraSingleRoomImages,
      },
      {
        title: 'Çift Kişilik Odalar',
        description: 'Beyra Kız Öğrenci Yurdu çift kişilik oda seçenekleri.',
        images: beyraDoubleRoomImages,
      },
      {
        title: '4 Kişilik Odalar',
        description: 'Beyra Kız Öğrenci Yurdu 4 kişilik oda seçenekleri.',
        images: beyraQuadRoomImages,
      },
    ],
  },
  {
    slug: 'beyza-kiz-yurdu',
    name: 'Beyza Kız Yurdu',
    type: 'Kız Öğrenci Yurdu',
    image: '/ankayurtlari/dorms/beyza/beyza-tek-kisilik-1.jpg',
    roomSections: [
      {
        title: 'Tek Kişilik Odalar',
        description: 'Beyza Kız Yurdu tek kişilik oda seçenekleri.',
        images: beyzaRoomImages,
      },
      {
        title: 'Çift Kişilik Odalar',
        description: 'Beyza Kız Yurdu çift kişilik oda seçenekleri.',
        images: beyzaRoomImages,
      },
    ],
  },
  {
    slug: 'ankayurt',
    name: 'Anka Anadolu Kız ve Erkek Öğrenci Yurdu',
    type: 'Kız ve Erkek Öğrenci Yurdu',
    image: null,
    roomSections: [],
  },
]
