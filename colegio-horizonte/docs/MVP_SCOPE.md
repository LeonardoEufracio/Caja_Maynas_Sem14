# Alcance MVP — HORIZONTE DIGITAL

## Sistema web institucional con intranet académica para la I.E.P. Horizonte

Este documento define el **alcance mínimo viable (MVP)** del proyecto. El MVP debe verse **funcional y completo a nivel frontend**, aunque **no tenga backend**. Todos los datos provienen de servicios mock e interfaces TypeScript.

**Estado:** Definición detallada completada en **Fase 2**.

---

## 1. Propósito del MVP

El MVP de HORIZONTE DIGITAL demuestra dominio de Angular moderno, organización del código y diseño frontend profesional. Debe:

- Presentar una **web pública institucional** navegable, responsive y visualmente premium.
- Permitir **acceso simulado** a una **intranet académica** tipo ERP escolar.
- Mostrar **módulos académicos principales** con datos mock creíbles y coherentes.
- Aplicar **guards**, **interfaces**, **servicios mock** y **formularios con validaciones visibles**.
- Cumplir la rúbrica académica (frontend ≥ 80%, modularización, Signals o Signal Forms).

El MVP **no persiste datos en servidor** ni se conecta a bases de datos reales.

---

## 2. Organización del alcance MVP

### 2.1 Página pública institucional

Web institucional accesible sin autenticación. Incluye header, hero, secciones informativas, cards, CTAs, footer y diseño responsive con Bootstrap 5.

**Módulos incluidos:** Home, About, Levels, Admission, News, Announcements, Gallery, Contact, Login.

**Objetivo:** Imagen profesional de la I.E.P. Horizonte y punto de entrada al login de la intranet.

---

### 2.2 Autenticación simulada

Login mock accesible desde `/login`. Sin backend, Supabase ni Firebase.

**Incluye:**

- `AuthService` con credenciales de prueba documentadas.
- Simulación de sesión (memoria o `localStorage` simple).
- Redirección a `/admin/dashboard` tras login exitoso.
- Logout simulado que destruye la sesión mock.

**Implementación inicial:** rol **ADMIN** primero; demás roles en fases posteriores.

---

### 2.3 Intranet académica privada

Zona privada bajo prefijo `/admin/*`, protegida por `authGuard`, con layout `AdminLayout`.

**Incluye:** sidebar administrativo, navbar interno, módulos académicos y navegación coherente tipo ERP.

---

### 2.4 Dashboard

Panel principal post-login con métricas simuladas, cards estadísticas, resumen académico y accesos rápidos a módulos.

**Datos mock:** sí (`DashboardService`, `DashboardMetric`).

**Formulario:** no.

---

### 2.5 Módulos académicos principales

Módulos de la intranet con listados, vistas de detalle y, donde corresponda, formularios de registro/edición mock. No todos requieren CRUD completo; deben ser **visualmente funcionales y bien estructurados**.

Ver sección **4. Catálogo de módulos del MVP** para detalle por módulo.

---

### 2.6 Formularios principales

Formularios con **Angular Signals o Signal Forms** y **validaciones visibles** (Fase 9):

| Formulario | Prioridad | Módulo |
|------------|-----------|--------|
| Login | Alta | `/login` |
| Contacto | Alta | `/contacto` |
| Estudiante | Alta | `/admin/estudiantes` |
| Docente | Alta | `/admin/docentes` |
| Curso | Media | `/admin/cursos` |
| Tarea | Media | `/admin/tareas` |
| Recurso | Media | `/admin/recursos` |

Ver sección **7. Formularios principales** para campos y validaciones.

---

### 2.7 Servicios mock

Servicios Angular que encapsulan datos simulados. Sin HTTP real hacia APIs externas.

**Listado planificado:** `AuthService`, `DashboardService`, `StudentService`, `TeacherService`, `ParentService`, `CourseService`, `GradeService`, `ScheduleService`, `TaskService`, `ResourceService`, `AttendanceService`, `AnnouncementService`, `NewsService`, `GalleryService`.

Detalle en `ARCHITECTURE.md` (sección Servicios mock planificados).

---

### 2.8 Interfaces TypeScript

Interfaces tipadas para entidades del dominio. Uso consistente en servicios, componentes y formularios.

**Listado planificado:** `User`, `Role`, `Student`, `Teacher`, `Parent`, `Course`, `Grade`, `Schedule`, `Task`, `Resource`, `Attendance`, `Announcement`, `NewsItem`, `GalleryImage`, `DashboardMetric`.

Detalle en `ARCHITECTURE.md` (sección Interfaces TypeScript planificadas).

---

### 2.9 Guards

| Guard | Función | Prioridad MVP |
|-------|---------|---------------|
| `authGuard` | Protege rutas `/admin/*`; redirige a `/login` si no hay sesión | Alta |
| `roleGuard` | Restringe rutas según rol mock (opcional, post-ADMIN) | Media |

---

### 2.10 Componentes reutilizables

`Navbar`, `Footer`, `Sidebar`, `PageHeader`, `StatCard`, `DataTable`, `EmptyState`.

Detalle en `ARCHITECTURE.md` (sección Componentes reutilizables planificados).

---

### 2.11 Pruebas Cypress futuras

No forman parte del código MVP inicial; se implementan en **Fase 10**.

**Flujos planificados:**

- Carga de página pública (Home).
- Login mock con credenciales de prueba.
- Acceso protegido al dashboard (guard).
- Visualización de tabla en un módulo académico.
- Validación visible de un formulario (ej. Login o Contacto).

---

### 2.12 Exclusiones actuales

No entran al MVP por ahora:

| Exclusión | Motivo |
|-----------|--------|
| Backend | Datos mock en cliente |
| Base de datos real | No requerida para MVP frontend |
| Supabase | No autorizado |
| Firebase | No autorizado |
| Machine Learning | Explícitamente excluido |
| Tutor inteligente | Explícitamente excluido |
| Pagos en línea | Fuera de alcance académico |
| Matrícula completamente transaccional | Solo simulación informativa en Admisión |
| Reportes PDF avanzados | No requerido para rúbrica |
| Notificaciones reales | Sin backend ni push |
| API externa | Sin integraciones |
| Chat en tiempo real | Fuera de alcance |
| Angular Material | Bootstrap 5 es la base visual |

---

## 3. Roles simulados

| Rol | Nombre visible | Propósito | Acceso esperado | Prioridad MVP |
|-----|----------------|-----------|-----------------|---------------|
| `ADMIN` | Administrador | Gestión general del sistema simulado | Acceso completo a todos los módulos `/admin/*` | **Alta** — implementar primero |
| `DIRECTOR` | Director(a) | Visión institucional y académica | Dashboard, reportes resumidos, estudiantes, docentes, cursos, notas, asistencia | Media — simular después de ADMIN |
| `TEACHER` | Docente | Gestión de cursos, notas, tareas y asistencia | Notas, horarios, tareas, recursos, asistencia, cursos asignados | Media — simular después de ADMIN |
| `STUDENT` | Estudiante | Consulta académica personal | Notas, horarios, tareas, recursos, perfil | Media — simular después de ADMIN |
| `PARENT` | Padre/Madre | Seguimiento académico del hijo(a) | Seguimiento de padres, notas, asistencia, comunicados | Media — simular después de ADMIN |

**Estrategia MVP:** implementar login y sesión mock con rol **ADMIN** en Fase 6. Ampliar credenciales y restricciones por rol con `roleGuard` cuando se autorice, sin bloquear el avance del proyecto.

**Credenciales mock sugeridas (documentar en implementación):**

```txt
admin@horizonte.edu.pe / admin123  → ADMIN
director@horizonte.edu.pe / dir123 → DIRECTOR
docente@horizonte.edu.pe / doc123  → TEACHER
alumno@horizonte.edu.pe / est123   → STUDENT
padre@horizonte.edu.pe / pad123    → PARENT
```

---

## 4. Catálogo de módulos del MVP

### 4.1 Página pública

| Módulo | Ruta | Propósito | Prioridad | Funcionalidad MVP | Mock | Formulario |
|--------|------|-----------|-----------|-------------------|------|------------|
| **Home** | `/` | Página de inicio institucional | Alta | Hero, resumen, CTAs a Admisión y Contacto, preview de noticias | Sí (noticias destacadas) | No |
| **About** | `/nosotros` | Misión, visión, valores e historia | Alta | Secciones informativas con cards | No | No |
| **Levels** | `/niveles` | Niveles educativos (Inicial, Primaria, Secundaria) | Alta | Cards por nivel con descripción simulada | Sí (contenido estático) | No |
| **Admission** | `/admision` | Proceso y requisitos de admisión | Media | Pasos del proceso, requisitos, CTA informativo (no transaccional) | Sí (texto institucional) | No |
| **News** | `/noticias` | Noticias institucionales | Alta | Listado y detalle de noticias mock | Sí (`NewsService`) | No |
| **Announcements** | `/comunicados` | Comunicados oficiales | Media | Listado de comunicados con fecha y categoría | Sí (`AnnouncementService`) | No |
| **Gallery** | `/galeria` | Galería fotográfica institucional | Media | Grid de imágenes con lightbox o modal simple | Sí (`GalleryService`) | No |
| **Contact** | `/contacto` | Formulario de contacto institucional | Alta | Formulario con validaciones visibles; envío simulado (mensaje de éxito) | No | **Sí** |
| **Login** | `/login` | Acceso a la intranet | Alta | Formulario login; redirección a dashboard | Sí (`AuthService`) | **Sí** |

---

### 4.2 Intranet privada

| Módulo | Ruta | Propósito | Prioridad | Funcionalidad MVP | Mock | Formulario |
|--------|------|-----------|-----------|-------------------|------|------------|
| **Dashboard** | `/admin/dashboard` | Panel principal con métricas | Alta | StatCards, tabla resumen, accesos rápidos | Sí | No |
| **Profile** | `/admin/perfil` | Perfil del usuario autenticado | Media | Vista de datos del usuario mock; edición básica opcional | Sí | Opcional (Baja) |
| **Grades** | `/admin/notas` | Consulta de calificaciones | Alta | Tabla de notas por estudiante/curso; filtros simples | Sí | No |
| **Schedules** | `/admin/horarios` | Horarios de clases | Alta | Tabla semanal o listado por curso/docente | Sí | No |
| **Tasks** | `/admin/tareas` | Tareas académicas | Media | Listado, detalle y registro mock de tareas | Sí | **Sí** |
| **Resources** | `/admin/recursos` | Materiales educativos | Media | Listado de recursos con tipo y enlace simulado | Sí | **Sí** |
| **Attendance** | `/admin/asistencia` | Registro y consulta de asistencia | Alta | Tabla de asistencia por fecha/curso; marcado mock | Sí | No |
| **Parent Tracking** | `/admin/seguimiento-padres` | Seguimiento académico para padres | Media | Vista consolidada: notas, asistencia, tareas del hijo(a) | Sí | No |
| **Students** | `/admin/estudiantes` | Gestión de estudiantes | Alta | Listado, detalle, registro/edición mock | Sí | **Sí** |
| **Teachers** | `/admin/docentes` | Gestión de docentes | Alta | Listado, detalle, registro/edición mock | Sí | **Sí** |
| **Parents** | `/admin/padres` | Gestión de padres de familia | Media | Listado y vínculo con estudiantes mock | Sí | No |
| **Users** | `/admin/usuarios` | Usuarios del sistema | Media | Listado administrativo; roles simulados | Sí | No |
| **Courses** | `/admin/cursos` | Gestión de cursos | Alta | Listado, detalle, registro/edición mock | Sí | **Sí** |
| **Settings** | `/admin/configuracion` | Configuración básica simulada | Baja | Opciones de tema, notificaciones mock (sin efecto real) | Sí | No |

---

## 5. Priorización resumida

### Prioridad Alta (implementar primero en código)

- Web pública: Home, About, Levels, News, Contact, Login.
- Auth mock + `authGuard`.
- Dashboard.
- Estudiantes, Docentes, Cursos, Notas, Horarios, Asistencia.
- Formularios: Login, Contacto, Estudiante, Docente.

### Prioridad Media

- Admission, Announcements, Gallery.
- Tareas, Recursos, Seguimiento padres, Padres, Usuarios, Perfil.
- Formularios: Curso, Tarea, Recurso.
- Roles adicionales (DIRECTOR, TEACHER, STUDENT, PARENT).

### Prioridad Baja

- Settings (configuración simulada).
- Edición de perfil con formulario.

---

## 6. Mapa de rutas

El mapa completo de rutas está documentado en **`ROUTE_MAP.md`**.

Resumen:

- Rutas públicas → `PublicLayout` (sin guard).
- Rutas privadas `/admin/*` → `AdminLayout` + `authGuard`.

---

## 7. Formularios principales

Formularios con **Angular Signals o Signal Forms** y validaciones visibles (implementación en Fase 9).

### 7.1 Login

| Campo | Validaciones | Mensaje visible |
|-------|--------------|-----------------|
| Email o usuario | Requerido, formato email si aplica | "El usuario es obligatorio" / "Formato de email inválido" |
| Contraseña | Requerido, mínimo 6 caracteres | "La contraseña es obligatoria" / "Mínimo 6 caracteres" |

**Prioridad:** Alta. Botón deshabilitado si inválido. Mensaje de error si credenciales incorrectas.

---

### 7.2 Contacto

| Campo | Validaciones | Mensaje visible |
|-------|--------------|-----------------|
| Nombre completo | Requerido, mínimo 3 caracteres | "Ingrese su nombre" |
| Email | Requerido, formato email | "Email inválido" |
| Asunto | Requerido | "Indique un asunto" |
| Mensaje | Requerido, mínimo 10 caracteres | "El mensaje debe tener al menos 10 caracteres" |

**Prioridad:** Alta. Envío simulado con alerta de éxito.

---

### 7.3 Estudiante

| Campo | Validaciones | Mensaje visible |
|-------|--------------|-----------------|
| Código | Requerido | "Código obligatorio" |
| Nombres | Requerido | "Nombres obligatorios" |
| Apellidos | Requerido | "Apellidos obligatorios" |
| Grado/Sección | Requerido (select) | "Seleccione grado y sección" |
| Email | Opcional, formato email | "Email inválido" |
| Fecha nacimiento | Opcional, fecha válida | "Fecha inválida" |

**Prioridad:** Alta.

---

### 7.4 Docente

| Campo | Validaciones | Mensaje visible |
|-------|--------------|-----------------|
| Código | Requerido | "Código obligatorio" |
| Nombres | Requerido | "Nombres obligatorios" |
| Apellidos | Requerido | "Apellidos obligatorios" |
| Especialidad | Requerido | "Indique especialidad" |
| Email | Requerido, formato email | "Email inválido" |

**Prioridad:** Alta.

---

### 7.5 Curso

| Campo | Validaciones | Mensaje visible |
|-------|--------------|-----------------|
| Nombre | Requerido | "Nombre del curso obligatorio" |
| Grado | Requerido (select) | "Seleccione grado" |
| Docente asignado | Requerido (select) | "Asigne un docente" |
| Año académico | Requerido | "Indique año académico" |

**Prioridad:** Media.

---

### 7.6 Tarea

| Campo | Validaciones | Mensaje visible |
|-------|--------------|-----------------|
| Título | Requerido | "Título obligatorio" |
| Curso | Requerido (select) | "Seleccione curso" |
| Fecha entrega | Requerido, fecha futura o válida | "Fecha de entrega inválida" |
| Descripción | Requerido, mínimo 10 caracteres | "Describa la tarea" |

**Prioridad:** Media.

---

### 7.7 Recurso

| Campo | Validaciones | Mensaje visible |
|-------|--------------|-----------------|
| Título | Requerido | "Título obligatorio" |
| Tipo | Requerido (select: PDF, Video, Enlace) | "Seleccione tipo" |
| Curso | Requerido (select) | "Seleccione curso" |
| URL o descripción | Requerido | "Indique URL o descripción" |

**Prioridad:** Media.

---

## 8. Criterios de avance a Fase 3

Solo se puede pasar a **Fase 3: Inicialización Angular y Bootstrap** cuando se cumpla lo siguiente:

| Criterio | Estado Fase 2 |
|----------|---------------|
| Alcance MVP claro y documentado | ✅ |
| Rutas definidas en `ROUTE_MAP.md` | ✅ |
| Módulos priorizados (Alta/Media/Baja) | ✅ |
| Interfaces TypeScript planificadas | ✅ |
| Servicios mock planificados | ✅ |
| Componentes reutilizables planificados | ✅ |
| Roles simulados documentados | ✅ |
| Formularios principales definidos | ✅ |
| Exclusiones actuales explícitas | ✅ |
| **No se ha generado código Angular** | ✅ |

**Próxima fase autorizada:** Fase 3 — ejecutar `ng new`, instalar Bootstrap 5 y crear estructura base de carpetas.

---

## 9. Stack técnico del MVP

| Tecnología | Uso |
|------------|-----|
| Angular 21 | Framework principal |
| Bootstrap 5 | UI y componentes visuales |
| TypeScript | Tipado e interfaces |
| SCSS o CSS simple | Personalización institucional |
| Servicios mock | Datos simulados |
| Guards | Protección de rutas |
| Angular Signals / Signal Forms | Formularios y estado reactivo |
| Cypress | Pruebas E2E (Fase 10) |

---

## 10. Referencias

- Requisitos completos: `SYSTEM_REQUIREMENTS.md`
- Arquitectura e interfaces/servicios: `ARCHITECTURE.md`
- Mapa de rutas: `ROUTE_MAP.md`
- Fases: `PROJECT_PHASES.md`
- Identidad visual: `UI_GUIDELINES.md`
