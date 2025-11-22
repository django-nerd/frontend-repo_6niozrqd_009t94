import { useState } from 'react'

export default function BookingModal({ flight, onClose, onConfirm }) {
  const [contactEmail, setContactEmail] = useState('test@example.com')
  const [passengers, setPassengers] = useState([{ first_name: 'نام', last_name: 'نام‌خانوادگی', email: 'test@example.com', document_number: '' }])
  const addPassenger = () => setPassengers(p => [...p, { first_name: '', last_name: '', email: '', document_number: '' }])
  const updatePassenger = (idx, key, val) => setPassengers(p => p.map((x,i)=> i===idx? { ...x, [key]: val } : x))

  const submit = () => {
    if (!contactEmail || passengers.length === 0) return
    onConfirm({ contact_email: contactEmail, passengers })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-blue-500/20 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-lg font-semibold">رزرو پرواز {flight.flight_number}</h3>
          <button onClick={onClose} className="text-blue-200">بستن</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">ایمیل تماس</label>
            <input value={contactEmail} onChange={e=>setContactEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-800 text-white border border-slate-700" />
          </div>
        </div>

        <div className="space-y-3">
          {passengers.map((p, idx) => (
            <div key={idx} className="grid md:grid-cols-4 gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700">
              <input value={p.first_name} onChange={e=>updatePassenger(idx,'first_name',e.target.value)} placeholder="نام" className="px-3 py-2 rounded-lg bg-slate-900 text-white border border-slate-700" />
              <input value={p.last_name} onChange={e=>updatePassenger(idx,'last_name',e.target.value)} placeholder="نام‌خانوادگی" className="px-3 py-2 rounded-lg bg-slate-900 text-white border border-slate-700" />
              <input value={p.email} onChange={e=>updatePassenger(idx,'email',e.target.value)} placeholder="ایمیل" className="px-3 py-2 rounded-lg bg-slate-900 text-white border border-slate-700" />
              <input value={p.document_number} onChange={e=>updatePassenger(idx,'document_number',e.target.value)} placeholder="شماره مدرک" className="px-3 py-2 rounded-lg bg-slate-900 text-white border border-slate-700" />
            </div>
          ))}
          <button onClick={addPassenger} className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-600">افزودن مسافر</button>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-600">انصراف</button>
          <button onClick={submit} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white">تایید رزرو</button>
        </div>
      </div>
    </div>
  )
}
