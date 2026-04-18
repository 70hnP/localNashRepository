export type TrafficLight = 'green' | 'yellow' | 'red';

export interface Vision {
  id: string;
  statement: string;
  targetYear: number;
}

export interface CEOCompetency {
  id: string;
  name: string;
  targetLevel: number;
  category: 'strategy' | 'leadership' | 'communication' | 'business' | 'execution';
}

export interface CompetencyAssessment {
  id: string;
  competencyId: string;
  period: string;
  currentLevel: number;
  confidence: number;
  notes: string;
  updatedAt: string;
}

export interface AnnualGoal {
  id: string;
  year: number;
  title: string;
  metricName: string;
  targetValue: number;
  actualValue: number;
  weight: number;
  status: 'planned' | 'in_progress' | 'at_risk' | 'completed';
}

export interface QuarterlyObjective {
  id: string;
  annualGoalId: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  title: string;
  targetValue: number;
  actualValue: number;
  status: 'planned' | 'in_progress' | 'at_risk' | 'completed';
}

export interface Evidence {
  id: string;
  date: string;
  type:
    | 'executive_report'
    | 'decision'
    | 'project'
    | 'delegation'
    | 'meeting'
    | 'feedback';
  title: string;
  summary: string;
  impactScore: number;
  credibilityScore: number;
  relevanceScore: number;
  linkedEntityType: 'goal' | 'objective' | 'competency';
  linkedEntityId: string;
}

export interface Scorecard {
  id: string;
  name:
    | 'CEO Readiness Score'
    | 'Strategic Thinking Score'
    | 'Executive Communication Score'
    | 'Delegation Maturity Score'
    | 'Leadership Expansion Score'
    | 'Influence Capital Score'
    | 'Discipline Score';
  score: number;
  target: number;
  status: TrafficLight;
  updatedAt: string;
}

export interface AppData {
  vision: Vision;
  competencies: CEOCompetency[];
  assessments: CompetencyAssessment[];
  annualGoals: AnnualGoal[];
  quarterlyObjectives: QuarterlyObjective[];
  evidence: Evidence[];
}
