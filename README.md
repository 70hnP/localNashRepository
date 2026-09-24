# Maintenance Performance Suite

**Analítica de mantenimiento industrial sobre datos SAP PM/MM/CO/PP, con metodología de Mejora Enfocada (Kobetsu Kaizen) y benchmark externo.**

Un tablero ejecutivo y técnico de 12 páginas que convierte el dato transaccional de SAP en decisiones de gestión: dónde está la pérdida, cuánto vale cerrarla y qué acción la cierra.

<p align="center">
  <em>Demo autocontenida · abre <code>src/mockup/index.html</code> con doble clic · sin servidor, sin build</em>
</p>

---

## Por qué existe

En plantas con SAP PM el dato existe, pero no se convierte en decisiones:

- Los indicadores viven en planillas dispersas y cada área los calcula distinto.
- Predomina la cultura reactiva; el preventivo no se mide ni se cumple.
- El costo real no se descompone por equipo, causa ni tipo de mantenimiento.
- Los registros incompletos en SAP restan credibilidad a todo KPI.

Este proyecto resuelve las cuatro cosas con una cadena de valor de datos gobernada y un hilo analítico explícito.

---

## Qué incluye

| Capa | Contenido |
|---|---|
| **Metodología** | 5 Fundacionales del Mantenimiento + pilar de Mejora Enfocada (árbol de pérdidas → priorización impacto/esfuerzo → A3 con PDCA → ahorro verificado en CO) |
| **Modelo de datos** | Esquema en estrella: 7 tablas de hechos, 8 dimensiones, relaciones 1:N unidireccionales |
| **Capa semántica** | 40 medidas DAX agrupadas por pilar, con proxies y brechas declaradas |
| **Transformación** | Power Query M: tipificación, derivadas, `DimFecha`, banderas de calidad de datos |
| **Presentación** | 12 páginas con 40+ visuales, cada uno trazado a su transacción SAP |
| **Dataset** | Generador sintético de 24 meses (2025–2026): 3.044 órdenes, 2.623 avisos, 1.104 posiciones de plan |

---

## Las 12 páginas

| # | Página | Pregunta que responde |
|---|---|---|
| 1 | Resumen Ejecutivo | ¿Cómo está la operación en una vista? |
| 2 | Gestión de Órdenes | ¿Dónde se pierde el ciclo aviso → orden → cierre? |
| 3 | Preventivo vs. Correctivo | ¿Cuán madura es la planificación? |
| 4 | Confiabilidad | ¿Qué activos concentran la pérdida y por qué? |
| 5 | Costos | ¿El gasto está controlado o solo mal distribuido? |
| 6 | Backlog y Capacidad | ¿Es un problema de dotación o de abastecimiento? |
| 7 | Materiales y Repuestos | ¿Qué repuesto crítico está poniendo en riesgo la disponibilidad? |
| 8 | Calidad de Datos SAP | ¿Qué KPI *no* puedo usar todavía? |
| 9 | TPM y 5 Fundacionales | ¿Por qué los indicadores se estancan? |
| 10 | Drillthrough de Equipo | Diagnóstico 360° de un activo |
| 11 | Mejora Enfocada | ¿Cuánta pérdida hay y cuánta estoy atacando? |
| 12 | Benchmark Externo | ¿Cuánto vale llegar al cuartil superior? |

Cada página cierra con una **banda narrativa** de cuatro campos — qué dice el dato, correlación entre fuentes, riesgo si no se actúa y decisión recomendada — porque un tablero sin lectura es un reporte, no una herramienta de gestión.

---

## Trazabilidad SAP

Cada visual declara la transacción de origen mediante un *chip* visible. No hay número sin fuente.

| Módulo | Transacciones | Alimenta |
|---|---|---|
| **PM** | `IW39` `IW38` `IW28` `IW29` `IW47` `IH08` `IH06` `IP15` `IP24` `IE03` | Órdenes, avisos, confirmaciones, equipos, planes |
| **MM** | `MB51` `MB52` `MM03` `ME2N` | Consumo y stock de repuestos |
| **CO** | `KOB1` `CJI3` `KSB1` `S_ALR_87013558` | Costo real, plan y comprometido |
| **PP** | `COOIS` `MCRE` `IK13` | Producción y horas de operación |

Donde SAP PM no entrega el dato, el sistema **declara la brecha** en lugar de disimularla (ver §10 de la especificación). Ejemplo: el OEE se muestra parcial porque faltan velocidad y calidad de línea, y así se explicita en la página 12.

---

## Filtros

Todos los filtros son funcionales y recalculan cada visual, KPI y narrativa:

- **Periodo** — Todo (2025–2026), Últimos 12 meses, 2025, 2026, semestres
- **Área** — Envasado, Proceso, Servicios, Bodega
- **Línea** — Línea 1, 2, 3
- **Criticidad** — A (crítico), B (esencial), C (general)
- **Tipo de orden** — Correctivo, Preventivo, Predictivo, Mejora, Emergencia
- **Equipo** — selector dedicado en la página de drillthrough

Los KPI comparan contra la **ventana anterior de igual longitud**, de modo que el delta siempre es comparable. Si una combinación de filtros no devuelve datos, la interfaz lo declara en vez de mostrar un gráfico vacío.

---

## Estructura

```
maintenance-performance-suite/
├── README.md
├── PROJECT_SPEC.md              # especificación maestra (fuente de verdad)
├── data/
│   ├── generate_synthetic.py    # generador del dataset
│   ├── dataset.json             # payload que consume el mockup
│   └── sample/*.csv             # 8 tablas planas, una por tabla del modelo
├── src/
│   └── mockup/index.html        # aplicación autocontenida
└── docs/
    └── images/                  # capturas de las 12 páginas
```

---

## Cómo ejecutarlo

**Ver el tablero** — abre `src/mockup/index.html` en cualquier navegador. No requiere servidor ni instalación. Única dependencia externa: Chart.js por CDN.

**Regenerar el dataset**

```bash
cd data
python3 generate_synthetic.py
```

Produce los CSV y el `dataset.json`. La semilla está fijada, de modo que el resultado es reproducible. Para inyectar un dataset nuevo en el mockup basta reemplazar el contenido del bloque `<script id="ds">`.

---

## Sobre los datos

El dataset es **sintético**. No proviene de ninguna operación real y no contiene información de ninguna empresa. Reproduce deliberadamente patrones que hacen el análisis interesante:

- **Tendencia de mejora** a lo largo de 24 meses: el correctivo cae de ~54% a ~24% y la calidad de datos sube de 82% a 96%.
- **Estacionalidad**: más fallas en verano austral (enero–febrero).
- **Pareto**: unos pocos equipos concentran fallas y costo.
- **Defectos deliberados de calidad** en ~6% de los registros, para que el índice de calidad tenga algo real que detectar.
- **Correlaciones intencionales**: plan vencido → falla recurrente; quiebre de stock → orden detenida; criticidad A → mayor pérdida.

---

## Referencias de benchmark

Los rangos de la página 12 provienen de literatura pública de industria que cita estudios de **McKinsey & Company** y del marco de métricas **SMRP**. Se presentan como referencia orientativa, no como dato auditado, y varían significativamente según sector, criticidad de activos y madurez de la operación.

---

## Stack

`SAP PM/MM/CO/PP` · `Power Query (M)` · `DAX` · `Power BI` · `HTML/CSS/JS` · `Chart.js` · `Python`

## Licencia

MIT — ver `LICENSE`.

---

*Desarrollo personal de arquitectura analítica y metodología de mantenimiento. No es un producto comercial ni está asociado a ningún empleador.*
