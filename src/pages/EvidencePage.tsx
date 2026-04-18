import { useState } from 'react';
import { AppData, Evidence } from '../types';
import { EmptyState } from '../components/EmptyState';
import { evidenceStrength } from '../utils/score';

interface Props {
  data: AppData;
  onSave: (evidence: Evidence[]) => void;
}

export function EvidencePage({ data, onSave }: Props) {
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    type: 'executive_report',
    title: '',
    summary: '',
    impactScore: '3',
    credibilityScore: '3',
    relevanceScore: '3',
    linkedEntityType: 'goal',
    linkedEntityId: ''
  });

  const submit = () => {
    setError('');
    if (!form.title.trim() || !form.summary.trim()) return setError('Título y resumen son obligatorios.');

    const impactScore = Number(form.impactScore);
    const credibilityScore = Number(form.credibilityScore);
    const relevanceScore = Number(form.relevanceScore);
    const scores = [impactScore, credibilityScore, relevanceScore];
    if (scores.some((x) => Number.isNaN(x) || x < 1 || x > 5)) {
      return setError('Impact, credibility y relevance deben ser 1..5.');
    }

    if (!form.linkedEntityId) return setError('Debes vincular la evidencia a una entidad.');

    const newItem: Evidence = {
      id: `ev-${crypto.randomUUID()}`,
      date: new Date().toISOString().slice(0, 10),
      type: form.type as Evidence['type'],
      title: form.title.trim(),
      summary: form.summary.trim(),
      impactScore,
      credibilityScore,
      relevanceScore,
      linkedEntityType: form.linkedEntityType as Evidence['linkedEntityType'],
      linkedEntityId: form.linkedEntityId
    };

    onSave([newItem, ...data.evidence]);
    setForm({
      type: 'executive_report',
      title: '',
      summary: '',
      impactScore: '3',
      credibilityScore: '3',
      relevanceScore: '3',
      linkedEntityType: 'goal',
      linkedEntityId: ''
    });
  };

  const links = [
    ...data.annualGoals.map((goal) => ({ id: goal.id, name: `Goal: ${goal.title}` })),
    ...data.quarterlyObjectives.map((obj) => ({ id: obj.id, name: `Objective: ${obj.title}` })),
    ...data.competencies.map((comp) => ({ id: comp.id, name: `Competency: ${comp.name}` }))
  ];

  return (
    <section className="grid">
      <article className="card">
        <h2>Registrar evidencia</h2>
        <div className="form-grid">
          <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
            <option value="executive_report">Executive Report</option>
            <option value="decision">Decision</option>
            <option value="project">Project</option>
            <option value="delegation">Delegation</option>
            <option value="meeting">Meeting</option>
            <option value="feedback">Feedback</option>
          </select>
          <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Título" />
          <textarea value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} placeholder="Resumen" />
          <input value={form.impactScore} onChange={(e) => setForm((p) => ({ ...p, impactScore: e.target.value }))} placeholder="Impact 1-5" />
          <input value={form.credibilityScore} onChange={(e) => setForm((p) => ({ ...p, credibilityScore: e.target.value }))} placeholder="Credibility 1-5" />
          <input value={form.relevanceScore} onChange={(e) => setForm((p) => ({ ...p, relevanceScore: e.target.value }))} placeholder="Relevance 1-5" />
          <select value={form.linkedEntityId} onChange={(e) => setForm((p) => ({ ...p, linkedEntityId: e.target.value }))}>
            <option value="">Vincular a...</option>
            {links.map((link) => (
              <option key={link.id} value={link.id}>{link.name}</option>
            ))}
          </select>
        </div>
        {error ? <p className="error">{error}</p> : null}
        <button type="button" onClick={submit}>Guardar evidencia</button>
      </article>

      <article className="card">
        <h2>Evidence log</h2>
        {!data.evidence.length ? (
          <EmptyState message="No hay evidencia registrada." />
        ) : (
          <ul className="list">
            {data.evidence.map((item) => (
              <li key={item.id}>
                <span>{item.date} · {item.title}</span>
                <span>Strength {Math.round(evidenceStrength(item))}/100</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
