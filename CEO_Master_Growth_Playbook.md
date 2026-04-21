# CEO Master Growth Playbook

## A. Executive Summary

**Propósito del sistema.**
El **CEO Master Growth Playbook** es un sistema operativo de desarrollo ejecutivo diseñado para gestionar la transición de un perfil fuerte en ejecución industrial (operaciones, PMO, CAPEX, control financiero) hacia un perfil de **dirección corporativa integral**. El diseño combina disciplina operativa y gobernanza estratégica con trazabilidad por evidencia, scorecards y ciclos de revisión estructurados.

**Resultado esperado.**
En 5 años, el sistema debe permitir demostrar de forma auditable:
1. evolución de capacidades críticas de CEO,
2. madurez de liderazgo de personas,
3. impacto transversal en negocio,
4. calidad de decisiones estratégicas,
5. readiness para ocupar un rol de CEO.

**Principios de diseño (Harada adaptado a contexto ejecutivo).**
- Meta North Star explícita y fechada.
- Despliegue en metas anuales, trimestrales, mensuales y hábitos semanales/diarios.
- Control por KPI/KCI + evidencia objetiva.
- Revisión rítmica y disciplina de ajustes.
- Score global dinámico y alertas de desviación.
- Registro histórico para eliminar sesgo narrativo.

---

## B. Functional Architecture

### 1) Módulos funcionales

#### 1. Dashboard principal (CEO Command Center)
- **Qué muestra:** CEO Readiness Score, tendencia 90/180/365 días, semáforo por dimensiones, alertas abiertas, próximos hitos.
- **Datos que consume:** Scorecard, KPI, ReviewCycle, Risk, CorrectiveAction.
- **Decisiones que habilita:** priorizar foco mensual, reasignar tiempo estratégico, activar planes correctivos.

#### 2. Perfil objetivo CEO
- **Qué muestra:** definición del perfil objetivo (competencias, comportamientos, resultados esperados).
- **Datos:** Vision, NorthStarGoal, CEOCompetency, LeadershipDimension.
- **Decisiones:** brecha objetivo vs estado actual; selección de prioridades anuales.

#### 3. Baseline inicial
- **Qué muestra:** evaluación 360 inicial, autoevaluación, evidencia histórica, benchmark interno.
- **Datos:** ProgressLog inicial, ReflectionLog, ExecutiveCommunicationTracker, DelegationTracker, StakeholderInfluence.
- **Decisiones:** puntos de apalancamiento y riesgos estructurales.

#### 4. Mapa de capacidades críticas
- **Qué muestra:** matriz Fortaleza / En desarrollo / Crítica por competencia.
- **Datos:** CEOCompetency + scores por periodo.
- **Decisiones:** plan de fortalecimiento por competencia.

#### 5. Planeación multinivel
- **Qué muestra:** AnnualGoal → QuarterlyObjective → MonthlyAction → WeeklyHabit.
- **Datos:** jerarquía de objetivos y estado de ejecución.
- **Decisiones:** realineación carga de trabajo vs prioridades estratégicas.

#### 6. Módulo KPI/KCI
- **Qué muestra:** cumplimiento objetivo, tendencia, forecast.
- **Datos:** KPI, Scorecard, ProgressLog.
- **Decisiones:** ajuste de objetivos, redefinición de umbrales.

#### 7. Evidencias
- **Qué muestra:** repositorio de evidencia etiquetada por competencia, impacto y período.
- **Datos:** Evidence + vínculos a objetivos y KPI.
- **Decisiones:** validar progreso real; sustentar evaluaciones y promoción.

#### 8. Riesgos y bloqueadores
- **Qué muestra:** mapa de riesgos (probabilidad x impacto x detectabilidad).
- **Datos:** Risk, CorrectiveAction.
- **Decisiones:** mitigaciones preventivas y contingencias.

#### 9. Revisiones periódicas
- **Qué muestra:** agenda de revisión diaria/semanal/mensual/trimestral/anual, acuerdos y responsables.
- **Datos:** ReviewCycle, ReflectionLog.
- **Decisiones:** cierres de ciclo y repriorización.

#### 10. Histórico y bitácora
- **Qué muestra:** decisiones estratégicas, aprendizajes, pivots y resultados.
- **Datos:** ReflectionLog, ProgressLog.
- **Decisiones:** aprendizaje acumulado y mejora del sistema.

#### 11. Panel de alertas
- **Qué muestra:** alertas por brecha, estancamiento, sobrecarga operacional, baja delegación.
- **Datos:** KPI thresholds + reglas de negocio.
- **Decisiones:** intervención temprana.

#### 12. Planes correctivos
- **Qué muestra:** backlog priorizado de acciones correctivas, estado y efectividad.
- **Datos:** CorrectiveAction linked a Risk/KPI.
- **Decisiones:** continuidad, escalamiento o cierre.

### 2) Flujo operativo
1. Definir North Star + perfil objetivo CEO.
2. Levantar baseline (mes 0).
3. Planificar año y desdoblar a trimestres/meses/semanas.
4. Ejecutar hábitos y acciones.
5. Registrar evidencia objetiva.
6. Ejecutar revisiones periódicas.
7. Recalcular scorecards + alertas.
8. Aplicar correctivos.
9. Cerrar ciclo y actualizar roadmap.

---

## C. Data Model

> Modelo lógico orientado a trazabilidad, métricas y evidencia.

### Convenciones de diseño
- `id`: UUID
- Fechas: ISO-8601
- Scores: 0–100
- Estados: `planned | in_progress | completed | at_risk | blocked | cancelled`

### Entidades obligatorias

#### 1) Vision
- **Descripción:** visión profesional de largo plazo.
- **Propósito:** anclar decisiones estratégicas.
- **Campos:**
  - `id: string`
  - `title: string`
  - `statement: string`
  - `targetYear: number`
  - `createdAt: string`
  - `ownerId: string`
- **Relaciones:** 1:N con NorthStarGoal.
- **Ejemplo:** “Ser CEO industrial con alcance regional para 2031”.

#### 2) NorthStarGoal
- **Descripción:** meta principal plurianual.
- **Propósito:** orientar todas las metas subordinadas.
- **Campos:**
  - `id, visionId, name, description`
  - `startDate, targetDate`
  - `successCriteria: string[]`
  - `status`
- **Relaciones:** N:1 Vision; 1:N AnnualGoal.
- **Ejemplo:** “CEO Readiness >= 85/100 al cierre 2030”.

#### 3) CEOCompetency
- **Descripción:** competencia crítica CEO.
- **Propósito:** estructurar desarrollo por capacidades.
- **Campos:**
  - `id, code, name, description`
  - `category: 'strategy'|'leadership'|'business'|'communication'|'execution'`
  - `weight: number`
  - `targetLevel: number`
- **Relaciones:** N:M con LeadershipDimension; 1:N KPI/Evidence.
- **Ejemplo:** “Executive Synthesis”.

#### 4) LeadershipDimension
- **Descripción:** dimensión macro de liderazgo.
- **Propósito:** agrupar competencias para scorecards.
- **Campos:** `id, name, description, weight, thresholdGreen, thresholdYellow`.
- **Relaciones:** 1:N CEOCompetency; 1:N Scorecard.
- **Ejemplo:** “Strategic Leadership”.

#### 5) AnnualGoal
- **Descripción:** meta anual alineada a NorthStar.
- **Propósito:** convertir visión en hitos anuales medibles.
- **Campos:**
  - `id, northStarGoalId, year, name, objectiveStatement`
  - `weight, plannedValue, actualValue`
  - `progressPct, status`
- **Relaciones:** 1:N QuarterlyObjective; N:M KPI.
- **Ejemplo:** “Elevar strategic thinking de 52 a 68”.

#### 6) QuarterlyObjective
- **Descripción:** objetivos trimestrales por AnnualGoal.
- **Propósito:** acelerar control de ejecución.
- **Campos:** `id, annualGoalId, quarter, name, KR, plannedValue, actualValue, progressPct, status`.
- **Relaciones:** 1:N MonthlyAction.

#### 7) MonthlyAction
- **Descripción:** acciones ejecutables mensuales.
- **Propósito:** operacionalizar el trimestre.
- **Campos:** `id, quarterlyObjectiveId, month, action, owner, dueDate, effortHours, status, completionPct`.
- **Relaciones:** 1:N WeeklyHabit; N:M Evidence.

#### 8) WeeklyHabit
- **Descripción:** hábitos recurrentes.
- **Propósito:** sostener disciplina y consistencia.
- **Campos:**
  - `id, monthlyActionId, habitName, frequencyPerWeek`
  - `targetStreak, actualStreak`
  - `adherencePct`
- **Relaciones:** N:1 MonthlyAction; N:1 Scorecard (Disciplina).

#### 9) KPI
- **Descripción:** indicadores cuantitativos/cualitativos.
- **Propósito:** medir avance y salud del sistema.
- **Campos:**
  - `id, code, name, type('KPI'|'KCI'), unit`
  - `formula`
  - `baseline, target, warningThreshold, criticalThreshold`
  - `currentValue, trend`
- **Relaciones:** N:M con AnnualGoal, Scorecard, LeadershipDimension.

#### 10) Evidence
- **Descripción:** evidencia objetiva vinculada a resultados.
- **Propósito:** auditar progreso real.
- **Campos:**
  - `id, date, evidenceType, title, summary`
  - `sourceLink, attachmentPath`
  - `impactScore(1-5), credibilityScore(1-5), relevanceScore(1-5)`
  - `weightedScore`
- **Relaciones:** N:M con KPI, MonthlyAction, CEOCompetency.

#### 11) ReviewCycle
- **Descripción:** eventos de revisión formal.
- **Propósito:** gobernar el sistema con cadencia fija.
- **Campos:**
  - `id, cycleType('daily'|'weekly'|'monthly'|'quarterly'|'annual')`
  - `date, durationMin`
  - `agenda, findings, decisions, nextActions`
- **Relaciones:** 1:N ReflectionLog; N:M CorrectiveAction.

#### 12) Risk
- **Descripción:** riesgo o bloqueador del desarrollo.
- **Propósito:** prevención temprana de desviaciones.
- **Campos:** `id, name, description, probability(1-5), impact(1-5), detectability(1-5), owner, status`.
- **Relaciones:** 1:N CorrectiveAction.

#### 13) CorrectiveAction
- **Descripción:** acción de mitigación/corrección.
- **Propósito:** cerrar brechas detectadas.
- **Campos:** `id, riskId?, triggerType, triggerRefId, action, dueDate, owner, expectedImpact, status, effectivenessScore`.
- **Relaciones:** N:1 Risk; N:1 ReviewCycle.

#### 14) Scorecard
- **Descripción:** tabla de puntuación por dimensión y global.
- **Propósito:** monitorear estado ejecutivo consolidado.
- **Campos:**
  - `id, periodType, periodRef`
  - `dimensionId`
  - `score, targetScore, variance`
  - `trafficLight`
- **Relaciones:** N:1 LeadershipDimension; N:M KPI.

#### 15) ProgressLog
- **Descripción:** registro cronológico de avance.
- **Propósito:** trazabilidad temporal detallada.
- **Campos:** `id, date, entityType, entityId, plannedPct, actualPct, deltaPct, note`.
- **Relaciones:** polimórfica con AnnualGoal/QuarterlyObjective/etc.

#### 16) ReflectionLog
- **Descripción:** aprendizaje y reflexión ejecutiva.
- **Propósito:** convertir experiencia en ajuste estratégico.
- **Campos:** `id, reviewCycleId, reflectionType, prompt, response, confidenceLevel, actionDerived`.
- **Relaciones:** N:1 ReviewCycle.

#### 17) StakeholderInfluence
- **Descripción:** mapa y calidad de influencia transversal.
- **Propósito:** medir capital político organizacional.
- **Campos:** `id, stakeholderName, area, influenceLevel, relationshipHealth, trustScore, frequencyTouchpoints, lastInteractionDate`.
- **Relaciones:** N:M Evidence; N:M KPI.

#### 18) DelegationTracker
- **Descripción:** seguimiento de delegación efectiva.
- **Propósito:** migrar de ejecutor a líder multiplicador.
- **Campos:** `id, taskName, delegatedTo, strategicLevel, clarityScore, followUpCadence, outcomeQuality, autonomyGain, date`.
- **Relaciones:** N:M Evidence; N:M KPI.

#### 19) ExecutiveCommunicationTracker
- **Descripción:** control de comunicación ejecutiva.
- **Propósito:** elevar síntesis, claridad e impacto narrativo.
- **Campos:** `id, date, communicationType, audience, objective, durationMin, clarityScore, synthesisScore, influenceOutcome, feedbackSummary`.
- **Relaciones:** N:M Evidence; N:M KPI; N:M CEOCompetency.

---

## D. Business Logic

### 1) Fórmulas principales

#### a) Avance ponderado de meta anual
```text
AnnualProgressPct = Σ(QuarterProgressPct_i * QuarterWeight_i)

QuarterProgressPct = Σ(MonthCompletionPct_j * MonthWeight_j)
```
Regla recomendada: ponderación 30/30/40 para Q1/Q2/Q3-Q4 si el cierre anual concentra resultados.

#### b) Score por dimensión
```text
DimensionScore =
  0.45 * KPI_Attainment_Score +
  0.25 * Evidence_Quality_Score +
  0.20 * Habit_Discipline_Score +
  0.10 * Review_Closure_Score
```

#### c) Score global CEO
```text
CEOReadinessScore = Σ(DimensionScore_d * DimensionWeight_d)
```
Pesos sugeridos (100 total):
- Strategic Thinking: 18
- Business Vision: 15
- Leadership Expansion: 15
- Executive Communication: 12
- Delegation Maturity: 12
- Influence Capital: 12
- Decision Quality: 8
- Discipline: 8

#### d) Índices específicos

- **Índice de disciplina**
```text
DisciplineIndex = 0.6 * HabitAdherencePct + 0.4 * OnTimeReviewPct
```

- **Índice de liderazgo**
```text
LeadershipIndex = 0.5 * TeamDevelopmentKPI + 0.3 * DelegationMaturity + 0.2 * 360LeadershipFeedback
```

- **Índice de pensamiento estratégico**
```text
StrategicThinkingIndex =
  0.4 * StrategicInitiativesImpact +
  0.3 * LongTermPlanningQuality +
  0.3 * DecisionPortfolioQuality
```

- **Índice de síntesis ejecutiva**
```text
ExecutiveSynthesisIndex =
  0.5 * CommunicationTracker.synthesisScore(avg) +
  0.3 * MeetingDecisionLatencyImprovement +
  0.2 * StakeholderClarityFeedback
```

- **Índice de delegación**
```text
DelegationIndex =
  0.35 * %StrategicTasksDelegated +
  0.25 * OutcomeQualityAvg +
  0.20 * TeamAutonomyGain +
  0.20 * ReworkReduction
```

- **Índice de influencia transversal**
```text
InfluenceIndex =
  0.4 * StakeholderTrustScore(avg) +
  0.3 * CrossFunctionalInitiativeSuccessRate +
  0.3 * SponsorshipConversionRate
```

- **Índice de preparación para CEO**
```text
CEOPreparationIndex =
  0.55 * CEOReadinessScore +
  0.25 * YearlyTrajectoryScore +
  0.20 * EvidenceCoverageScore
```

### 2) Reglas de alertas
- **Rojo:** score < thresholdYellow o caída >10 puntos en 60 días.
- **Amarillo:** score entre thresholdYellow y thresholdGreen o estancamiento >45 días.
- **Verde:** score >= thresholdGreen y tendencia no negativa.

### 3) Detección de estancamiento
```text
if moving_avg_8weeks(score_delta) <= 1 point:
   create Alert(type='stagnation')
```

### 4) Sugerencia automática de correctivos
- Si baja síntesis ejecutiva: activar entrenamiento de “1-pager semanal + pre-reads de 5 bullets”.
- Si baja delegación: bloquear tareas no estratégicas >20% del tiempo y reasignar.
- Si baja influencia: plan mínimo de 6 reuniones estratégicas/mes con stakeholders.

---

## E. Multi-Year Roadmap (5 años)

### Año 1 — Fortalecimiento de base ejecutiva
- **Objetivo rector:** pasar de excelencia operativa a gestión ejecutiva estructurada.
- **Capacidades prioritarias:** síntesis ejecutiva, gestión del tiempo estratégico, delegación inicial.
- **Metas medibles:**
  - Strategic Thinking +12 puntos.
  - Delegation Index ≥ 55.
  - 80% revisiones semanales cumplidas.
- **KPIs clave:** % tiempo estratégico, % tareas delegadas, calidad de reportes ejecutivos.
- **Hábitos soporte:** revisión diaria 15’, weekly planning 45’, 1 memo ejecutivo/semana.
- **Entregables:** tablero activo, baseline validado, 4 cierres trimestrales.
- **Señales de avance:** menor participación en micro-ejecución, mayor rol en decisiones.
- **Riesgos:** recaída al modo “bombero operativo”.
- **Cierre anual:** score global ≥ 60 y evidencia completa >75%.

### Año 2 — Consolidación de liderazgo transversal
- **Objetivo rector:** liderar más allá de su vertical funcional.
- **Capacidades:** influencia transversal, liderazgo de personas, comunicación inter-áreas.
- **Metas:** Influence Index ≥ 62; Leadership Index ≥ 65.
- **KPIs:** iniciativas cross-functional exitosas, feedback 360, retención/talento clave.
- **Hábitos:** 2 mentoring sessions/mes, stakeholder map review quincenal.
- **Entregables:** 2 iniciativas transversales con impacto P&L/EBITDA.
- **Riesgos:** conflicto político, resistencia funcional.
- **Cierre:** mínimo 2 sponsors ejecutivos activos.

### Año 3 — Posicionamiento estratégico y negocio
- **Objetivo rector:** dominar lógica corporativa de negocio y portfolio.
- **Capacidades:** business vision, pensamiento estratégico, decisión de alto nivel.
- **Metas:** Business Vision Score ≥ 70; Decision Quality ≥ 68.
- **KPIs:** iniciativas estratégicas aprobadas, impacto económico, calidad de escenarios.
- **Hábitos:** revisión semanal de indicadores de negocio + análisis competitivo mensual.
- **Entregables:** liderar 1 iniciativa estratégica corporativa anual.
- **Riesgos:** sesgo excesivo a eficiencia operativa.
- **Cierre:** exposición formal recurrente en comité ejecutivo.

### Año 4 — Preparación para gerencia integral
- **Objetivo rector:** gestionar unidad o función integral con accountability extendida.
- **Capacidades:** liderazgo integral, visión corporativa, construcción de segundo nivel.
- **Metas:** Delegation Index ≥ 75; Leadership Expansion ≥ 75.
- **KPIs:** sucesión interna, desempeño agregado del equipo, cumplimiento plan estratégico.
- **Hábitos:** one-on-ones estratégicos, revisión mensual de pipeline de talento.
- **Entregables:** equipo autónomo y escalable; resultados sostenibles.
- **Riesgos:** dependencia personal del líder.
- **Cierre:** evidencia de resultados replicables sin intervención táctica constante.

### Año 5 — CEO Readiness
- **Objetivo rector:** demostrar madurez integral para rol CEO.
- **Capacidades:** narrativa corporativa, dirección integral, influencia externa.
- **Metas:** CEO Readiness Score ≥ 85.
- **KPIs:** resultados de negocio, liderazgo organizacional, reputación ejecutiva.
- **Hábitos:** revisión estratégica semanal, journaling de decisiones de alto impacto.
- **Entregables:** portfolio de decisiones, impacto transversal demostrado, sponsors C-level.
- **Riesgos:** brecha en visión comercial o gobierno corporativo.
- **Cierre:** panel de readiness validado por mentores/sponsors.

---

## F. Playbook Structure

### Portada ejecutiva
- **Muestra:** North Star, score global actual, tendencia anual.
- **Sirve para:** lectura de 2 minutos para decisión de foco.
- **Consume:** Vision, Scorecard, Alertas.
- **Decisiones:** prioridad estratégica del mes.

### Propósito central
- Marco estratégico personal-profesional, criterios de éxito y límites.

### Mapa de evolución a CEO
- Ruta por etapas con hitos obligatorios, dependencias y gates de progreso.

### Capacidades críticas
- Matriz de competencias con nivel actual/objetivo/brecha/evidencia.

### Roadmap plurianual
- Vista Gantt anual + estado semáforo por año.

### Tablero anual
- Metas anuales, KPIs, riesgos y correctivos.

### Tablero trimestral
- Objetivos trimestrales y variación plan vs real.

### Tablero mensual
- Acciones del mes, carga de trabajo, % ejecución.

### Hábitos y disciplina
- Adherencia semanal, streaks, variación por semana.

### Scorecards
- Tarjetas ejecutivas por dimensión + score global.

### Evidencias
- Biblioteca filtrable por tipo, dimensión, calidad e impacto.

### Alertas
- Alertas activas, causa raíz, SLA de resolución.

### Lecciones aprendidas
- Patrones detectados y ajustes recomendados.

### Decisiones estratégicas
- Bitácora de decisiones de alto impacto con racional y resultado.

### Revisión ejecutiva
- Actas de revisión, acuerdos y próximos pasos.

### Próximos pasos
- Plan de 30/60/90 días.

---

## G. Technical Design

### 1) Stack recomendada (local, escalable, ejecutiva)
- **Frontend:** React + TypeScript + Vite.
- **UI:** TailwindCSS + shadcn/ui (cards, tables, dialogs, badges).
- **Data layer inicial:** SQLite + Prisma ORM.
- **Backend local:** Node.js + Fastify (API REST).
- **Charts:** Recharts (líneas, radar, barras apiladas).
- **Estado frontend:** TanStack Query + Zustand.
- **Exportación futura:** csv-writer + exceljs.
- **Auth opcional:** local passwordless o simple token (fase 2).

### 2) Estructura de carpetas sugerida
```text
ceo-master-growth-playbook/
├─ apps/
│  ├─ web/
│  │  ├─ src/
│  │  │  ├─ app/
│  │  │  ├─ pages/
│  │  │  ├─ components/
│  │  │  │  ├─ scorecards/
│  │  │  │  ├─ charts/
│  │  │  │  ├─ evidence/
│  │  │  │  └─ reviews/
│  │  │  ├─ modules/
│  │  │  │  ├─ dashboard/
│  │  │  │  ├─ roadmap/
│  │  │  │  ├─ goals/
│  │  │  │  ├─ habits/
│  │  │  │  ├─ scorecard/
│  │  │  │  ├─ risks/
│  │  │  │  └─ reflections/
│  │  │  ├─ services/
│  │  │  ├─ store/
│  │  │  ├─ types/
│  │  │  └─ utils/
│  └─ api/
│     ├─ src/
│     │  ├─ routes/
│     │  ├─ controllers/
│     │  ├─ services/
│     │  ├─ repositories/
│     │  ├─ domain/
│     │  └─ rules/
├─ packages/
│  ├─ ui/
│  ├─ config/
│  └─ shared-types/
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ data/
│  ├─ snapshots/
│  └─ exports/
├─ docs/
│  ├─ playbook-guide.md
│  └─ kpi-dictionary.md
└─ README.md
```

### 3) TypeScript interfaces (extracto)
```ts
export interface AnnualGoal {
  id: string;
  northStarGoalId: string;
  year: number;
  name: string;
  objectiveStatement: string;
  weight: number; // 0..1
  plannedValue: number;
  actualValue: number;
  progressPct: number; // 0..100
  status: 'planned' | 'in_progress' | 'completed' | 'at_risk' | 'blocked' | 'cancelled';
}

export interface KPI {
  id: string;
  code: string;
  name: string;
  type: 'KPI' | 'KCI';
  unit: '%' | 'score' | 'count' | 'hours' | 'currency';
  baseline: number;
  target: number;
  warningThreshold: number;
  criticalThreshold: number;
  currentValue: number;
  trend: 'up' | 'down' | 'flat';
  formula: string;
}

export interface Evidence {
  id: string;
  date: string;
  evidenceType:
    | 'executive_report'
    | 'decision_log'
    | 'project_outcome'
    | 'delegation_case'
    | 'stakeholder_meeting'
    | 'mentoring'
    | 'public_visibility'
    | 'strategic_initiative'
    | 'communication_improvement'
    | 'feedback';
  title: string;
  summary: string;
  sourceLink?: string;
  impactScore: 1 | 2 | 3 | 4 | 5;
  credibilityScore: 1 | 2 | 3 | 4 | 5;
  relevanceScore: 1 | 2 | 3 | 4 | 5;
  weightedScore: number;
}
```

### 4) Vistas principales
1. Home / Command Center
2. CEO Profile & Baseline
3. Roadmap 5Y
4. Annual & Quarterly Planning
5. Monthly Execution Board
6. Habits & Discipline
7. Scorecards
8. Evidence Vault
9. Risks & Corrective Actions
10. Review Center
11. Decision & Reflection Log
12. History / Evolution Timeline

### 5) Componentes UI sugeridos
- `ScoreCardTile`
- `TrafficLightBadge`
- `TrendSparkline`
- `GoalHierarchyTree`
- `EvidenceTable`
- `ReviewChecklist`
- `RiskMatrix`
- `CorrectiveActionKanban`
- `DelegationHeatmap`
- `StakeholderInfluenceMap`

### 6) Navegación
- Lateral por módulos + top tabs de periodos.
- Accesos rápidos: “Registrar evidencia”, “Cerrar revisión”, “Crear acción correctiva”.
- Breadcrumb por nivel: Year > Quarter > Month > Week.

---

## H. Seed Data Examples

### Vision
```json
{
  "id": "vis-001",
  "title": "CEO Industrial Regional 2031",
  "statement": "Liderar una organización industrial multicountry con foco en crecimiento rentable, cultura de alto desempeño y excelencia operacional.",
  "targetYear": 2031,
  "createdAt": "2026-01-10",
  "ownerId": "usr-001"
}
```

### AnnualGoal (Año 1)
```json
{
  "id": "ag-2026-01",
  "northStarGoalId": "nsg-001",
  "year": 2026,
  "name": "Base Ejecutiva y Síntesis",
  "objectiveStatement": "Transicionar del rol ejecutor al rol de líder estratégico con disciplina de delegación y comunicación ejecutiva.",
  "weight": 0.25,
  "plannedValue": 100,
  "actualValue": 62,
  "progressPct": 62,
  "status": "in_progress"
}
```

### KPI
```json
{
  "id": "kpi-comm-01",
  "code": "EXEC_SYNTH_SCORE",
  "name": "Executive Synthesis Score",
  "type": "KPI",
  "unit": "score",
  "baseline": 48,
  "target": 70,
  "warningThreshold": 58,
  "criticalThreshold": 52,
  "currentValue": 60,
  "trend": "up",
  "formula": "avg(synthesisScore_last_8_reports)"
}
```

### Evidence
```json
{
  "id": "ev-2026-04-014",
  "date": "2026-04-12",
  "evidenceType": "executive_report",
  "title": "Memo Comité CAPEX Q2",
  "summary": "Documento de 1 página con decisión de priorización de portafolio y escenario de sensibilidad.",
  "sourceLink": "file:///evidence/memo-capex-q2.pdf",
  "impactScore": 4,
  "credibilityScore": 5,
  "relevanceScore": 5,
  "weightedScore": 4.6
}
```

---

## I. MVP in 30 Days

### Objetivo MVP
Lanzar una versión funcional que capture el 80% del valor con 20% de complejidad:
- foco en **control anual/trimestral**,
- **scorecards críticos**,
- **registro de evidencia**,
- **ritmo de revisión**.

### Alcance MVP
1. Baseline inicial (manual + cuestionario simple).
2. Planeación Year/Quarter/Month.
3. 8 scorecards críticos (tarjetas semáforo).
4. Registro de evidencia con ponderación.
5. Revisión semanal/mensual con bitácora.
6. Alertas básicas por umbral y estancamiento.

### Plan 30 días
- **Semana 1:** modelo de datos + SQLite + seed + wireframes.
- **Semana 2:** vistas Dashboard, Goals, Scorecards, Evidence.
- **Semana 3:** reglas de cálculo + alertas + Review Center.
- **Semana 4:** hardening, QA, export CSV, manual operativo.

### Criterios de éxito MVP
- 100% metas anuales y trimestrales cargadas.
- >90% revisiones semanales registradas.
- Score global calculado automáticamente.
- Evidencia vinculada a al menos 70% de objetivos trimestrales.
- Decisiones correctivas visibles en dashboard.

---

## J. Future Enhancements

1. **Motor de recomendaciones con IA local** (sugerencias de correctivos por patrón histórico).
2. **Integración calendario/correo** para medir tiempo estratégico real.
3. **Importadores SAP/Power BI/Smartsheet** para autoactualizar KPIs.
4. **Módulo 360 digital** con feedback estructurado y anonimizado.
5. **Comparativo de cohortes ejecutivas** (benchmark privado).
6. **Escalado a SaaS personal** con multiusuario mentor-coachee.
7. **Modelo predictivo de readiness** con series temporales.

---

## Diseño de Scorecards visuales (especificación rápida)

### Tarjetas obligatorias
- CEO Readiness Score
- Strategic Thinking Score
- Executive Communication Score
- Leadership Expansion Score
- Delegation Maturity Score
- Business Vision Score
- Influence Capital Score
- Discipline Score

### Regla visual estándar
- Tarjeta: valor actual grande + target + delta mensual + sparkline 12 semanas.
- Color semáforo:
  - Verde: `score >= target * 0.95`
  - Amarillo: `target*0.80 <= score < target*0.95`
  - Rojo: `score < target*0.80`
- Tooltip: últimos drivers (KPI y evidencias más influyentes).

### Ponderación de evidencia
```text
EvidenceWeightedScore =
  (ImpactScore*0.4 + CredibilityScore*0.35 + RelevanceScore*0.25)
  * RecencyFactor

RecencyFactor:
  <=30 días: 1.0
  31-90 días: 0.85
  91-180 días: 0.70
  >180 días: 0.50
```

### Rutinas de revisión (resumen operativo)
- **Diaria (15 min):** foco del día, bloqueadores, decisión clave.
- **Semanal (45 min):** avance hábitos/acciones, alertas y ajustes.
- **Mensual (90 min):** cierre plan vs real, calidad de evidencia, correctivos.
- **Trimestral (2-3 h):** logro de objetivos, revisión de scorecards, replanificación.
- **Anual (medio día):** evaluación integral, cierre de brechas, rediseño año siguiente.

Este blueprint está diseñado para pasar de documento estratégico a implementación técnica sin rediseños estructurales.
