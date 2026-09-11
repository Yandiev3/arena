import { ArrowUpRight, X } from 'lucide-react'
import type { Hall } from '../data'
import { Modal } from './Modal'

type HallModalProps = {
  hall: Hall | null
  onClose: () => void
  onBook: (hallId: string) => void
}

export function HallModal({ hall, onClose, onBook }: HallModalProps) {
  return (
    <Modal open={Boolean(hall)} onClose={onClose} labelledBy="hall-modal-title">
      {hall && (
        <>
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
              Зал
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

          <div className="grid gap-2 px-5 sm:grid-cols-2 sm:px-8">
            {hall.photos.map((src) => (
              <img
                key={src}
                src={src}
                alt={hall.title}
                className="h-40 w-full object-cover sm:h-48"
              />
            ))}
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <h2
              id="hall-modal-title"
              className="font-podium text-3xl uppercase tracking-tight text-white sm:text-4xl"
            >
              {hall.title}
            </h2>
            <p className="mt-2 font-inter text-xs uppercase tracking-widest text-white/50">
              {hall.spec} · {hall.seats} мест · {hall.price}
            </p>
            <p className="mt-4 font-inter text-sm leading-relaxed text-white/70">
              {hall.text}
            </p>

            <dl className="mt-8 space-y-3 border-t border-white/10 pt-6 font-inter text-sm">
              {(
                [
                  ['CPU', hall.specs.cpu],
                  ['GPU', hall.specs.gpu],
                  ['RAM', hall.specs.ram],
                  ['Монитор', hall.specs.monitor],
                  ['Периферия', hall.specs.peripherals],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                  <dt className="w-28 shrink-0 uppercase tracking-widest text-white/40">
                    {label}
                  </dt>
                  <dd className="text-white">{value}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => onBook(hall.id)}
              className="group mt-8 inline-flex items-center gap-2 border border-white/30 px-5 py-3 font-inter text-[11px] uppercase tracking-widest text-white transition hover:border-white/60 hover:bg-white/10 sm:text-xs"
            >
              Забронировать
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
