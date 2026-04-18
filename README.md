# CEO Master Growth Playbook (MVP)

MVP funcional en React + TypeScript para seguimiento ejecutivo hacia CEO readiness.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Build local estable

```bash
npm run build
npm run preview
```

## Alcance MVP implementado

- Dashboard principal
- Competency assessment
- Annual goals
- Quarterly objectives
- Evidence log
- Scorecards básicos
- Persistencia local (`localStorage`)
- Validaciones mínimas, estados vacíos y errores básicos

## Estructura

- `src/types.ts`: contratos de datos
- `src/data/seed.ts`: datos semilla
- `src/services/storage.ts`: persistencia local
- `src/utils/score.ts`: cálculos de scorecards
- `src/pages/*`: vistas MVP
- `docs/architecture-validation.md`: validación previa de diseño
- `docs/release-checklist.md`: checklist de release local
