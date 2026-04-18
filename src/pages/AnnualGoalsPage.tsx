import { useState } from 'react';
import { AnnualGoal } from '../types';
import { EmptyState } from '../components/EmptyState';

interface Props {
  annualGoals: AnnualGoal[];
  onSave: (annualGoals: AnnualGoal[]) => void;
}

export function AnnualGoalsPage({ annualGoals, onSave }: Props) {
  const [error, setError] = useState('');
  const [form, setForm] = useState({ year: '2026', title: '', metricName: '', targetValue: '', actualValue: '', weight: '0.2' });

  const submit = () => {
    setError('');
    if (!form.title.trim() || !form.metricName.trim()) return setError('Título y métrica son obligatorios.');
    const target = Number(form.targetValue);
    const actual = Number(form.actualValue);
    const weight = Number(form.weight);
    if ([target, actual, weight].some((n) => Number.isNaN(n))) return setError('Valores numéricos inválidos.');
    if (weight <= 0 || weight > 1) return setError('Weight debe ser >0 y <=1.');

    const newGoal: AnnualGoal = {
      id: `goal-${crypto.randomUUID()}`,
      year: Number(form.year),
      title: form.title.trim(),
      metricName: form.metricName.trim(),
      targetValue: target,
      actualValue: actual,
      weight,
      status: 'planned'
    };
    onSave([newGoal, ...annualGoals]);
    setForm({ year: form.year, title: '', metricName: '', targetValue: '', actualValue: '', weight: '0.2' });
  };

  return (
    <section className="grid">
      <article className="card">
        <h2>Nuevo Annual Goal</h2>
        <div className="form-grid">
          <input value={form.year} onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))} placeholder="Year" />
          <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Título" />
          <input value={form.metricName} onChange={(e) => setForm((p) => ({ ...p, metricName: e.target.value }))} placeholder="Métrica" />
          <input value={form.targetValue} onChange={(e) => setForm((p) => ({ ...p, targetValue: e.target.value }))} placeholder="Target" />
          <input value={form.actualValue} onChange={(e) => setForm((p) => ({ ...p, actualValue: e.target.value }))} placeholder="Actual" />
          <input value={form.weight} onChange={(e) => setForm((p) => ({ ...p, weight: e.target.value }))} placeholder="Weight (0-1)" />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <button type="button" onClick={submit}>Guardar goal</button>
      </article>

      <article className="card">
        <h2>Annual Goals</h2>
        {!annualGoals.length ? (
          <EmptyState message="No hay annual goals cargados." />
        ) : (
          <ul className="list">
            {annualGoals.map((goal) => (
              <li key={goal.id}>
                <span>{goal.year} · {goal.title}</span>
                <span>{goal.actualValue}/{goal.targetValue}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
