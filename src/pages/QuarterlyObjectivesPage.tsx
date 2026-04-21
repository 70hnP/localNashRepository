import { useState } from 'react';
import { AnnualGoal, QuarterlyObjective } from '../types';
import { EmptyState } from '../components/EmptyState';

interface Props {
  annualGoals: AnnualGoal[];
  objectives: QuarterlyObjective[];
  onSave: (objectives: QuarterlyObjective[]) => void;
}

export function QuarterlyObjectivesPage({ annualGoals, objectives, onSave }: Props) {
  const [error, setError] = useState('');
  const [form, setForm] = useState({ annualGoalId: '', quarter: 'Q1', title: '', targetValue: '', actualValue: '' });

  const submit = () => {
    setError('');
    if (!form.annualGoalId) return setError('Selecciona Annual Goal.');
    if (!annualGoals.find((goal) => goal.id === form.annualGoalId)) return setError('Annual Goal no existe.');
    if (!form.title.trim()) return setError('Título es obligatorio.');

    const target = Number(form.targetValue);
    const actual = Number(form.actualValue);
    if (Number.isNaN(target) || Number.isNaN(actual)) return setError('Target y actual deben ser numéricos.');

    const newItem: QuarterlyObjective = {
      id: `qo-${crypto.randomUUID()}`,
      annualGoalId: form.annualGoalId,
      quarter: form.quarter as QuarterlyObjective['quarter'],
      title: form.title.trim(),
      targetValue: target,
      actualValue: actual,
      status: 'planned'
    };

    onSave([newItem, ...objectives]);
    setForm({ annualGoalId: '', quarter: 'Q1', title: '', targetValue: '', actualValue: '' });
  };

  return (
    <section className="grid">
      <article className="card">
        <h2>Nuevo Quarterly Objective</h2>
        <div className="form-grid">
          <select value={form.annualGoalId} onChange={(e) => setForm((p) => ({ ...p, annualGoalId: e.target.value }))}>
            <option value="">Seleccionar annual goal</option>
            {annualGoals.map((goal) => (
              <option key={goal.id} value={goal.id}>{goal.year} · {goal.title}</option>
            ))}
          </select>
          <select value={form.quarter} onChange={(e) => setForm((p) => ({ ...p, quarter: e.target.value }))}>
            <option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option>
          </select>
          <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Título" />
          <input value={form.targetValue} onChange={(e) => setForm((p) => ({ ...p, targetValue: e.target.value }))} placeholder="Target" />
          <input value={form.actualValue} onChange={(e) => setForm((p) => ({ ...p, actualValue: e.target.value }))} placeholder="Actual" />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <button type="button" onClick={submit}>Guardar objective</button>
      </article>

      <article className="card">
        <h2>Quarterly Objectives</h2>
        {!objectives.length ? (
          <EmptyState message="No hay quarterly objectives." />
        ) : (
          <ul className="list">
            {objectives.map((obj) => (
              <li key={obj.id}>
                <span>{obj.quarter} · {obj.title}</span>
                <span>{obj.actualValue}/{obj.targetValue}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
