export default function FlightList({ flights, onBook, loading }) {
  if (loading) {
    return <div className="text-blue-200">در حال جستجو...</div>
  }
  if (!flights || flights.length === 0) {
    return <div className="text-blue-200">پروازی یافت نشد.</div>
  }
  return (
    <div className="space-y-3">
      {flights.map(f => (
        <div key={f._id} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-white font-semibold">{f.origin} → {f.destination} • {f.flight_number}</div>
            <div className="text-blue-200 text-sm">
              خروج: {new Date(f.departure_time).toLocaleString()} • ورود: {new Date(f.arrival_time).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-white font-bold">${'{'}f.price{'}'}</div>
            <button onClick={() => onBook(f)} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition">رزرو</button>
          </div>
        </div>
      ))}
    </div>
  )
}
