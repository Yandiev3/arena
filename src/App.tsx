import { useEffect, useState, type ComponentType } from 'react'
import {
  ArrowUpRight,
  Award,
  Clock,
  Crown,
  Gamepad2,
  MapPin,
  Monitor,
  Phone,
  X,
} from 'lucide-react'
import { BookingForm, type BookingPrefill } from './components/BookingForm'
import { HallModal } from './components/HallModal'
import { TournamentModal } from './components/TournamentModal'
import {
  halls,
  tariffs,
  tournaments,
  type HallIcon,
  type TournamentIcon,
} from './data'

const VIDEO_SRC = '../public/halls/arena.mp4'

const NAV_LINKS = [
  { href: '#halls', label: 'Залы' },
  { href: '#tariffs', label: 'Тарифы' },
  { href: '#tournaments', label: 'Турниры' },
  { href: '#contact', label: 'Контакты' },
] as const

const HALL_ICONS: Record<HallIcon, ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  crown: Crown,
  award: Award,
}

const TOURNAMENT_ICONS: Record<
  TournamentIcon,
  ComponentType<{ className?: string }>
> = {
  award: Award,
  crown: Crown,
  gamepad: Gamepad2,
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedHallId, setSelectedHallId] = useState<string | null>(null)
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(
    null,
  )
  const [prefill, setPrefill] = useState<BookingPrefill>({})

  const selectedHall = halls.find((hall) => hall.id === selectedHallId) ?? null
  const selectedTournament =
    tournaments.find((item) => item.id === selectedTournamentId) ?? null
  const overlayOpen = menuOpen || Boolean(selectedHall) || Boolean(selectedTournament)

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [overlayOpen])

  function goToBooking(next: BookingPrefill) {
    setSelectedHallId(null)
    setSelectedTournamentId(null)
    setMenuOpen(false)
    setPrefill(next)
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <div className="bg-black font-inter text-white">
      <section className="relative min-h-[100svh] lg:h-[100svh] lg:min-h-0 lg:overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-black">
          <video
            className="hero-video pointer-events-none absolute"
            autoPlay
            muted
            loop
            playsInline
            src={VIDEO_SRC}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/25 md:bg-black/40" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/30 md:via-black/20 md:to-black/50" />
        </div>

        <div className="relative z-10 flex min-h-[100svh] flex-col lg:h-full lg:min-h-0">
          <nav className="relative z-20 flex shrink-0 items-center justify-between px-4 py-4 sm:px-10 sm:py-5 lg:px-16 lg:py-5">
            <a
              href="#"
              className="font-podium text-xl font-bold uppercase tracking-wider text-white sm:text-2xl md:text-3xl"
            >
              ARENA
            </a>

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 md:flex lg:gap-12">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-inter text-sm uppercase tracking-widest text-white/80 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="hidden shrink-0 items-center gap-2 border border-white/30 px-6 py-3 font-inter text-xs uppercase tracking-widest text-white transition hover:border-white/60 hover:bg-white/10 md:inline-flex"
            >
              Связаться
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              className="shrink-0 space-y-1.5 md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
            >
              <div className="h-0.5 w-6 bg-white" />
              <div className="h-0.5 w-6 bg-white" />
              <div className="h-0.5 w-4 bg-white" />
            </button>
          </nav>

          <div className="flex min-h-0 flex-1 flex-col justify-center px-4 py-6 sm:px-10 sm:py-8 lg:px-16 lg:py-6">
            <div className="animate-fade-up mb-3 flex items-center gap-2 sm:mb-5 lg:mb-4">
              <Crown className="h-4 w-4 shrink-0 text-white/70" />
              <p className="font-inter text-[10px] uppercase tracking-[0.15em] text-white/70 sm:text-xs sm:tracking-[0.3em] md:text-sm">
                Киберспортивный компьютерный клуб
              </p>
            </div>

            <h1 className="hero-title animate-fade-up-delay-1 font-podium uppercase leading-[0.92] tracking-tight text-white">
              Играй.
              <br />
              Побеждай.
              <br />
              Доминируй.
            </h1>

            <p className="animate-fade-up-delay-2 mt-4 max-w-md font-inter text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-base lg:mt-5">
              Топовое железо и атмосфера, которые не просто заводят —{' '}
              <span className="font-semibold text-white">здесь побеждают.</span>
            </p>

            <div className="animate-fade-up-delay-3 mt-5 flex flex-wrap items-center gap-4 sm:mt-6 sm:gap-6 lg:mt-6">
              <a
                href="#halls"
                className="group inline-flex items-center gap-2 bg-black px-5 py-3 font-inter text-[11px] uppercase tracking-widest text-white transition hover:bg-neutral-900 sm:px-7 sm:py-4 sm:text-xs"
              >
                Смотреть залы
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <div className="hidden items-center gap-3 sm:flex">
                <Award className="h-8 w-8 text-white/50" />
                <div className="font-inter text-xs uppercase tracking-wider text-white/60">
                  <p>Топ-рейтинг</p>
                  <p>Киберклуб</p>
                </div>
              </div>
            </div>

            <div className="animate-fade-up-delay-4 mt-6 flex flex-wrap gap-4 sm:mt-8 sm:gap-12 lg:mt-8 lg:gap-16">
              {[
                { value: '80+', label: 'Игровых мест' },
                { value: '240Hz', label: 'Мониторы' },
                { value: '24/7', label: 'Работаем' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-inter text-xl font-bold tracking-tight text-white sm:text-4xl lg:text-4xl xl:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        className={`fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
          menuOpen
            ? 'visible pointer-events-auto opacity-100'
            : 'invisible pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 sm:px-10 sm:py-5">
          <span className="font-podium text-xl font-bold uppercase tracking-wider text-white sm:text-3xl">
            ARENA
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Закрыть меню"
            className="text-white"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="flex min-h-[calc(100svh-72px)] flex-col items-center justify-center gap-5 px-4 py-8 sm:gap-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-podium text-3xl uppercase text-white transition-all duration-500 sm:text-4xl md:text-5xl"
              style={{
                transitionDelay: `${i * 80 + 100}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center gap-2 border border-white/30 px-6 py-3 font-inter text-xs uppercase tracking-widest text-white transition-all duration-500 hover:border-white/60 hover:bg-white/10"
            style={{
              transitionDelay: `${NAV_LINKS.length * 80 + 100}ms`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Связаться
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <section
        id="halls"
        className="border-t border-white/10 px-4 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
      >
        <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs sm:tracking-[0.3em]">
          Игровые зоны
        </p>
        <h2 className="mt-3 font-podium text-3xl uppercase tracking-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
          Залы
        </h2>
        <p className="mt-4 max-w-xl font-inter text-sm leading-relaxed text-white/70 sm:text-base">
          Три пространства под любой темп: от казуальной сессии до буткемпа перед
          турниром.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-3">
          {halls.map((hall) => {
            const Icon = HALL_ICONS[hall.icon]
            return (
              <article
                key={hall.id}
                className="flex flex-col border border-white/10 transition hover:border-white/30"
              >
                <button
                  type="button"
                  onClick={() => setSelectedHallId(hall.id)}
                  className="text-left"
                >
                  <img
                    src={hall.photos[0]}
                    alt=""
                    className="h-40 w-full object-cover sm:h-48"
                  />
                  <div className="p-5 sm:p-8">
                    <Icon className="h-8 w-8 text-white/70" />
                    <h3 className="mt-5 font-podium text-2xl uppercase tracking-tight text-white sm:mt-6 sm:text-3xl">
                      {hall.title}
                    </h3>
                    <p className="mt-2 font-inter text-xs uppercase tracking-widest text-white/50">
                      {hall.spec}
                    </p>
                    <p className="mt-4 font-inter text-sm leading-relaxed text-white/70">
                      {hall.text}
                    </p>
                  </div>
                </button>
                <div className="mt-auto px-5 pb-5 sm:px-8 sm:pb-8">
                  <button
                    type="button"
                    onClick={() => setSelectedHallId(hall.id)}
                    className="group inline-flex items-center gap-2 font-inter text-[11px] uppercase tracking-widest text-white/80 transition hover:text-white sm:text-xs"
                  >
                    Подробнее
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section
        id="tariffs"
        className="border-t border-white/10 px-4 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
      >
        <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs sm:tracking-[0.3em]">
          Стоимость
        </p>
        <h2 className="mt-3 font-podium text-3xl uppercase tracking-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
          Тарифы
        </h2>
        <p className="mt-4 max-w-xl font-inter text-sm leading-relaxed text-white/70 sm:text-base">
          Час, пакет или вся ночь — выбирайте темп, железо уже прогрето.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {tariffs.map((tariff) => (
            <article
              key={tariff.id}
              className="flex flex-col border border-white/10 p-5 sm:p-8"
            >
              <h3 className="font-podium text-xl uppercase tracking-tight text-white sm:text-2xl">
                {tariff.name}
              </h3>
              <p className="mt-6 font-inter text-4xl font-bold tracking-tight text-white lg:text-5xl">
                {tariff.price}
              </p>
              <p className="mt-1 font-inter text-xs uppercase tracking-widest text-white/50">
                / {tariff.unit}
              </p>
              <p className="mt-4 flex-1 font-inter text-sm text-white/70">
                {tariff.note}
              </p>
              <button
                type="button"
                onClick={() =>
                  goToBooking({ hallId: tariff.hallId, tariffId: tariff.id })
                }
                className="group mt-8 inline-flex items-center gap-2 border border-white/30 px-5 py-3 font-inter text-[11px] uppercase tracking-widest text-white transition hover:border-white/60 hover:bg-white/10 sm:text-xs"
              >
                Забронировать
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section
        id="tournaments"
        className="border-t border-white/10 px-4 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
      >
        <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs sm:tracking-[0.3em]">
          Киберспорт
        </p>
        <h2 className="mt-3 font-podium text-3xl uppercase tracking-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
          Турниры
        </h2>
        <p className="mt-4 max-w-xl font-inter text-sm leading-relaxed text-white/70 sm:text-base">
          Еженедельные сетки, призовые и лайв-трансляции с арены.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-3">
          {tournaments.map((event) => {
            const Icon = TOURNAMENT_ICONS[event.icon]
            return (
              <article
                key={event.id}
                className="flex flex-col border border-white/10 transition hover:border-white/30"
              >
                <button
                  type="button"
                  onClick={() => setSelectedTournamentId(event.id)}
                  className="flex flex-1 flex-col p-5 text-left sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-white/70" />
                    <span className="font-inter text-xs uppercase tracking-widest text-white/50">
                      {event.game}
                    </span>
                  </div>
                  <h3 className="mt-6 font-podium text-2xl uppercase tracking-tight text-white sm:text-3xl">
                    {event.title}
                  </h3>
                  <p className="mt-3 font-inter text-sm text-white/70">{event.date}</p>
                  <p className="mt-6 font-inter text-2xl font-bold tracking-tight text-white">
                    {event.prize}
                  </p>
                  <p className="mt-1 font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
                    Призовой фонд
                  </p>
                </button>
                <div className="px-5 pb-5 sm:px-8 sm:pb-8">
                  <button
                    type="button"
                    onClick={() => setSelectedTournamentId(event.id)}
                    className="group inline-flex items-center gap-2 font-inter text-[11px] uppercase tracking-widest text-white/80 transition hover:text-white sm:text-xs"
                  >
                    Подробнее
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-white/10 px-4 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
      >
        <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs sm:tracking-[0.3em]">
          Бронь и вопросы
        </p>
        <h2 className="mt-3 font-podium text-3xl uppercase tracking-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
          Контакты
        </h2>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-white/70" />
              <div>
                <p className="font-inter text-xs uppercase tracking-widest text-white/50">
                  Адрес
                </p>
                <p className="mt-1 font-inter text-base text-white sm:text-lg">
                  ул. Тверская, 12, Москва
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-white/70" />
              <div>
                <p className="font-inter text-xs uppercase tracking-widest text-white/50">
                  Телефон
                </p>
                <a
                  href="tel:+74950000000"
                  className="mt-1 block font-inter text-base text-white transition hover:text-white/80 sm:text-lg"
                >
                  +7 (495) 000-00-00
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-white/70" />
              <div>
                <p className="font-inter text-xs uppercase tracking-widest text-white/50">
                  Часы работы
                </p>
                <p className="mt-1 font-inter text-base text-white sm:text-lg">
                  24/7 — без выходных
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Gamepad2 className="mt-1 h-5 w-5 shrink-0 text-white/70" />
              <div>
                <p className="font-inter text-xs uppercase tracking-widest text-white/50">
                  Telegram
                </p>
                <a
                  href="https://t.me/arena_club"
                  className="mt-1 block font-inter text-base text-white transition hover:text-white/80 sm:text-lg"
                >
                  @arena_club
                </a>
              </div>
            </div>
          </div>

          <BookingForm prefill={prefill} />
        </div>
      </section>

      <footer className="flex flex-col items-start justify-between gap-4 border-t border-white/10 px-4 py-8 sm:flex-row sm:items-center sm:px-10 lg:px-16">
        <span className="font-podium text-xl uppercase tracking-wider text-white">
          ARENA
        </span>
        <p className="font-inter text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
          © {new Date().getFullYear()} Киберспортивный компьютерный клуб
        </p>
      </footer>

      <HallModal
        hall={selectedHall}
        onClose={() => setSelectedHallId(null)}
        onBook={(hallId) => goToBooking({ hallId })}
      />
      <TournamentModal
        tournament={selectedTournament}
        onClose={() => setSelectedTournamentId(null)}
        onRegister={(tournamentId) => {
          const event = tournaments.find((item) => item.id === tournamentId)
          goToBooking({
            tournamentId,
            hallId: event?.hallId,
            tariffId: 'prime',
          })
        }}
      />
    </div>
  )
}

export default App
