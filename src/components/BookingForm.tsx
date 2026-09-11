import { useEffect, useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { halls, tariffs, tournaments, type Tournament } from '../data'

export type BookingPrefill = {
  hallId?: string
  tariffId?: string
  tournamentId?: string
}

type BookingFormProps = {
  prefill: BookingPrefill
}

const emptyForm = {
  name: '',
  phone: '',
  hallId: '',
  tariffId: '',
  date: '',
  time: '',
  tournamentId: '',
}

export function BookingForm({ prefill }: BookingFormProps) {
  const [values, setValues] = useState(emptyForm)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const selectedTournament: Tournament | undefined = tournaments.find(
    (item) => item.id === values.tournamentId,
  )

  useEffect(() => {
    setValues((current) => ({
      ...current,
      hallId: prefill.hallId ?? current.hallId,
      tariffId: prefill.tariffId ?? current.tariffId,
      tournamentId: prefill.tournamentId ?? '',
    }))
    setSent(false)
    setError('')
  }, [prefill])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !values.name.trim() ||
      !values.phone.trim() ||
      !values.hallId ||
      !values.tariffId ||
      !values.date ||
      !values.time
    ) {
      setError('Заполните имя, телефон, зал, тариф, дату и время.')
      setSent(false)
      return
    }

    setError('')
    setSent(true)
  }

  const fieldClass =
    'mt-2 w-full border border-white/20 bg-transparent px-4 py-3 font-inter text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/60'

  if (sent) {
    return (
      <div className="border border-white/10 p-6 sm:p-8">
        <p className="font-podium text-2xl uppercase tracking-tight text-white sm:text-3xl">
          Заявка принята
        </p>
        <p className="mt-4 font-inter text-sm leading-relaxed text-white/70">
          Мы свяжемся с вами, чтобы подтвердить зал и время.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false)
            setValues(emptyForm)
          }}
          className="mt-8 inline-flex items-center gap-2 border border-white/30 px-5 py-3 font-inter text-[11px] uppercase tracking-widest text-white transition hover:border-white/60 hover:bg-white/10 sm:text-xs"
        >
          Новая заявка
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-white/10 p-5 sm:p-8"
      noValidate
    >
      <p className="font-podium text-2xl uppercase tracking-tight text-white sm:text-3xl">
        Забронировать место
      </p>
      <p className="mt-3 font-inter text-sm leading-relaxed text-white/70">
        Оставьте заявку — подберём место под ваш состав.
      </p>

      <label className="mt-6 block font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
        Имя
        <input
          className={fieldClass}
          value={values.name}
          onChange={(event) => setValues({ ...values, name: event.target.value })}
          autoComplete="name"
        />
      </label>

      <label className="mt-4 block font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
        Телефон
        <input
          className={fieldClass}
          value={values.phone}
          onChange={(event) => setValues({ ...values, phone: event.target.value })}
          autoComplete="tel"
          inputMode="tel"
        />
      </label>

      <label className="mt-4 block font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
        Зал
        <select
          className={`${fieldClass} appearance-none`}
          value={values.hallId}
          onChange={(event) => setValues({ ...values, hallId: event.target.value })}
        >
          <option value="">Выберите зал</option>
          {halls.map((hall) => (
            <option key={hall.id} value={hall.id} className="bg-black">
              {hall.title}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
        Тариф
        <select
          className={`${fieldClass} appearance-none`}
          value={values.tariffId}
          onChange={(event) => setValues({ ...values, tariffId: event.target.value })}
        >
          <option value="">Выберите тариф</option>
          {tariffs.map((tariff) => (
            <option key={tariff.id} value={tariff.id} className="bg-black">
              {tariff.name} — {tariff.price}/{tariff.unit}
            </option>
          ))}
        </select>
      </label>

      {selectedTournament && (
        <div className="mt-4 border border-white/10 px-4 py-3">
          <p className="font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
            Турнир
          </p>
          <p className="mt-1 font-inter text-sm text-white">
            {selectedTournament.game} · {selectedTournament.title}
          </p>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
          Дата
          <input
            type="date"
            className={fieldClass}
            value={values.date}
            onChange={(event) => setValues({ ...values, date: event.target.value })}
          />
        </label>
        <label className="block font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
          Время
          <input
            type="time"
            className={fieldClass}
            value={values.time}
            onChange={(event) => setValues({ ...values, time: event.target.value })}
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 font-inter text-sm text-red-400">{error}</p>
      ) : null}

      <button
        type="submit"
        className="group mt-8 inline-flex w-full items-center justify-center gap-2 border border-white/30 px-5 py-3 font-inter text-[11px] uppercase tracking-widest text-white transition hover:border-white/60 hover:bg-white/10 sm:w-auto sm:text-xs"
      >
        Отправить заявку
        <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </form>
  )
}
