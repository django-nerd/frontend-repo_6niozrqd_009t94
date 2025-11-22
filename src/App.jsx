import { useEffect, useState } from 'react'
import SearchForm from './components/SearchForm'
import FlightList from './components/FlightList'
import BookingModal from './components/BookingModal'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')

  const onSearch = async (q) => {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${API_BASE}/api/flights/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(q)
      })
      const data = await res.json()
      setFlights(data)
    } catch (e) {
      setMessage('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  const onBook = (f) => setSelected(f)

  const confirmBooking = async ({ contact_email, passengers }) => {
    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flight_id: selected._id, contact_email, passengers })
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('رزرو با موفقیت انجام شد. کد: ' + data.booking_id)
        setSelected(null)
        // refresh list to show updated seats
        const when = new Date(selected.departure_time)
        await onSearch({ origin: selected.origin, destination: selected.destination, date: when.toISOString() })
      } else {
        setMessage(data.detail || 'خطا در رزرو')
      }
    } catch (e) {
      setMessage('خطا در رزرو')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6 md:p-10 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">سامانه رزرو پرواز</h1>
          <p className="text-blue-200">جستجو، مشاهده و رزرو پروازهای داخلی</p>
        </div>

        <SearchForm onSearch={onSearch} />

        {message && (
          <div className="mt-4 p-3 rounded-xl bg-slate-800/60 border border-blue-500/20 text-blue-200">{message}</div>
        )}

        <div className="mt-6">
          <FlightList flights={flights} onBook={onBook} loading={loading} />
        </div>

        {selected && (
          <BookingModal flight={selected} onClose={() => setSelected(null)} onConfirm={confirmBooking} />
        )}
      </div>
    </div>
  )
}

export default App
