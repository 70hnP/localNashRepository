import { Scorecard } from '../types';
import { EmptyState } from '../components/EmptyState';
import { StatusPill } from '../components/StatusPill';

export function ScorecardsPage({ scorecards }: { scorecards: Scorecard[] }) {
  if (!scorecards.length) return <EmptyState message="No hay scorecards para mostrar." />;

  return (
    <section className="grid">
      {scorecards.map((item) => (
        <article className="card" key={item.id}>
          <h2>{item.name}</h2>
          <p className="score">{item.score}/100</p>
          <p>Target: {item.target}</p>
          <StatusPill status={item.status} />
          <p className="small">Actualizado: {item.updatedAt.slice(0, 10)}</p>
        </article>
      ))}
    </section>
  );
}
