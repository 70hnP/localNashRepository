import { useMemo, useState } from 'react';
import { AppData, CompetencyAssessment } from '../types';
import { EmptyState } from '../components/EmptyState';

interface Props {
  data: AppData;
  onSave: (assessments: CompetencyAssessment[]) => void;
}

export function CompetencyPage({ data, onSave }: Props) {
  const [error, setError] = useState('');
  const [form, setForm] = useState({ competencyId: '', currentLevel: '', confidence: '', notes: '' });

  const mapped = useMemo(
    () =>
      data.assessments.map((item) => ({
        ...item,
        competencyName: data.competencies.find((c) => c.id === item.competencyId)?.name ?? 'N/A'
      })),
    [data.assessments, data.competencies]
  );

  const submit = () => {
    setError('');
    if (!form.competencyId) return setError('Selecciona una competencia.');
    const currentLevel = Number(form.currentLevel);
    const confidence = Number(form.confidence);
    if (Number.isNaN(currentLevel) || currentLevel < 0 || currentLevel > 100) {
      return setError('Current level debe estar entre 0 y 100.');
    }
    if (Number.isNaN(confidence) || confidence < 0 || confidence > 100) {
      return setError('Confidence debe estar entre 0 y 100.');
    }
    const newItem: CompetencyAssessment = {
      id: `assess-${crypto.randomUUID()}`,
      competencyId: form.competencyId,
      period: new Date().toISOString().slice(0, 7),
      currentLevel,
      confidence,
      notes: form.notes.trim(),
      updatedAt: new Date().toISOString().slice(0, 10)
    };
    onSave([newItem, ...data.assessments]);
    setForm({ competencyId: '', currentLevel: '', confidence: '', notes: '' });
  };

  return (
    <section className="grid">
      <article className="card">
        <h2>Agregar assessment</h2>
        <div className="form-grid">
          <select value={form.competencyId} onChange={(e) => setForm((p) => ({ ...p, competencyId: e.target.value }))}>
            <option value="">Seleccionar competencia</option>
            {data.competencies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input placeholder="Current level 0-100" value={form.currentLevel} onChange={(e) => setForm((p) => ({ ...p, currentLevel: e.target.value }))} />
          <input placeholder="Confidence 0-100" value={form.confidence} onChange={(e) => setForm((p) => ({ ...p, confidence: e.target.value }))} />
          <textarea placeholder="Notas" value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <button type="button" onClick={submit}>Guardar assessment</button>
      </article>

      <article className="card">
        <h2>Histórico de assessments</h2>
        {!mapped.length ? (
          <EmptyState message="No hay assessments cargados." />
        ) : (
          <ul className="list">
            {mapped.map((item) => (
              <li key={item.id}>
                <span>{item.competencyName}</span>
                <span>{item.currentLevel}/100</span>
                <span>{item.updatedAt}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
