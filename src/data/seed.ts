import { AppData } from '../types';

export const seedData: AppData = {
  vision: {
    id: 'vision-1',
    statement: 'Convertirse en CEO industrial con alcance regional y foco en crecimiento rentable.',
    targetYear: 2031
  },
  competencies: [
    { id: 'comp-1', name: 'Strategic Thinking', targetLevel: 85, category: 'strategy' },
    { id: 'comp-2', name: 'Executive Communication', targetLevel: 82, category: 'communication' },
    { id: 'comp-3', name: 'Delegation', targetLevel: 80, category: 'leadership' },
    { id: 'comp-4', name: 'Influence Capital', targetLevel: 78, category: 'leadership' }
  ],
  assessments: [
    {
      id: 'assess-1',
      competencyId: 'comp-1',
      period: '2026-Q2',
      currentLevel: 58,
      confidence: 70,
      notes: 'Mejora en framing estratégico, falta profundidad comercial.',
      updatedAt: '2026-04-01'
    },
    {
      id: 'assess-2',
      competencyId: 'comp-2',
      period: '2026-Q2',
      currentLevel: 62,
      confidence: 75,
      notes: 'Mayor síntesis en reportes; aún extensos en reuniones ejecutivas.',
      updatedAt: '2026-04-02'
    }
  ],
  annualGoals: [
    {
      id: 'goal-2026-1',
      year: 2026,
      title: 'Fortalecer base ejecutiva y síntesis',
      metricName: 'Executive Communication Score',
      targetValue: 70,
      actualValue: 60,
      weight: 0.4,
      status: 'in_progress'
    },
    {
      id: 'goal-2026-2',
      year: 2026,
      title: 'Elevar delegación estratégica',
      metricName: 'Delegation Maturity Score',
      targetValue: 68,
      actualValue: 52,
      weight: 0.6,
      status: 'at_risk'
    }
  ],
  quarterlyObjectives: [
    {
      id: 'qo-1',
      annualGoalId: 'goal-2026-1',
      quarter: 'Q2',
      title: 'Reducir reportes a formato 1 página con decisiones explícitas',
      targetValue: 100,
      actualValue: 75,
      status: 'in_progress'
    },
    {
      id: 'qo-2',
      annualGoalId: 'goal-2026-2',
      quarter: 'Q2',
      title: 'Delegar 30% de actividades tácticas repetitivas',
      targetValue: 30,
      actualValue: 16,
      status: 'at_risk'
    }
  ],
  evidence: [
    {
      id: 'ev-1',
      date: '2026-04-10',
      type: 'executive_report',
      title: 'Memo CAPEX Q2 al comité',
      summary: 'Reporte de una página con decisión de priorización de portafolio.',
      impactScore: 4,
      credibilityScore: 5,
      relevanceScore: 5,
      linkedEntityType: 'goal',
      linkedEntityId: 'goal-2026-1'
    }
  ]
};
