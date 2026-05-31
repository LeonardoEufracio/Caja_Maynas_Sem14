# Changelog — HORIZONTE DIGITAL

Registro cronológico de cambios y avances del proyecto **Sistema web institucional con intranet académica para la I.E.P. Horizonte**.

El formato sigue principios de [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/), adaptado al desarrollo por fases académicas.

---

## [Unreleased]

Cambios pendientes de registrar en la próxima fase autorizada.

---

## [0.2.0] — 2026-05-31 — Fase 2: Arquitectura simple y alcance MVP

### Completado

- **Fase 2 del proyecto** — Planificación técnica y documentación del MVP.

### Agregado

- `docs/ROUTE_MAP.md` — Mapa de rutas públicas y privadas, layouts (`PublicLayout`, `AdminLayout`), guards (`authGuard`) y relación ruta-servicio.

### Actualizado

- `docs/MVP_SCOPE.md` — Alcance MVP reorganizado en 12 secciones; catálogo de 23 módulos con propósito, prioridad, funcionalidad, mock y formularios; roles simulados; formularios principales con campos y validaciones; exclusiones ampliadas; criterios de avance a Fase 3.
- `docs/ARCHITECTURE.md` — Interfaces TypeScript planificadas (15); servicios mock planificados (14); componentes reutilizables con responsabilidades y límites anti-sobreingeniería; referencia a `ROUTE_MAP.md`; estado Fase 2.
- `docs/PROJECT_PHASES.md` — Fase 2 marcada como completada con checklist de criterios para Fase 3.

### Planificado (sin código)

- 15 interfaces TypeScript (`User`, `Role`, `Student`, etc.).
- 14 servicios mock (`AuthService`, `DashboardService`, etc.).
- 7 componentes reutilizables (`Navbar`, `Footer`, `Sidebar`, etc.).
- 7 formularios con Signal Forms / validaciones visibles.
- 5 roles simulados (implementación inicial con `ADMIN`).
- 9 rutas públicas + 14 rutas privadas bajo `/admin/*`.

### No incluido (pendiente de fases posteriores)

- Código Angular — **No se generó código Angular**.
- Proyecto Angular (`ng new`) — **No ejecutado**.
- Bootstrap 5 — **No instalado**.
- Componentes, servicios, interfaces `.ts`, guards — **No creados**.
- Rutas reales en `app.routes.ts` — **No implementadas**.
- Cypress — **No agregado**.
- Backend, Supabase, Firebase, Machine Learning, tutor inteligente — **No utilizados**.

### Próximo paso

- **Fase 3: Inicialización Angular y Bootstrap** — `ng new`, Bootstrap 5, estructura base y rutas mínimas (requiere autorización).

---

## [0.1.0] — 2026-05-31 — Fase 1: Documentación inicial

### Iniciado

- **Fase 1 del proyecto** — Documentación inicial completada.
- Proyecto **HORIZONTE DIGITAL** definido desde cero en la carpeta raíz `colegio-horizonte`.

### Agregado

- `docs/SYSTEM_REQUIREMENTS.md` — Contiene el **prompt maestro** del sistema: contexto, reglas de desarrollo, alcance, identidad visual, estructura deseada, fases oficiales, roles, datos mock, componentes sugeridos, criterios de calidad y restricciones técnicas.
- `docs/PROJECT_PHASES.md` — Las 11 fases del proyecto con objetivos, entregables y regla de no avanzar sin autorización.
- `docs/MVP_SCOPE.md` — Definición del alcance MVP: web pública, login mock, dashboard, módulos académicos, servicios mock, interfaces, guards y formularios con Signals.
- `docs/ARCHITECTURE.md` — Arquitectura simple del frontend: carpetas `layouts`, `pages`, `components`, `services`, `interfaces`, `guards`, `data` y separación público/privado.
- `docs/UI_GUIDELINES.md` — Identidad visual institucional, paleta de colores, estilo premium/ERP, Bootstrap 5 y criterios responsive.
- `docs/CHANGELOG.md` — Este archivo.

### No incluido (pendiente de fases posteriores)

- Código Angular — **No se generó código Angular**.
- Proyecto Angular (`ng new`) — **No ejecutado**.
- Bootstrap 5 — **No instalado**.
- Componentes, servicios, rutas, guards — **No creados**.
- Cypress — **No agregado**.
- Backend, Supabase, Machine Learning, tutor inteligente — **No utilizados**.

### Próximo paso

- **Fase 2: Arquitectura simple y alcance MVP** — Refinar módulos, rutas, interfaces, servicios mock y roles (requiere autorización para iniciar).

---

## Convenciones de versionado por fase

| Versión | Fase |
|---------|------|
| 0.1.x | Fase 1 — Documentación |
| 0.2.x | Fase 2 — Arquitectura y MVP detallado |
| 0.3.x | Fase 3 — Inicialización Angular |
| 0.4.x | Fase 4 — Layouts |
| 0.5.x | Fase 5 — Web pública |
| 0.6.x | Fase 6 — Auth mock y guards |
| 0.7.x | Fase 7 — Dashboard e intranet |
| 0.8.x | Fase 8 — Módulos académicos |
| 0.9.x | Fase 9 — Signal Forms |
| 1.0.0-rc | Fase 10 — Cypress |
| 1.0.0 | Fase 11 — Revisión final rúbrica |
