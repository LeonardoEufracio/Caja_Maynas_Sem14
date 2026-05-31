# Fases del proyecto — HORIZONTE DIGITAL

## Sistema web institucional con intranet académica para la I.E.P. Horizonte

Este documento describe las **11 fases oficiales** del proyecto. El avance debe ser **secuencial**, controlado y documentado. Cada fase tiene un objetivo claro y entregables concretos.

---

## Regla de avance

> **No se debe avanzar de fase sin autorización explícita.**

Antes de iniciar una nueva fase, se debe:

1. Completar los entregables de la fase actual.
2. Actualizar la documentación correspondiente (incluido `CHANGELOG.md`).
3. Obtener confirmación para continuar.

Esta regla garantiza un desarrollo ordenado, defendible académicamente y alineado con la rúbrica del curso.

---

## Fase 1: Documentación inicial

### Objetivo

Establecer la base documental del proyecto antes de escribir código Angular. Definir requisitos, alcance, arquitectura, identidad visual y registro de cambios.

### Entregables

- `docs/SYSTEM_REQUIREMENTS.md` — Prompt maestro y requisitos del sistema.
- `docs/PROJECT_PHASES.md` — Este documento.
- `docs/MVP_SCOPE.md` — Alcance mínimo viable del MVP.
- `docs/ARCHITECTURE.md` — Arquitectura simple del frontend.
- `docs/UI_GUIDELINES.md` — Guía de identidad visual.
- `docs/CHANGELOG.md` — Registro cronológico de avances.

### Restricciones

- No programar Angular.
- No instalar dependencias.
- No ejecutar `ng new`.

---

## Fase 2: Arquitectura simple y alcance MVP

### Objetivo

Detallar qué entra al MVP, qué queda simulado, qué datos serán mock, roles iniciales, rutas principales, componentes reutilizables, servicios e interfaces principales, y criterios de avance.

### Entregables

- Definición refinada de módulos incluidos y excluidos del MVP → `MVP_SCOPE.md`.
- Mapa de rutas públicas y privadas (documentado, no implementado) → `ROUTE_MAP.md`.
- Listado de interfaces TypeScript principales → `ARCHITECTURE.md` (sección 8).
- Listado de servicios mock iniciales → `ARCHITECTURE.md` (sección 9).
- Listado de componentes reutilizables planificados → `ARCHITECTURE.md` (sección 10).
- Roles simulados y permisos básicos por rol → `MVP_SCOPE.md` (sección 3).
- Formularios principales con campos y validaciones → `MVP_SCOPE.md` (sección 7).
- Criterios de avance a Fase 3 → `MVP_SCOPE.md` y `ARCHITECTURE.md`.
- Entrada en `CHANGELOG.md`.

### Restricciones

- Aún no se crea el proyecto Angular.
- No backend, Supabase ni Machine Learning.

### Estado

**Completada** — 2026-05-31. Documentación técnica lista para revisión. Sin código Angular.

### Criterios cumplidos para avanzar a Fase 3

| Criterio | Documento |
|----------|-----------|
| Alcance MVP claro | `MVP_SCOPE.md` |
| Rutas definidas | `ROUTE_MAP.md` |
| Módulos priorizados | `MVP_SCOPE.md` (secciones 4–5) |
| Interfaces planificadas | `ARCHITECTURE.md` (sección 8) |
| Servicios mock planificados | `ARCHITECTURE.md` (sección 9) |
| Componentes reutilizables planificados | `ARCHITECTURE.md` (sección 10) |
| Sin código Angular | ✅ |

---

## Fase 3: Inicialización Angular y Bootstrap

### Objetivo

Crear el proyecto Angular 21 desde cero en la carpeta `colegio-horizonte`, configurar Bootstrap 5, SCSS o CSS simple, y la estructura base de carpetas con rutas iniciales mínimas.

### Entregables

- Proyecto Angular 21 inicializado.
- Bootstrap 5 integrado.
- Estructura base de carpetas (`layouts`, `pages`, `components`, `services`, `interfaces`, `guards`, `data`).
- Rutas iniciales configuradas (sin módulos funcionales completos).
- Documentación de instalación y comandos usados.
- Entrada en `CHANGELOG.md`.

### Restricciones

- No implementar aún todos los módulos funcionales.
- Mantener arquitectura simple.

---

## Fase 4: Layouts principales

### Objetivo

Implementar la estructura visual base que separa la zona pública de la intranet privada.

### Entregables

- `PublicLayout` — Layout para la web institucional.
- `AdminLayout` — Layout para la intranet tipo ERP.
- Navbar público institucional.
- Footer público institucional.
- Sidebar administrativo.
- Routing con layouts anidados.
- Entrada en `CHANGELOG.md`.

---

## Fase 5: Página web pública premium

### Objetivo

Construir la web institucional pública con apariencia profesional, moderna y responsive.

### Entregables

- Páginas: Home, About, Levels, Admission, News, Announcements, Gallery, Contact.
- Contenido institucional simulado pero realista.
- Hero, cards, secciones informativas y llamados a la acción.
- Diseño responsive (escritorio, tablet, móvil).
- Entrada en `CHANGELOG.md`.

---

## Fase 6: Login, auth simulado y guards

### Objetivo

Implementar autenticación simulada (mock) y protección de rutas privadas sin backend.

### Entregables

- Página Login.
- Servicio de autenticación mock.
- Interfaces de usuario y rol.
- Guard para rutas privadas.
- Simulación de sesión y redirección según autenticación.
- Entrada en `CHANGELOG.md`.

### Restricciones

- No usar backend ni servicios externos de autenticación.

---

## Fase 7: Dashboard e intranet tipo ERP

### Objetivo

Crear el panel principal de la intranet con apariencia de sistema académico real.

### Entregables

- Dashboard con métricas y resumen académico.
- Cards estadísticas (`StatCard`).
- Tablas Bootstrap (`DataTable`).
- Componentes reutilizables (PageHeader, EmptyState, etc.).
- Layout administrativo funcional.
- Entrada en `CHANGELOG.md`.

---

## Fase 8: Módulos académicos

### Objetivo

Implementar las páginas y lógica mock de los módulos académicos principales de la intranet.

### Entregables

- Páginas funcionales (visualmente completas) para:
  - Estudiantes, Docentes, Padres, Usuarios, Cursos.
  - Notas, Horarios, Tareas, Recursos, Asistencia.
  - Seguimiento de padres, Perfil, Configuración.
- Servicios mock con datos simulados.
- Interfaces TypeScript por entidad.
- Estados vacíos donde corresponda.
- Entrada en `CHANGELOG.md`.

### Nota

No todos los módulos requieren CRUD completo, pero deben verse funcionales y estar bien estructurados.

---

## Fase 9: Formularios con Signal Forms y validaciones

### Objetivo

Aplicar Angular Signals o Signal Forms en los formularios principales con validaciones visibles.

### Entregables

- Formularios con Signals o Signal Forms en, como mínimo:
  - Login, Contacto.
  - Registro/edición de estudiante, docente y curso.
  - Registro de tarea o recurso.
- Validaciones visibles y mensajes de error claros.
- Estado del formulario y botones deshabilitados cuando corresponda.
- Entrada en `CHANGELOG.md`.

---

## Fase 10: Pruebas Cypress

### Objetivo

Agregar pruebas end-to-end con Cypress para validar flujos críticos del frontend.

### Entregables

- Cypress configurado en el proyecto.
- Pruebas para:
  - Carga de página pública.
  - Login mock.
  - Acceso protegido al dashboard.
  - Visualización de tabla.
  - Validación de formulario.
- Entrada en `CHANGELOG.md`.

---

## Fase 11: Revisión final para rúbrica

### Objetivo

Verificar que el proyecto cumple los criterios académicos y está listo para exposición y defensa.

### Entregables

- Revisión de checklist de calidad:
  - Frontend desarrollado al 80% o más.
  - Estructura de carpetas y modularización.
  - Uso correcto de Angular 21, Bootstrap 5, guards, servicios mock, interfaces.
  - Signals o Signal Forms con validaciones visibles.
  - Diseño responsive.
  - Documentación completa y código limpio.
- Correcciones finales documentadas.
- Entrada final en `CHANGELOG.md`.

---

## Resumen de fases

| Fase | Nombre | ¿Código Angular? |
|------|--------|------------------|
| 1 | Documentación inicial | No |
| 2 | Arquitectura simple y alcance MVP | No |
| 3 | Inicialización Angular y Bootstrap | Sí |
| 4 | Layouts principales | Sí |
| 5 | Página web pública premium | Sí |
| 6 | Login, auth simulado y guards | Sí |
| 7 | Dashboard e intranet tipo ERP | Sí |
| 8 | Módulos académicos | Sí |
| 9 | Formularios con Signal Forms | Sí |
| 10 | Pruebas Cypress | Sí |
| 11 | Revisión final para rúbrica | Revisión |

---

## Referencia

Para requisitos completos del sistema, consultar `SYSTEM_REQUIREMENTS.md`.
