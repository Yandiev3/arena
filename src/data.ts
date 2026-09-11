const hallPhoto = (file: string) =>
  `${import.meta.env.BASE_URL}halls/${file}`

export type HallIcon = 'monitor' | 'crown' | 'award'
export type TournamentIcon = 'award' | 'crown' | 'gamepad'

export type Hall = {
  id: string
  title: string
  icon: HallIcon
  spec: string
  text: string
  seats: number
  price: string
  photos: string[]
  specs: {
    cpu: string
    gpu: string
    ram: string
    monitor: string
    peripherals: string
  }
}

export type Tariff = {
  id: string
  name: string
  price: string
  unit: string
  note: string
  hallId: string
}

export type Tournament = {
  id: string
  icon: TournamentIcon
  game: string
  title: string
  date: string
  prize: string
  format: string
  roster: string
  maps: string
  deadline: string
  rules: string
  hallId: string
}

export const halls: Hall[] = [
  {
    id: 'main',
    title: 'Основной',
    icon: 'monitor',
    spec: 'RTX 5070 · 240Hz',
    text: '40 мест, комфортный свет и стабильный пинг. Идеально для соло и пати.',
    seats: 40,
    price: '180 ₽/час',
    photos: [hallPhoto('main-1.jpg'), hallPhoto('main-2.jpg')],
    specs: {
      cpu: 'AMD Ryzen 7 5700X',
      gpu: 'NVIDIA GeForce RTX 5070 12GB',
      ram: '32 GB DDR4 3600',
      monitor: '27" 240Hz, 1ms, 2560×1440',
      peripherals: 'HyperX Alloy, Logitech G Pro X Superlight',
    },
  },
  {
    id: 'vip',
    title: 'VIP',
    icon: 'crown',
    spec: 'RTX 5080 · 360Hz',
    text: '12 приватных кабин, тишина, кожаные кресла и отдельный бар-сервис.',
    seats: 12,
    price: '400 ₽/час',
    photos: [hallPhoto('vip-1.jpg'), hallPhoto('vip-2.jpg')],
    specs: {
      cpu: 'Intel Core i7-14700K',
      gpu: 'NVIDIA GeForce RTX 5080 Super',
      ram: '64 GB DDR5 6000',
      monitor: '27" 360Hz OLED, 2560×1440',
      peripherals: 'Wooting 80HE, Logitech G Pro X 2',
    },
  },
  {
    id: 'tournament',
    title: 'Турнирный',
    icon: 'award',
    spec: 'Командные места',
    text: '16 ПК для составов: общая связь, стримерская зона и судейский стол.',
    seats: 16,
    price: '250 ₽/час',
    photos: [hallPhoto('tournament-1.jpg'), hallPhoto('tournament-2.jpg')],
    specs: {
      cpu: 'AMD Ryzen 7 7700X',
      gpu: 'NVIDIA GeForce RTX 5070 Ti',
      ram: '32 GB DDR5 5600',
      monitor: '24.5" 360Hz, 1920×1080',
      peripherals: 'TeamSpeak + судейский стол, стримерская камера',
    },
  },
]

export const tariffs: Tariff[] = [
  {
    id: 'standard',
    name: 'Стандарт',
    price: '180 ₽',
    unit: 'час',
    note: 'Основной зал',
    hallId: 'main',
  },
  {
    id: 'prime',
    name: 'Прайм',
    price: '250 ₽',
    unit: 'час',
    note: 'Прайм-тайм 18:00–00:00',
    hallId: 'tournament',
  },
  {
    id: 'vip',
    name: 'VIP',
    price: '400 ₽',
    unit: 'час',
    note: 'Кабина + сервис',
    hallId: 'vip',
  },
  {
    id: 'night',
    name: 'Ночной',
    price: '1 200 ₽',
    unit: 'пакет',
    note: '00:00–08:00',
    hallId: 'main',
  },
]

export const tournaments: Tournament[] = [
  {
    id: 'arena-open',
    icon: 'award',
    game: 'CS2',
    title: 'ARENA Open',
    date: '20 сентября',
    prize: '150 000 ₽',
    format: 'Single Elimination, BO1 до полуфинала, финал BO3',
    roster: '5 + 1 запасной',
    maps: 'Ancient, Anubis, Inferno, Mirage, Nuke, Overpass, Vertigo',
    deadline: '18 сентября, 23:59',
    hallId: 'tournament',
    rules:
      'Регистрация составом 5+1. Чит-софт и smurf-аккаунты — дисквалификация без возврата взноса. Паузы только по согласованию с судьёй, не более 10 минут на матч. Трансляция с арены обязательна для полуфинала и финала. Взнос 2 000 ₽ с команды.',
  },
  {
    id: 'clash-cup',
    icon: 'crown',
    game: 'Dota 2',
    title: 'Clash Cup',
    date: '4 октября',
    prize: '200 000 ₽',
    format: 'Double Elimination, BO3 с верхней сетки, гранд-финал BO5',
    roster: '5 игроков',
    maps: 'Captain’s Mode, стандартный драфт',
    deadline: '2 октября, 23:59',
    hallId: 'tournament',
    rules:
      'Только ranked MMR от 5 000 на роли. Замены после старта сетки запрещены. Технические паузы — до 5 минут, далее судья может засчитать тех. поражение. Призовые выплачиваются в течение 7 дней после финала. Взнос 3 000 ₽ с команды.',
  },
  {
    id: 'night-series',
    icon: 'gamepad',
    game: 'Valorant',
    title: 'Night Series',
    date: '18 октября',
    prize: '80 000 ₽',
    format: 'Swiss до 3 побед, плей-офф BO3',
    roster: '5 игроков',
    maps: 'Abyss, Bind, Haven, Lotus, Split, Sunset',
    deadline: '16 октября, 23:59',
    hallId: 'tournament',
    rules:
      'Ночной слот: чекин с 21:00, первый матч в 22:00. Vanguard обязателен. Оверлей Discord с судьёй. Античит проверяется до старта. Взнос 1 500 ₽ с команды. Победитель получает приоритетный букинг VIP на месяц.',
  },
]
