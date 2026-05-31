# Arquitectura — HORIZONTE DIGITAL

## Sistema web institucional con intranet académica para la I.E.P. Horizonte

Este documento describe la **arquitectura simple** del frontend Angular. El diseño prioriza claridad, orden y defensa académica, **sin sobreingeniería** ni capas innecesarias.

**Estado:** Planificación técnica completada en **Fase 2**. Implementación a partir de **Fase 3**.

---

## 1. Visión general

HORIZONTE DIGITAL es una aplicación **SPA (Single Page Application)** con Angular 21 que combina:

1. **Zona pública** — Web institucional accesible sin autenticación.
2. **Zona privada (intranet)** — Módulos académicos protegidos por guards y alimentados por servicios mock.

No hay backend en esta etapa. Toda la lógica de datos reside en el cliente mediante servicios mock e interfaces TypeScript.

```
┌─────────────────────────────────────────────────────────┐
│                    HORIZONTE DIGITAL                     │
├──────────────────────────┬──────────────────────────────┤
│     ZONA PÚBLICA         │      INTRANET PRIVADA         │
│   (PublicLayout)         │      (AdminLayout)            │
│                          │                               │
│  /, /nosotros, /login    │  /admin/dashboard,            │
│  /noticias, /contacto    │  /admin/estudiantes, etc.     │
│                          │                               │
│  Sin autenticación       │  authGuard + sesión mock      │
└──────────────────────────┴──────────────────────────────┘
                              │
                              ▼
                    Servicios mock + data/
                    (sin backend)
```

---

## 2. Estructura de carpetas

La organización principal bajo `src/app/` será:

```txt
src/app/
├── layouts/
│   ├── public-layout/
│   └── admin-layout/
├── pages/
│   ├── home/
│   ├── about/
│   ├── levels/
│   ├── admission/
│   ├── news/
│   ├── announcements/
│   ├── gallery/
│   ├── contact/
│   ├── login/
│   ├── dashboard/
│   ├── profile/
│   ├── grades/
│   ├── schedules/
│   ├── tasks/
│   ├── resources/
│   ├── attendance/
│   ├── parent-tracking/
│   ├── students/
│   ├── teachers/
│   ├── parents/
│   ├── users/
│   ├── courses/
│   └── settings/
├── components/
│   ├── navbar/
│   ├── footer/
│   ├── sidebar/
│   ├── page-header/
│   ├── stat-card/
│   ├── data-table/
│   └── empty-state/
├── services/
├── interfaces/
├── guards/
├── data/
├── app.routes.ts
├── app.config.ts
└── main.ts
```

Esta estructura se implementará a partir de la **Fase 3**.

---

## 3. Responsabilidad de cada carpeta

### `layouts/`

Contiene los **layouts maestros** que envuelven grupos de páginas.

| Layout | Función |
|--------|---------|
| `public-layout` | Estructura de la web institucional: navbar público, contenido central, footer. |
| `admin-layout` | Estructura de la intranet: sidebar, navbar interno, área de contenido administrativo. |

**Propósito:** Separar visual y estructuralmente la experiencia pública de la privada sin duplicar código en cada página.

---

### `pages/`

Contiene **páginas o vistas** asociadas a rutas concretas. Un componente por ruta principal.

- **Páginas públicas:** `home`, `about`, `levels`, `admission`, `news`, `announcements`, `gallery`, `contact`, `login`.
- **Páginas privadas:** `dashboard`, `profile`, `grades`, `schedules`, `tasks`, `resources`, `attendance`, `parent-tracking`, `students`, `teachers`, `parents`, `users`, `courses`, `settings`.

**Propósito:** La lógica de presentación de cada módulo vive aquí; consume servicios mock, no accede directamente a `data/`.

---

### `components/`

Contiene **componentes reutilizables** compartidos entre páginas. Ver sección **10. Componentes reutilizables planificados**.

---

### `services/`

Contiene **servicios Angular** que encapsulan lógica de negocio y acceso a datos mock. Ver sección **9. Servicios mock planificados**.

**Propósito:** Separar la lógica de datos de los componentes; facilitar sustitución futura por API real.

---

### `interfaces/`

Contiene **interfaces TypeScript** que definen la forma de las entidades del dominio. Ver sección **8. Interfaces TypeScript planificadas**.

**Propósito:** Tipado fuerte, autocompletado y código defendible académicamente.

---

### `guards/`

Contiene **route guards** de Angular.

| Guard | Archivo sugerido | Función |
|-------|------------------|---------|
| `authGuard` | `auth.guard.ts` | Protege rutas `/admin/*`; redirige a `/login` sin sesión |
| `roleGuard` | `role.guard.ts` | (Opcional) Restringe rutas según rol mock |

**Propósito:** Proteger la intranet y demostrar routing avanzado de Angular.

---

### `data/`

Contiene **datos estáticos mock** importables por servicios.

Ejemplos: `students.data.ts`, `teachers.data.ts`, `courses.data.ts`, `news.data.ts`, `dashboard-metrics.data.ts`.

**Propósito:** Centralizar semillas de datos; mantener servicios legibles.

---

### Archivos raíz de la aplicación

| Archivo | Función |
|---------|---------|
| `app.routes.ts` | Rutas públicas, privadas y layouts (ver `ROUTE_MAP.md`) |
| `app.config.ts` | Configuración de la aplicación (providers, etc.) |
| `main.ts` | Punto de entrada de bootstrap de Angular |

---

## 4. Separación: página pública vs intranet privada

### Zona pública

- **Layout:** `PublicLayout`
- **Rutas:** `/`, `/nosotros`, `/niveles`, `/admision`, `/noticias`, `/comunicados`, `/galeria`, `/contacto`, `/login`
- **Acceso:** Libre, sin guard
- **Objetivo:** Imagen institucional premium de la I.E.P. Horizonte

### Intranet privada

- **Layout:** `AdminLayout`
- **Rutas:** `/admin/*` (ver `ROUTE_MAP.md`)
- **Acceso:** Requiere login mock exitoso; protegido por `authGuard`
- **Objetivo:** Simular un ERP escolar con módulos académicos

---

## 5. Mapa de rutas

El detalle completo de rutas, layouts y guards está en **`ROUTE_MAP.md`**.

---

## 6. Flujo de datos (mock)

```
Página (pages/)
       │
       ▼
  Servicio mock (services/)
       │
       ├──► Interface TypeScript (interfaces/)
       │
       └──► Datos semilla (data/) — solo vía servicio
```

**Reglas:**

- Los componentes de página **no** importan directamente desde `data/`.
- Los servicios devuelven `Observable<T>` o signals según convención adoptada en Fase 3.
- Las mutaciones mock (crear/editar) modifican el array en memoria del servicio.

---

## 7. Principios de diseño arquitectónico

1. **Simplicidad** — Angular standalone moderno; sin NgModules extras ni micro-frontends.
2. **Separación de responsabilidades** — Páginas presentan; servicios proveen datos; guards protegen; interfaces tipan.
3. **Convenciones del curso** — `ng generate component`, `ng generate service`, `ng generate interface`, `ng generate guard`.
4. **Preparado para crecer** — Sustituir servicios mock por HTTP en el futuro sin reescribir toda la UI.
5. **Documentación por fase** — Cambios relevantes en `CHANGELOG.md`.

---

## 8. Interfaces TypeScript planificadas

> **Nota:** Solo documentación. No crear archivos `.ts` hasta Fase 3 en adelante.

| Interface | Archivo sugerido | Representa |
|-----------|------------------|------------|
| `User` | `user.interface.ts` | Usuario del sistema: id, nombre, email, rol, avatar opcional |
| `Role` | `role.interface.ts` | Rol simulado: `ADMIN`, `DIRECTOR`, `TEACHER`, `STUDENT`, `PARENT` |
| `Student` | `student.interface.ts` | Estudiante: código, nombres, apellidos, grado, sección, email, estado |
| `Teacher` | `teacher.interface.ts` | Docente: código, nombres, apellidos, especialidad, email, cursos asignados |
| `Parent` | `parent.interface.ts` | Padre/madre: datos personales y vínculo con estudiante(s) |
| `Course` | `course.interface.ts` | Curso: nombre, grado, docente, año académico, horario resumido |
| `Grade` | `grade.interface.ts` | Calificación: estudiante, curso, periodo, nota, observación |
| `Schedule` | `schedule.interface.ts` | Horario: curso, día, hora inicio/fin, aula, docente |
| `Task` | `task.interface.ts` | Tarea: título, curso, fecha entrega, descripción, estado |
| `Resource` | `resource.interface.ts` | Recurso educativo: título, tipo, curso, URL o referencia |
| `Attendance` | `attendance.interface.ts` | Asistencia: estudiante, curso, fecha, estado (presente/ausente/tarde) |
| `Announcement` | `announcement.interface.ts` | Comunicado institucional: título, contenido, fecha, categoría |
| `NewsItem` | `news-item.interface.ts` | Noticia: título, resumen, contenido, fecha, imagen opcional |
| `GalleryImage` | `gallery-image.interface.ts` | Imagen de galería: título, URL, categoría, fecha |
| `DashboardMetric` | `dashboard-metric.interface.ts` | Métrica del dashboard: etiqueta, valor, variación, icono/color |

---

## 9. Servicios mock planificados

> **Nota:** Solo documentación. No crear archivos `.ts` hasta Fase 3 en adelante.

| Servicio | Archivo sugerido | Datos / acciones simuladas |
|----------|------------------|----------------------------|
| `AuthService` | `auth.service.ts` | Login/logout mock; sesión actual; validación de credenciales; rol del usuario |
| `DashboardService` | `dashboard.service.ts` | Métricas (`DashboardMetric[]`); resumen académico; datos para StatCards |
| `StudentService` | `student.service.ts` | CRUD mock de `Student[]`; búsqueda y filtro por grado |
| `TeacherService` | `teacher.service.ts` | CRUD mock de `Teacher[]`; listado por especialidad |
| `ParentService` | `parent.service.ts` | Listado de `Parent[]`; vínculo padre-estudiante |
| `CourseService` | `course.service.ts` | CRUD mock de `Course[]`; cursos por grado o docente |
| `GradeService` | `grade.service.ts` | Consulta de `Grade[]` por estudiante, curso o periodo |
| `ScheduleService` | `schedule.service.ts` | Horarios `Schedule[]` por curso, docente o día |
| `TaskService` | `task.service.ts` | CRUD mock de `Task[]`; tareas por curso y estado |
| `ResourceService` | `resource.service.ts` | CRUD mock de `Resource[]`; recursos por curso y tipo |
| `AttendanceService` | `attendance.service.ts` | Registro/consulta mock de `Attendance[]`; resumen por curso/fecha |
| `AnnouncementService` | `announcement.service.ts` | Listado de `Announcement[]` para web pública e intranet |
| `NewsService` | `news.service.ts` | Listado y detalle de `NewsItem[]` |
| `GalleryService` | `gallery.service.ts` | Listado de `GalleryImage[]` por categoría |

### Patrón de implementación sugerido

```typescript
// Patrón conceptual — no implementar en Fase 2
@Injectable({ providedIn: 'root' })
export class StudentService {
  private students = signal<Student[]>(INITIAL_STUDENTS);

  getAll(): Student[] { return this.students(); }
  getById(id: string): Student | undefined { /* ... */ }
  create(student: Student): void { /* mutación en memoria */ }
  update(id: string, data: Partial<Student>): void { /* ... */ }
}
```

---

## 10. Componentes reutilizables planificados

> **Nota:** Solo documentación. No crear componentes hasta Fases 4–7.

### Navbar

| Aspecto | Detalle |
|---------|---------|
| **Dónde se usa** | `PublicLayout` (variante pública); opcionalmente navbar compacto en `AdminLayout` |
| **Responsabilidad** | Logo/nombre institucional, enlaces de navegación, botón "Ingresar", menú responsive colapsable |
| **Qué NO debe hacer** | No gestionar autenticación internamente; no contener lógica de servicios mock; no duplicar el sidebar de la intranet |

---

### Footer

| Aspecto | Detalle |
|---------|---------|
| **Dónde se usa** | `PublicLayout` únicamente |
| **Responsabilidad** | Datos de contacto, enlaces institucionales, copyright, redes (placeholders) |
| **Qué NO debe hacer** | No aparecer en intranet admin; no incluir formularios complejos |

---

### Sidebar

| Aspecto | Detalle |
|---------|---------|
| **Dónde se usa** | `AdminLayout` |
| **Responsabilidad** | Menú lateral con enlaces a módulos `/admin/*`; ítem activo resaltado; colapsable en móvil |
| **Qué NO debe hacer** | No filtrar rutas por rol con lógica compleja en MVP inicial; no cargar datos de módulos |

---

### PageHeader

| Aspecto | Detalle |
|---------|---------|
| **Dónde se usa** | Páginas de intranet y opcionalmente páginas públicas internas |
| **Responsabilidad** | Título de página, subtítulo opcional, breadcrumb simple, slot para acciones (botón "Nuevo") |
| **Qué NO debe hacer** | No implementar routing propio; no ser un layout completo |

---

### StatCard

| Aspecto | Detalle |
|---------|---------|
| **Dónde se usa** | Dashboard principal |
| **Responsabilidad** | Mostrar una métrica: valor numérico, etiqueta, icono/color de acento, variación opcional |
| **Qué NO debe hacer** | No fetch de datos; recibe inputs del componente padre; no gráficos complejos |

---

### DataTable

| Aspecto | Detalle |
|---------|---------|
| **Dónde se usa** | Estudiantes, Docentes, Cursos, Notas, Horarios, Asistencia, Usuarios, etc. |
| **Responsabilidad** | Renderizar columnas configurables, filas Bootstrap, acciones por fila (ver/editar), paginación simple opcional |
| **Qué NO debe hacer** | No sorting/filtering avanzado tipo DataGrid; no virtual scroll; no integración con backend |

---

### EmptyState

| Aspecto | Detalle |
|---------|---------|
| **Dónde se usa** | Cualquier listado sin registros |
| **Responsabilidad** | Mensaje amigable, icono simple, botón opcional de acción ("Agregar estudiante") |
| **Qué NO debe hacer** | No decidir cuándo mostrarse; el padre pasa `@Input() visible` o usa `@if` en la página |

---

## 11. Guards planificados

| Guard | Cuándo implementar | Comportamiento |
|-------|-------------------|----------------|
| `authGuard` | Fase 6 | Bloquea `/admin/*` sin sesión; guarda `returnUrl` |
| `roleGuard` | Post-Fase 6 (opcional) | Verifica rol en `AuthService`; útil cuando se simulen roles beyond ADMIN |

---

## 12. Lo que esta arquitectura NO incluye

- Backend, API REST, GraphQL.
- Supabase, Firebase u otras BaaS.
- State management global (NgRx, etc.).
- Machine Learning o tutor inteligente.
- Librerías UI pesadas además de Bootstrap 5.
- Pagos, PDF avanzado, notificaciones push, chat en tiempo real.

---

## 13. Criterios de avance a Fase 3

La Fase 2 queda completa cuando:

- ✅ Alcance MVP documentado (`MVP_SCOPE.md`).
- ✅ Rutas definidas (`ROUTE_MAP.md`).
- ✅ Interfaces, servicios y componentes planificados (este documento).
- ✅ Roles y formularios documentados (`MVP_SCOPE.md`).
- ✅ Sin código Angular generado.

**Fase 3** iniciará: `ng new`, Bootstrap 5, carpetas base y rutas mínimas en `app.routes.ts`.

---

## 14. Estado actual

| Elemento | Estado |
|----------|--------|
| Documentación de arquitectura | ✅ Fase 2 completada |
| Mapa de rutas | ✅ `ROUTE_MAP.md` |
| Interfaces / servicios / componentes | ✅ Planificados (sin `.ts`) |
| Proyecto Angular | ❌ Pendiente (Fase 3) |
| Carpetas `src/app/` | ❌ Pendiente (Fase 3) |
| Layouts, guards, servicios en código | ❌ Pendiente (Fases 4–8) |

---

## Referencias

- Requisitos: `SYSTEM_REQUIREMENTS.md`
- Alcance MVP: `MVP_SCOPE.md`
- Mapa de rutas: `ROUTE_MAP.md`
- Fases: `PROJECT_PHASES.md`
- UI: `UI_GUIDELINES.md`
