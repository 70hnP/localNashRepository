import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import client from './api/client'
import FileUploader from './components/FileUploader'
import YieldChart from './components/YieldChart'
import RecommendationPanel from './components/RecommendationPanel'
import EnergyImpactCard from './components/EnergyImpactCard'
import CrudeComparisonTable from './components/CrudeComparisonTable'

const initialMeta = {
  crude_name: 'Crude A', api: 35, sulfur_wt_pct: 1.2, viscosity_cst: 6,
  fot_current: 360, fot_base: 350, reflux_current: 1.2, mass_flow_kg_h: 120000,
}

export default function App() {
  const [file, setFile] = useState(null)
  const [newFile, setNewFile] = useState(null)
  const [meta, setMeta] = useState(initialMeta)
  const [newMeta, setNewMeta] = useState({ ...initialMeta, crude_name: 'Crude B', api: 25 })
  const [analysis, setAnalysis] = useState(null)
  const [comparison, setComparison] = useState(null)

  const analyze = async () => {
    const formData = new FormData()
    formData.append('assay_file', file)
    formData.append('metadata', JSON.stringify(meta))
    const { data } = await client.post('/api/assay/analyze', formData)
    setAnalysis(data)
  }

  const compare = async () => {
    const formData = new FormData()
    formData.append('current_file', file)
    formData.append('new_file', newFile)
    formData.append('current_metadata', JSON.stringify(meta))
    formData.append('new_metadata', JSON.stringify(newMeta))
    const { data } = await client.post('/api/assay/compare', formData)
    setComparison(data)
  }

  const exportPdf = async () => {
    const { data } = await client.post('/api/report/pdf', analysis, { responseType: 'blob' })
    const url = window.URL.createObjectURL(data)
    const a = document.createElement('a')
    a.href = url
    a.download = 'assaynex_report.pdf'
    a.click()
  }

  const formField = (k, value, setter = setMeta) => (
    <input className="rounded border p-2" value={value} onChange={(e) => setter((prev) => ({ ...prev, [k]: Number.isFinite(prev[k]) ? Number(e.target.value) : e.target.value }))} />
  )

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-800">
      <h1 className="mb-6 text-3xl font-bold">ASSAYNEX Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded bg-white p-4 shadow">
          <FileUploader label="Assay actual" onChange={setFile} />
          <FileUploader label="Assay nuevo" onChange={setNewFile} />
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(meta).map(([k, v]) => <div key={k}>{formField(k, v)}</div>)}
          </div>
          <div className="flex gap-2">
            <button className="rounded bg-teal-700 px-3 py-2 text-white" onClick={analyze} disabled={!file}>Analizar</button>
            <button className="rounded bg-slate-700 px-3 py-2 text-white" onClick={compare} disabled={!file || !newFile}>Comparar</button>
            <button className="rounded bg-indigo-700 px-3 py-2 text-white" onClick={exportPdf} disabled={!analysis}>Exportar PDF</button>
          </div>
        </div>

        {analysis && (
          <div className="space-y-4">
            <div className="rounded bg-white p-4 shadow">
              <h3 className="mb-2 text-lg font-bold">Curva TBP</h3>
              <div className="h-64">
                <ResponsiveContainer>
                  <LineChart data={analysis.tbp_interpolation}>
                    <XAxis dataKey="temperature_c" /><YAxis /><Tooltip />
                    <Line dataKey="cumulative_volume_pct" stroke="#2563eb" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <YieldChart yields={analysis.yields} />
            <EnergyImpactCard energy={analysis.energy_impact} />
            <RecommendationPanel recommendations={analysis.recommendations} />
          </div>
        )}
      </div>

      {comparison && <div className="mt-6"><CrudeComparisonTable deltas={comparison.delta_yields} /></div>}
    </div>
  )
}
