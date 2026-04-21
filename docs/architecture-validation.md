# MVP Architecture Validation

## Validación previa (antes de implementar)

1. **Simplicidad**: stack mínima (React + TypeScript + Vite + localStorage), sin backend obligatorio en MVP.
2. **Modularidad**: separación por `pages`, `components`, `services`, `utils`, `data`, `types`.
3. **Escalabilidad**: tipos centralizados y capa de persistencia aislada para migrar de localStorage a SQLite/API.
4. **Trazabilidad**: entidades con IDs persistentes y logs/evidence vinculables.
5. **Facilidad de uso**: navegación por tabs, formularios simples, estados vacíos y errores visibles.
6. **Bajo retrabajo**: funciones de scoring desacopladas y seed reutilizable.
7. **Alta claridad funcional**: vistas alineadas a prioridades MVP (dashboard, competency, goals, quarterly, evidence, scorecards).

## Ambigüedades resueltas con criterio MVP
- Persistencia: se implementa localStorage para minimizar complejidad inicial.
- Relaciones: validación mínima de FK en formularios (objetivos trimestrales y evidencia).
- Scoring: se implementa cálculo básico y robusto (clamp + fallback ante datos incompletos).
