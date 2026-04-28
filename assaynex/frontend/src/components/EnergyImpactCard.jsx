export default function EnergyImpactCard({ energy }) {
  if (!energy) return null
  return (
    <div className="rounded bg-white p-4 shadow">
      <h3 className="mb-2 text-lg font-bold">Impacto Energético</h3>
      <p>ΔT: {energy.delta_t_c} °C</p>
      <p>Cp: {energy.cp_kj_kgk} kJ/kg·K</p>
      <p>Q: {energy.q_kj_h} kJ/h</p>
    </div>
  )
}
