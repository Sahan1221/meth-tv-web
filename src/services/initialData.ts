import { Program, DhammaEvent, NewsArticle, SiteSettings } from '../types';

export const initialSiteSettings: SiteSettings = {
  livestreamUrl: 'https://www.youtube.com/watch?v=live_stream_placeholder',
  livestreamTitle: 'මෙත් රූපවාහිනී සජීවී විකාශය - ධර්ම දේශනා සහ පිරිත් සජ්ඣායනා',
  isLiveActive: true,
  youtubeChannelIds: [
    'UCnsOUPYQjiFj28SR4IWm5BQ',
    'UC2mAd_TrVm1st6UO2FmzNqw',
    'UCPGmdO4neBO3AQejn-4SU_w'
  ],
  contactTelephone: '0342 263 646',
  contactEmail: 'info@galigamuwethero.com',
  contactAddress: 'මෙත් රූපවාහිනී මැදිරිය, ශ්‍රී ලංකාව',
  peoTvChannel: 'Channel 111',
  facebookUrl: 'https://www.facebook.com/methtvofficial',
  websiteUrl: 'https://methtv.lk'
};

export const initialPrograms: Program[] = [
  {
    id: 'prog-1',
    title: 'සදහම් සිසිල - උතුම් සද්ධර්ම දේශනාව',
    description: 'ගලිගමුවේ ඥාණදීප ස්වාමීන් වහන්සේ ප්‍රමුඛ මහා සංඝරත්නය විසින් පවත්වනු ලබන විශේෂ සද්ධර්ම දේශනා මාලාව. සිත සනහන දහම් පණිවිඩය ඔබේ නිවසට.',
    category: 'ධර්ම දේශනා',
    coverImage: '/src/assets/images/program_dhamma_discussion_1791621325599.jpg',
    date: '2026-10-15',
    startTime: 'ප.ව. 07:00',
    venue: 'මෙත් රූපවාහිනී ප්‍රධාන මැදිරිය',
    status: 'upcoming',
    youtubeUrl: 'https://www.youtube.com/watch?v=UCnsOUPYQjiFj28SR4IWm5BQ',
    isFeatured: true,
    publicationStatus: 'published',
    createdAt: '2026-10-01T08:00:00.000Z',
    updatedAt: '2026-10-01T08:00:00.000Z'
  },
  {
    id: 'prog-2',
    title: 'උඳුවප් පුන් පොහෝ දින සජීවී සීල සමාදාන වැඩසටහන',
    description: 'උදෑසන බුද්ධ පූජාව, සීල සමාදානය, දහවල් සම්බුද්ධ පූජාව, සදහම් සාකච්ඡා සහ සවස අටවිසි බුද්ධ වන්දනාව ඇතුළු පූර්ණ දින වැඩසටහන.',
    category: 'විශේෂ පෝය විකාශ',
    coverImage: '/src/assets/images/event_poya_sil_program_1791621295192.jpg',
    date: '2026-10-24',
    startTime: 'පෙ.ව. 06:00',
    venue: 'ඓතිහාසික රුවන්වැලි මහා සෑ මළුව, අනුරාධපුරය',
    status: 'upcoming',
    youtubeUrl: '',
    isFeatured: true,
    publicationStatus: 'published',
    createdAt: '2026-10-02T10:00:00.000Z',
    updatedAt: '2026-10-02T10:00:00.000Z'
  },
  {
    id: 'prog-3',
    title: 'සිත නිවන මඟ - මෛත්‍රී භාවනා වැඩසටහන',
    description: 'ව්‍යාකූල මනස සංසිඳුවා ගනිමින් සැනසිලිදායක ජීවිතයක් උදාකර ගැනීම සඳහා මඟ පෙන්වන විශේෂ මෛත්‍රී භාවනා වැඩසටහන.',
    category: 'භාවනා වැඩසටහන්',
    coverImage: '/src/assets/images/hero_dhamma_broadcast_1791621278068.jpg',
    date: '2026-10-18',
    startTime: 'පෙ.ව. 08:30',
    venue: 'මෙත් අරණ භාවනා මධ්‍යස්ථානය',
    status: 'upcoming',
    youtubeUrl: '',
    isFeatured: false,
    publicationStatus: 'published',
    createdAt: '2026-10-03T11:00:00.000Z',
    updatedAt: '2026-10-03T11:00:00.000Z'
  },
  {
    id: 'prog-4',
    title: 'දම් සභා මණ්ඩපය - සජීවී ධර්ම සාකච්ඡාව',
    description: 'ගිහි සමාජයේ මතුවන ප්‍රායෝගික ගැටලු සඳහා ත්‍රිපිටක ධර්මය තුළින් සත්‍ය පිළිතුරු සොයායන විද්වත් සදහම් සාකච්ඡාව.',
    category: 'ධර්ම සාකච්ඡා',
    coverImage: '/src/assets/images/program_dhamma_discussion_1791621325599.jpg',
    date: '2026-10-12',
    startTime: 'ප.ව. 08:30',
    venue: 'මෙත් රූපවාහිනී මැදිරිය',
    status: 'upcoming',
    youtubeUrl: '',
    isFeatured: false,
    publicationStatus: 'published',
    createdAt: '2026-10-04T12:00:00.000Z',
    updatedAt: '2026-10-04T12:00:00.000Z'
  },
  {
    id: 'prog-5',
    title: 'රත්නමාලී මහා පිරිත් සජ්ඣායනය',
    description: 'රටටත් ලෝකවාසී සැමටත් සෙත් පතා පැවැත්වෙන මහා සෙත් පිරිත් දේශනාව සහ බෝධි පූජා මහා පිංකම.',
    category: 'පිරිත් දේශනා',
    coverImage: '/src/assets/images/hero_dhamma_broadcast_1791621278068.jpg',
    date: '2026-09-28',
    startTime: 'ප.ව. 06:30',
    venue: 'මහියංගණ රජමහා විහාරය',
    status: 'completed',
    youtubeUrl: '',
    isFeatured: false,
    publicationStatus: 'published',
    createdAt: '2026-09-20T08:00:00.000Z',
    updatedAt: '2026-09-29T10:00:00.000Z'
  }
];

export const initialEvents: DhammaEvent[] = [
  {
    id: 'event-1',
    title: 'මහා සංඝරත්නය විෂයෙහි පැවැත් වූ වාර්ෂික කඨින මහා පුණ්‍යකර්මය',
    description: 'සැදැහැවත් දායක පින්වතුන්ගේ සහභාගීත්වයෙන් මහා සංඝරත්නයට කඨින චීවර පූජාව, සඟසතු මහා දානමය පිංකම සහ අටපිරිකර පූජාව අති උත්කර්ෂවත් අන්දමින් සිදුකළ අයුරු.',
    eventDate: '2026-09-25',
    venue: 'මෙත් සෙවන බෞද්ධ මධ්‍යස්ථානය, කළුතර',
    coverImage: '/src/assets/images/event_kathina_ceremony_1791621311155.jpg',
    relatedProgramId: 'prog-5',
    publicationStatus: 'published',
    isFeatured: true,
    createdAt: '2026-09-26T09:00:00.000Z',
    updatedAt: '2026-09-26T09:00:00.000Z',
    photos: [
      {
        id: 'photo-101',
        eventId: 'event-1',
        imageUrl: '/src/assets/images/event_kathina_ceremony_1791621311155.jpg',
        caption: 'මහා සංඝරත්නය වෙත පූජනීය කඨින චීවරය පූජා කරනු ලබන ශ්‍රද්ධාජනක අවස්ථාව',
        altText: 'කඨින චීවර පූජාව',
        displayOrder: 1,
        uploadedAt: '2026-09-26T09:10:00.000Z'
      },
      {
        id: 'photo-102',
        eventId: 'event-1',
        imageUrl: '/src/assets/images/program_dhamma_discussion_1791621325599.jpg',
        caption: 'කඨිනානිසංස ධර්ම දේශනාව ශ්‍රවණය කරමින් පින් අනුමෝදන් වන සැදැහැවතුන්',
        altText: 'කඨින ධර්ම දේශනාව',
        displayOrder: 2,
        uploadedAt: '2026-09-26T09:15:00.000Z'
      },
      {
        id: 'photo-103',
        eventId: 'event-1',
        imageUrl: '/src/assets/images/hero_dhamma_broadcast_1791621278068.jpg',
        caption: 'සන්ධ්‍යා භාගයේ පැවැත් වූ අසිරිමත් ආලෝක පූජාව සහ මල් පහන් පූජාව',
        altText: 'ආලෝක පූජාව',
        displayOrder: 3,
        uploadedAt: '2026-09-26T09:20:00.000Z'
      }
    ]
  },
  {
    id: 'event-2',
    title: 'වප් පුන් පොහෝ දින අසිරිමත් මහා සීල සමාදාන පිංකම',
    description: 'දහසක් උපාසක උපාසිකාවන් සුදුවතින් සැරසී අටසිල් සමාදන් වෙමින්, රුවන්වැලි සෑ රදුන් අභියස නෙළුම් මල් පූජා කරමින් රැස්කරගත් උතුම් කුසල් සම්භාරය.',
    eventDate: '2026-09-17',
    venue: 'ඓතිහාසික රුවන්වැලිසෑ පුදබිම',
    coverImage: '/src/assets/images/event_poya_sil_program_1791621295192.jpg',
    relatedProgramId: 'prog-2',
    publicationStatus: 'published',
    isFeatured: true,
    createdAt: '2026-09-18T10:00:00.000Z',
    updatedAt: '2026-09-18T10:00:00.000Z',
    photos: [
      {
        id: 'photo-201',
        eventId: 'event-2',
        imageUrl: '/src/assets/images/event_poya_sil_program_1791621295192.jpg',
        caption: 'නෙළුම් මල් පූජා කරමින් බුද්ධාලම්භන ප්‍රීතියෙන් වන්දනාමාන කරන උපාසිකාවන්',
        altText: 'නෙළුම් මල් පූජාව',
        displayOrder: 1,
        uploadedAt: '2026-09-18T10:10:00.000Z'
      },
      {
        id: 'photo-202',
        eventId: 'event-2',
        imageUrl: '/src/assets/images/hero_dhamma_broadcast_1791621278068.jpg',
        caption: 'සවස සෑ මළුවේ පැවැති සජීවී බුද්ධ වන්දනාව සහ ආශිර්වාද පිරිත් දේශනාව',
        altText: 'සජීවී බුද්ධ වන්දනාව',
        displayOrder: 2,
        uploadedAt: '2026-09-18T10:15:00.000Z'
      }
    ]
  }
];

export const initialNews: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'මෙත් රූපවාහිනිය PEO TV නාලිකා අංක 111 ඔස්සේ දිවයින පුරා නැරඹිය හැක',
    summary: 'ශ්‍රී ලාංකික බෞද්ධ ප්‍රේක්ෂකයන් වෙනුවෙන් මෙත් රූපවාහිනිය (METH TV) දැන් SLT PEO TV නාලිකා අංක 111 ඔස්සේ අඛණ්ඩව විකාශය වේ.',
    content: 'සම්බුද්ධ ශාසනයේ චිරස්ථිතිය උදෙසාත්, පරම පිවිතුරු සද්ධර්මය ලෝකවාසී සත්වයන්ට දායාද කිරීම උදෙසාත් ක්‍රියාත්මක මෙත් රූපවාහිනිය (METH TV), ශ්‍රී ලංකා ටෙලිකොම් PEO TV Channel 111 ඔස්සේ දැන් පැය 24 පුරා නැරඹිය හැක. සියලුම බොදුනුවන්ට මෙත් සිසිල බෙදාදෙන මෙම මාධ්‍ය මෙහෙවර සමග එක්වන්න.',
    coverImage: '/src/assets/images/hero_dhamma_broadcast_1791621278068.jpg',
    publicationDate: '2026-10-05',
    publicationStatus: 'published',
    createdAt: '2026-10-05T06:00:00.000Z',
    updatedAt: '2026-10-05T06:00:00.000Z'
  },
  {
    id: 'news-2',
    title: 'ඉදිරි ඉල් පුන් පොහෝ දින විශේෂ සජීවී විකාශය සඳහා සූදානම් වන්න',
    summary: 'ඉල් පොහෝ දින උදෑසන 6 සිට සවස 6 දක්වා දවස පුරා සජීවීව විකාශය වන ධර්ම දේශනා, භාවනා සහ සාකච්ඡා වැඩසටහන් පෙළගැස්ම.',
    content: 'උතුම් ඉල් පුර පසළොස්වක පොහෝ දිනය නිමිත්තෙන් මෙත් රූපවාහිනී මාධ්‍ය ජාලය මඟින් පවත්වනු ලබන විශේෂ සජීවී විකාශය ලබන මස පැවැත්වේ. නිවසේ සිටම පින්කම්වලට සම්බන්ධ වීමට METH TV YouTube නාලිකාව සහ PEO TV 111 සමඟ රැඳී සිටින්න.',
    coverImage: '/src/assets/images/event_poya_sil_program_1791621295192.jpg',
    publicationDate: '2026-10-08',
    eventDate: '2026-11-23',
    publicationStatus: 'published',
    createdAt: '2026-10-08T07:30:00.000Z',
    updatedAt: '2026-10-08T07:30:00.000Z'
  }
];

import { DonationCampaign, DonationIntent, DayakathwayaCategory, DayakathwayaOpportunity, DayakathwayaRequest } from '../types';

export const initialDonationCampaigns: DonationCampaign[] = [
  {
    id: 'camp-1',
    title: 'ධර්ම දේශනා වැඩසටහන් අඛණ්ඩ විකාශන අරමුදල',
    description: 'ගලිගමුවේ ඥාණදීප හිමියන් ප්‍රමුඛ මහා සංඝරත්නයේ ධර්ම දේශනා සහ භාවනා වැඩසටහන් දිවයින පුරා සහ ලොව පුරා විසිරී සිටින සුවහසක් බෞද්ධ ජනතාව වෙත අධි-විභේදන තාක්ෂණයෙන් යුතුව අඛණ්ඩව සම්ප්‍රේෂණය කිරීමේ පුණ්‍ය අරමුදල.',
    category: 'ධර්ම දේශනා වැඩසටහන්',
    targetAmount: 500000,
    startDate: '2026-10-01',
    status: 'active',
    paymentInstructions: 'පරිත්‍යාග අභිප්‍රාය යොමු කළ පසු අපගේ මෙත් රූපවාහිනී කාර්යාලය විසින් ඔබ අමතා ගිණුම් විස්තර සහ දායකත්ව කුවිතාන්සිය ලබා දෙනු ඇත.',
    coverImage: '/src/assets/images/program_dhamma_discussion_1791621325599.jpg',
    createdAt: '2026-10-01T08:00:00.000Z',
    updatedAt: '2026-10-01T08:00:00.000Z'
  },
  {
    id: 'camp-2',
    title: 'පෝය දින සජීවී විකාශන හා සීල සමාදාන වැඩසටහන්',
    description: 'පුර පසළොස්වක පොහෝ දිනවල දිවයිනේ ඓතිහාසික සිද්ධස්ථාන කේන්ද්‍ර කරගනිමින් පැවැත්වෙන පූර්ණ දින සජීවී සීල සමාදාන, බුද්ධ පූජා සහ ධර්ම සාකච්ඡා විකාශයන් සඳහා සහයෝගය ලබාදීම.',
    category: 'විශේෂ පොහෝ දින වැඩසටහන්',
    targetAmount: 750000,
    startDate: '2026-10-01',
    status: 'active',
    paymentInstructions: 'මෙත් රූපවාහිනී පරිපාලන අංශය හරහා අනුමත නිල දායකත්ව ලදුපතක් සමඟ පමණක් ගනුදෙනු තහවුරු කෙරේ.',
    coverImage: '/src/assets/images/event_poya_sil_program_1791621295192.jpg',
    createdAt: '2026-10-02T10:00:00.000Z',
    updatedAt: '2026-10-02T10:00:00.000Z'
  },
  {
    id: 'camp-3',
    title: 'මෙත් රූපවාහිනී ඩිජිටල් හා මැදිරි උපකරණ සංවර්ධනය',
    description: 'නවීන කැමරා පද්ධති, ශබ්ද විකාශන තාක්ෂණය සහ අන්තර්ජාල සම්ප්‍රේෂණ උපාංග යාවත්කාලීන කිරීම වෙනුවෙන් බෞද්ධ මාධ්‍ය සත්කාරය ශක්තිමත් කිරීම.',
    category: 'මෙත් රූපවාහිනී මාධ්‍ය කටයුතු',
    status: 'active',
    paymentInstructions: 'පරිත්‍යාග තොරතුරු යොමු කළ පසු මෙත් රූපවාහිනී මූල්‍ය අංශය මඟින් සෘජුවම සම්බන්ධ වනු ලැබේ.',
    coverImage: '/src/assets/images/hero_dhamma_broadcast_1791621278068.jpg',
    createdAt: '2026-10-03T11:00:00.000Z',
    updatedAt: '2026-10-03T11:00:00.000Z'
  }
];

export const initialDonationIntents: DonationIntent[] = [
  {
    id: 'don-1',
    referenceNumber: 'METH-DON-2026-1001',
    donorName: 'ආනන්ද කුමාරසේකර මහතා',
    telephone: '071 452 8931',
    email: 'ananda.k@example.com',
    purpose: 'ධර්ම දේශනා වැඩසටහන්',
    campaignId: 'camp-1',
    campaignTitle: 'ධර්ම දේශනා වැඩසටහන් අඛණ්ඩ විකාශන අරමුදල',
    intendedAmount: 10000,
    message: 'දෙමාපියන්ට පින් පිණිස සිදුකරන උපහාර පරිත්‍යාගයකි.',
    status: 'තහවුරු කර ඇත',
    paymentStatus: 'ගෙවා ඇත',
    adminNotes: 'බැංකු තැන්පතු කුවිතාන්සිය තහවුරු විය. දායකත්ව ලිපිය යවන ලදී.',
    createdAt: '2026-10-08T09:30:00.000Z'
  },
  {
    id: 'don-2',
    referenceNumber: 'METH-DON-2026-1002',
    donorName: 'කුමාරි හේරත් මිය',
    telephone: '077 821 3490',
    email: 'kumari.herath@example.com',
    purpose: 'විශේෂ පොහෝ දින වැඩසටහන්',
    campaignId: 'camp-2',
    campaignTitle: 'පෝය දින සජීවී විකාශන හා සීල සමාදාන වැඩසටහන්',
    intendedAmount: 5000,
    message: 'දරුවන්ට සෙත් පතා සිදුකරන සත්කාරයකි.',
    status: 'නව ඉල්ලීම',
    paymentStatus: 'නොගෙවූ',
    adminNotes: 'ඇමතුමක් ලබාදී ගිණුම් විස්තර දැන්විය යුතුය.',
    createdAt: '2026-10-09T14:15:00.000Z'
  }
];

export const initialDayakathwayaCategories: DayakathwayaCategory[] = [
  {
    id: 'cat-1',
    title: 'ධර්ම දේශනා වැඩසටහනක් සඳහා දායකත්වය',
    description: 'මෙත් රූපවාහිනියේ විකාශය වන ප්‍රධාන ධර්ම දේශනාවක් සඳහා දායකත්වය භාරගැනීම.',
    imageUrl: '/src/assets/images/program_dhamma_discussion_1791621325599.jpg',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'cat-2',
    title: 'පෝහෝ දින විශේෂ වැඩසටහනක් සඳහා දායකත්වය',
    description: 'පුර පසළොස්වක පොහෝ දිනයක පූර්ණ දින හෝ අර්ධ දින ආගමික වැඩසටහන් දායකත්වය.',
    imageUrl: '/src/assets/images/event_poya_sil_program_1791621295192.jpg',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'cat-3',
    title: 'ආගමික උත්සවයක් සඳහා දායකත්වය',
    description: 'වාර්ෂික කඨින පින්කම්, අසිරිමත් මල් පූජා, පහන් පූජා සහ බෝධි පූජා උත්සව දායකත්වය.',
    imageUrl: '/src/assets/images/event_kathina_ceremony_1791621311155.jpg',
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 'cat-4',
    title: 'භික්ෂූන් වහන්සේලාගේ ධර්ම සාකච්ඡා වැඩසටහනක් සඳහා දායකත්වය',
    description: 'විද්වත් ත්‍රිපිටක ධර්ම සාකච්ඡා සහ සජීවී දම් සභා මණ්ඩපය වැඩසටහන් දායකත්වය.',
    imageUrl: '/src/assets/images/program_dhamma_discussion_1791621325599.jpg',
    displayOrder: 4,
    isActive: true,
  },
  {
    id: 'cat-5',
    title: 'සජීවී විකාශන කටයුතු සඳහා දායකත්වය',
    description: 'දුරබැහැර ඓතිහාසික පුදබිමක සිට සිදුකරන සජීවී චන්ද්‍රිකා සහ ඩිජිටල් විකාශන වියදම් දැරීම.',
    imageUrl: '/src/assets/images/hero_dhamma_broadcast_1791621278068.jpg',
    displayOrder: 5,
    isActive: true,
  },
  {
    id: 'cat-6',
    title: 'රූපවාහිනී වැඩසටහන් නිෂ්පාදනය සඳහා දායකත්වය',
    description: 'නව ධර්ම සාකච්ඡා, ළමා දහම් වැඩසටහන් හෝ වාර්තාමය වැඩසටහන් නිෂ්පාදනය.',
    imageUrl: '/src/assets/images/hero_dhamma_broadcast_1791621278068.jpg',
    displayOrder: 6,
    isActive: true,
  },
  {
    id: 'cat-7',
    title: 'මාධ්‍ය හා තාක්ෂණික කටයුතු සඳහා දායකත්වය',
    description: 'නාලිකාවේ සේවාදායක, කැමරා හා සංස්කරණ තාක්ෂණික මෙහෙයුම් සඳහා අනුග්‍රහය.',
    imageUrl: '/src/assets/images/hero_dhamma_broadcast_1791621278068.jpg',
    displayOrder: 7,
    isActive: true,
  },
  {
    id: 'cat-8',
    title: 'වෙනත් විශේෂ වැඩසටහනක්',
    description: 'ඔබගේ පෞද්ගලික අභිමතය පරිදි උපන්දිනයක්, සංවත්සරයක් හෝ මියගිය ඥාතීන්ට පින් පිණිස විශේෂ වැඩසටහනක්.',
    imageUrl: '/src/assets/images/program_dhamma_discussion_1791621325599.jpg',
    displayOrder: 8,
    isActive: true,
  },
];

export const initialDayakathwayaOpportunities: DayakathwayaOpportunity[] = [
  {
    id: 'opp-1',
    title: 'ඉල් පුන් පොහෝ දින සජීවී විකාශන ප්‍රධාන දායකත්වය',
    description: 'එළඹෙන ඉල් පුර පසළොස්වක පොහෝ දින උදෑසන සිට සවස දක්වා විකාශය වන සජීවී බුද්ධ වන්දනාව සහ ධර්ම දේශනා මාලාවේ ප්‍රධාන දායකත්වය භාරගැනීම.',
    categoryId: 'cat-2',
    categoryTitle: 'පෝහෝ දින විශේෂ වැඩසටහනක් සඳහා දායකත්වය',
    relatedProgramId: 'prog-2',
    eventDate: '2026-11-23',
    venue: 'ඓතිහාසික රුවන්වැලිසෑ පුදබිම',
    contributionMode: 'සාකච්ඡා කර තීරණය කිරීම',
    suggestedAmount: 50000,
    availability: 'available',
    publicationStatus: 'published',
    instructions: 'ප්‍රධාන දායක පවුලේ නම් ගම් විකාශය අතරතුර තිරයේ සටහන් කර පින් අනුමෝදන් කරනු ලැබේ.',
    maxSponsors: 1,
    currentSponsorsCount: 0,
    createdAt: '2026-10-05T08:00:00.000Z',
    updatedAt: '2026-10-05T08:00:00.000Z',
  },
  {
    id: 'opp-2',
    title: 'සතිපතා සන්ධ්‍යා සද්ධර්ම දේශනාව - ප්‍රධාන අනුග්‍රාහකත්වය',
    description: 'පූජ්‍ය ගලිගමුවේ ඥාණදීප ස්වාමීන් වහන්සේගේ සතිපතා සන්ධ්‍යා සද්ධර්ම දේශනාවේ එක් දිනයක පූර්ණ දායකත්වය භාරගැනීම.',
    categoryId: 'cat-1',
    categoryTitle: 'ධර්ම දේශනා වැඩසටහනක් සඳහා දායකත්වය',
    relatedProgramId: 'prog-1',
    eventDate: '2026-10-22',
    venue: 'මෙත් රූපවාහිනී ප්‍රධාන මැදිරිය',
    contributionMode: 'නියමිත මුදල',
    suggestedAmount: 25000,
    availability: 'available',
    publicationStatus: 'published',
    instructions: 'දේශනාව අවසානයේ දායක මහත්ම මහත්මීන්ගේ මියගිය ඥාතීන්ට පින් අනුමෝදන් කිරීම සිදුකෙරේ.',
    maxSponsors: 2,
    currentSponsorsCount: 0,
    createdAt: '2026-10-06T10:00:00.000Z',
    updatedAt: '2026-10-06T10:00:00.000Z',
  },
  {
    id: 'opp-3',
    title: 'විශේෂ මෛත්‍රී භාවනා අසපුව වැඩසටහන් දායකත්වය',
    description: 'සති අන්තයේ විකාශය වන විශේෂ මනස සංසිඳුවන මෛත්‍රී භාවනා වැඩසටහනේ මාධ්‍ය නිෂ්පාදන දායකත්වය.',
    categoryId: 'cat-6',
    categoryTitle: 'රූපවාහිනී වැඩසටහන් නිෂ්පාදනය සඳහා දායකත්වය',
    relatedProgramId: 'prog-3',
    eventDate: '2026-10-30',
    venue: 'මෙත් අරණ භාවනා මධ්‍යස්ථානය',
    contributionMode: 'කැමැත්ත පරිදි',
    availability: 'available',
    publicationStatus: 'published',
    instructions: 'පුණ්‍යානුමෝදනාව සඳහා නම් ලැයිස්තුවක් ලබාදිය හැක.',
    maxSponsors: 3,
    currentSponsorsCount: 0,
    createdAt: '2026-10-07T12:00:00.000Z',
    updatedAt: '2026-10-07T12:00:00.000Z',
  }
];

export const initialDayakathwayaRequests: DayakathwayaRequest[] = [
  {
    id: 'req-1',
    referenceNumber: 'METH-DYK-2026-8001',
    applicantName: 'ධම්මික බණ්ඩාර මහතා',
    telephone: '077 123 4567',
    email: 'dhammika.b@example.com',
    categoryId: 'cat-1',
    categoryTitle: 'ධර්ම දේශනා වැඩසටහනක් සඳහා දායකත්වය',
    opportunityId: 'opp-2',
    opportunityTitle: 'සතිපතා සන්ධ්‍යා සද්ධර්ම දේශනාව - ප්‍රධාන අනුග්‍රාහකත්වය',
    proposedAmount: 25000,
    agreedAmount: 25000,
    preferredDate: '2026-10-22',
    message: 'මියගිය මව්පියන්ට පින් අනුමෝදන් කිරීමට කැමැත්තෙමි.',
    preferredContactMethod: 'දුරකථන ඇමතුම්',
    consent: true,
    requestStatus: 'සමාලෝචනය වෙමින් පවතී',
    paymentStatus: 'සත්‍යාපනය වෙමින් පවතී',
    adminNotes: 'දායක මහතා දුරකථනයෙන් සම්බන්ධ කරගන්නා ලදී. දිනය තහවුරු වෙමින් පවතී.',
    statusHistory: [
      { status: 'නව ඉල්ලීම', timestamp: '2026-10-08T11:00:00.000Z', note: 'වෙබ් අඩවියෙන් අයදුම්පත ලැබිණි.' },
      { status: 'සමාලෝචනය වෙමින් පවතී', timestamp: '2026-10-09T08:30:00.000Z', note: 'පරිපාලක විසින් සමාලෝචනය ආරම්භ කරන ලදී.' }
    ],
    createdAt: '2026-10-08T11:00:00.000Z',
    updatedAt: '2026-10-09T08:30:00.000Z',
  }
];

