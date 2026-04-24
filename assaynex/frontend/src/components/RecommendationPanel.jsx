export default function RecommendationPanel({ recommendations }) {
  if (!recommendations) return null
  return (
    <div className="rounded bg-white p-4 shadow">
      <h3 className="mb-2 text-lg font-bold">Recomendaciones</h3>
      <p>FOT recomendado: <strong>{recommendations.fot_recommended} °C</strong></p>
      <p>Reflux recomendado: <strong>{recommendations.reflux_recommended}</strong></p>
      <p>Confidence score: <strong>{recommendations.confidence_score}</strong></p>
      <ul className="mt-2 list-disc pl-6 text-sm text-amber-700">
        {(recommendations.warnings || []).map((w) => <li key={w}>{w}</li>)}
      </ul>
      <p className="mt-3 text-xs text-slate-500">{recommendations.disclaimer}</p>
    </div>
  )
}
