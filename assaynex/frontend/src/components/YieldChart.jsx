import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function YieldChart({ yields }) {
  const data = Object.entries(yields || {}).map(([name, value]) => ({ name, value }))
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#0f766e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
