export default function FileUploader({ label, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <input className="w-full rounded border p-2" type="file" accept=".csv,.xlsx,.xls" onChange={(e) => onChange(e.target.files?.[0] || null)} />
    </div>
  )
}
