import { useState } from 'react'

export default function SearchForm({ onSearch }) {
  const today = new Date().toISOString().slice(0, 10)
  const [origin, setOrigin] = useState('IKA')
  const [destination, setDestination] = useState('MHD')
  const [date, setDate] = useState(today)

  const submit = (e) => {
    e.preventDefault()
    if (!origin || !destination || !date) return
    const when = new Date(date)
    onSearch({ origin, destination, date: when.toISOString() })
  }

  return (
    <form onSubmit={submit} className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-3">
      <div className="flex-1">
        <label className="block text-sm text-blue-200 mb-1">مبدا (IATA)</label>
        <input value={origin} onChange={(e)=>setOrigin(e.target.value.toUpperCase())} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700" placeholder="IKA" />
      </div>
      <div className="flex-1">
        <label className="block text-sm text-blue-2 00 mb-1">مقصد (IATA)</label>
        <input value={destination} onChange={(e)=>setDestination(e.target.value.toUpperCase())} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700" placeholder="MHD" />
      </div>
      <div className="flex-1">
        <label className="block text-sm text-blue-200 mb-1">تاریخ</label>
        <input type="date" value={date} min={today} onChange={(e)=>setDate(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700" />
      </div>
      <div className="flex items-end">
        <button className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">جستجوی پرواز</button>
      </div>
    </form>
  )
}
