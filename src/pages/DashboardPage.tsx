import { AppData, Scorecard } from '../types';
import { annualExecutionScore, quarterlyExecutionScore } from '../utils/score';
import { EmptyState } from '../components/EmptyState';
import { StatusPill } from '../components/StatusPill';

interface Props {
  data: AppData;
  scorecards: Scorecard[];
}

export function DashboardPage({ data, scorecards }: Props) {
  const annualScore = Math.round(annualExecutionScore(data.annualGoals));
  const quarterScore = Math.round(quarterlyExecutionScore(data.quarterlyObjectives));
  const evidenceCount = data.evidence.length;

  if (!scorecards.length) return <EmptyState message="No hay scorecards disponibles." />;

  return (
    <section className="grid">
      <article className="card">
        <h2>Snapshot Ejecutivo</h2>
        <p>Visión: {data.vision.statement}</p>
        <p>Target Year: {data.vision.targetYear}</p>
        <div className="kpis">
          <div><strong>{annualScore}%</strong><span>Annual Execution</span></div>
          <div><strong>{quarterScore}%</strong><span>Quarterly Execution</span></div>
          <div><strong>{evidenceCount}</strong><span>Evidence Items</span></div>
        </div>
      </article>

      <article className="card">
        <h2>Top Scorecards</h2>
        <ul className="list">
          {scorecards.slice(0, 4).map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>{item.score}/100</span>
              <StatusPill status={item.status} />
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
