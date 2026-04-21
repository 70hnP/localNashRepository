import { AnnualGoal, AppData, Evidence, QuarterlyObjective, Scorecard, TrafficLight } from '../types';

const clamp = (value: number, min = 0, max = 100): number => Math.min(max, Math.max(min, value));

const pct = (actual: number, target: number): number => {
  if (target <= 0) return 0;
  return clamp((actual / target) * 100);
};

export const evidenceStrength = (item: Evidence): number => {
  const raw = item.impactScore * 0.4 + item.credibilityScore * 0.35 + item.relevanceScore * 0.25;
  return clamp(raw * 20);
};

const statusFromScore = (score: number, target: number): TrafficLight => {
  if (score >= target * 0.95) return 'green';
  if (score >= target * 0.8) return 'yellow';
  return 'red';
};

export const annualExecutionScore = (annualGoals: AnnualGoal[]): number => {
  if (!annualGoals.length) return 0;
  const weighted = annualGoals.reduce((acc, goal) => acc + pct(goal.actualValue, goal.targetValue) * goal.weight, 0);
  const totalWeight = annualGoals.reduce((acc, goal) => acc + goal.weight, 0);
  if (!totalWeight) return 0;
  return clamp(weighted / totalWeight);
};

export const quarterlyExecutionScore = (objectives: QuarterlyObjective[]): number => {
  if (!objectives.length) return 0;
  const avg = objectives.reduce((acc, objective) => acc + pct(objective.actualValue, objective.targetValue), 0) / objectives.length;
  return clamp(avg);
};

export const buildScorecards = (data: AppData): Scorecard[] => {
  const strategicThinking = clamp(
    (data.assessments.find((a) => a.competencyId === 'comp-1')?.currentLevel ?? 0) * 0.7 +
      quarterlyExecutionScore(data.quarterlyObjectives) * 0.3
  );

  const executiveCommunication = clamp(
    (data.assessments.find((a) => a.competencyId === 'comp-2')?.currentLevel ?? 0) * 0.75 +
      (data.evidence.filter((e) => e.type === 'executive_report').map(evidenceStrength)[0] ?? 0) * 0.25
  );

  const delegationMaturity = clamp(
    (data.assessments.find((a) => a.competencyId === 'comp-3')?.currentLevel ?? 0) * 0.7 +
      (data.quarterlyObjectives.find((o) => o.id === 'qo-2') ? pct(data.quarterlyObjectives.find((o) => o.id === 'qo-2')!.actualValue, data.quarterlyObjectives.find((o) => o.id === 'qo-2')!.targetValue) : 0) * 0.3
  );

  const influenceCapital = clamp((data.assessments.find((a) => a.competencyId === 'comp-4')?.currentLevel ?? 45) * 0.9);

  const leadershipExpansion = clamp((delegationMaturity * 0.45 + influenceCapital * 0.55));

  const disciplineScore = clamp(annualExecutionScore(data.annualGoals) * 0.7 + quarterlyExecutionScore(data.quarterlyObjectives) * 0.3);

  const ceoReadiness = clamp(
    strategicThinking * 0.18 +
      executiveCommunication * 0.12 +
      delegationMaturity * 0.12 +
      leadershipExpansion * 0.15 +
      influenceCapital * 0.12 +
      disciplineScore * 0.08 +
      annualExecutionScore(data.annualGoals) * 0.23
  );

  const now = new Date().toISOString();
  const entries: Array<{ name: Scorecard['name']; score: number; target: number }> = [
    { name: 'CEO Readiness Score', score: ceoReadiness, target: 85 },
    { name: 'Strategic Thinking Score', score: strategicThinking, target: 75 },
    { name: 'Executive Communication Score', score: executiveCommunication, target: 72 },
    { name: 'Delegation Maturity Score', score: delegationMaturity, target: 70 },
    { name: 'Leadership Expansion Score', score: leadershipExpansion, target: 74 },
    { name: 'Influence Capital Score', score: influenceCapital, target: 70 },
    { name: 'Discipline Score', score: disciplineScore, target: 80 }
  ];

  return entries.map((entry, index) => ({
    id: `score-${index + 1}`,
    name: entry.name,
    score: Math.round(entry.score),
    target: entry.target,
    status: statusFromScore(entry.score, entry.target),
    updatedAt: now
  }));
};
