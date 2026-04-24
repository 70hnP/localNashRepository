export default function CrudeComparisonTable({ deltas }) {
  if (!deltas) return null
  return (
    <div className="rounded bg-white p-4 shadow">
      <h3 className="mb-2 text-lg font-bold">Comparación de Yields</h3>
      <table className="w-full text-sm">
        <thead><tr><th className="text-left">Corte</th><th className="text-right">Δ Yield %</th></tr></thead>
        <tbody>
          {Object.entries(deltas).map(([cut, value]) => (
            <tr key={cut} className="border-t"><td>{cut}</td><td className="text-right">{value}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
