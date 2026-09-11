import { ArrowUpRight, X } from 'lucide-react'
import type { Tournament } from '../data'
import { Modal } from './Modal'

type TournamentModalProps = {
  tournament: Tournament | null
  onClose: () => void
  onRegister: (tournamentId: string) => void
}

export function TournamentModal({
  tournament,
  onClose,
  onRegister,
}: TournamentModalProps) {
  return (
    <Modal
      open={Boolean(tournament)}
      onClose={onClose}
      labelledBy="tournament-modal-title"
    >
      {tournament && (
        <div className="px-5 py-4 sm:px-8 sm:py-6">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
              {tournament.game}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <h2
            id="tournament-modal-title"
            className="mt-6 font-podium text-3xl uppercase tracking-tight text-white sm:text-4xl"
          >
            {tournament.title}
          </h2>
          <p className="mt-2 font-inter text-sm text-white/70">{tournament.date}</p>
          <p className="mt-6 font-inter text-3xl font-bold tracking-tight text-white">
            {tournament.prize}
          </p>
          <p className="mt-1 font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
            Призовой фонд
          </p>

          <dl className="mt-8 space-y-4 border-t border-white/10 pt-6 font-inter text-sm">
            <div>
              <dt className="uppercase tracking-widest text-white/40">Формат</dt>
              <dd className="mt-1 text-white">{tournament.format}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-white/40">Состав</dt>
              <dd className="mt-1 text-white">{tournament.roster}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-white/40">Карты</dt>
              <dd className="mt-1 text-white">{tournament.maps}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-white/40">
                Дедлайн регистрации
              </dt>
              <dd className="mt-1 text-white">{tournament.deadline}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-white/40">Регламент</dt>
              <dd className="mt-2 leading-relaxed text-white/70">{tournament.rules}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => onRegister(tournament.id)}
            className="group mt-8 inline-flex items-center gap-2 border border-white/30 px-5 py-3 font-inter text-[11px] uppercase tracking-widest text-white transition hover:border-white/60 hover:bg-white/10 sm:text-xs"
          >
            Записаться
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
    </Modal>
  )
}
