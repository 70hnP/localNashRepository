import { useMemo, useState } from 'react';
import { Layout } from './components/Layout';
import { AnnualGoalsPage } from './pages/AnnualGoalsPage';
import { CompetencyPage } from './pages/CompetencyPage';
import { DashboardPage } from './pages/DashboardPage';
import { EvidencePage } from './pages/EvidencePage';
import { QuarterlyObjectivesPage } from './pages/QuarterlyObjectivesPage';
import { ScorecardsPage } from './pages/ScorecardsPage';
import { loadAppData, resetAppData, saveAppData } from './services/storage';
import { AppData } from './types';
import { buildScorecards } from './utils/score';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [data, setData] = useState<AppData>(() => loadAppData());
  const [globalError, setGlobalError] = useState('');

  const scorecards = useMemo(() => {
    try {
      return buildScorecards(data);
    } catch {
      setGlobalError('Error calculando scorecards. Revisa datos incompletos.');
      return [];
    }
  }, [data]);

  const updateData = (patch: Partial<AppData>) => {
    const next: AppData = { ...data, ...patch };
    setData(next);
    try {
      saveAppData(next);
      setGlobalError('');
    } catch {
      setGlobalError('No se pudo guardar en almacenamiento local.');
    }
  };

  const reset = () => {
    const restored = resetAppData();
    setData(restored);
    setGlobalError('');
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} onReset={reset}>
      {globalError ? <p className="error global">{globalError}</p> : null}

      {activeTab === 'Dashboard' ? <DashboardPage data={data} scorecards={scorecards} /> : null}
      {activeTab === 'Competency' ? (
        <CompetencyPage data={data} onSave={(assessments) => updateData({ assessments })} />
      ) : null}
      {activeTab === 'Annual Goals' ? (
        <AnnualGoalsPage annualGoals={data.annualGoals} onSave={(annualGoals) => updateData({ annualGoals })} />
      ) : null}
      {activeTab === 'Quarterly Objectives' ? (
        <QuarterlyObjectivesPage
          annualGoals={data.annualGoals}
          objectives={data.quarterlyObjectives}
          onSave={(quarterlyObjectives) => updateData({ quarterlyObjectives })}
        />
      ) : null}
      {activeTab === 'Evidence' ? <EvidencePage data={data} onSave={(evidence) => updateData({ evidence })} /> : null}
      {activeTab === 'Scorecards' ? <ScorecardsPage scorecards={scorecards} /> : null}
    </Layout>
  );
}
