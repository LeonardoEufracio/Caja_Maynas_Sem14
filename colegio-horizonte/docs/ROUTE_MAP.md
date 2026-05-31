# Mapa de rutas — HORIZONTE DIGITAL

## Sistema web institucional con intranet académica para la I.E.P. Horizonte

Este documento define la **propuesta de rutas** del MVP. Las rutas son simples, en español donde corresponde en URL pública, y están agrupadas por layout y protección.

**Estado:** Planificación completada en **Fase 2**. Implementación en código a partir de **Fase 3**.

---

## 1. Convenciones

| Convención | Descripción |
|------------|-------------|
| Rutas públicas | Prefijo raíz `/`; layout `PublicLayout`; **sin** guard |
| Rutas privadas | Prefijo `/admin/`; layout `AdminLayout`; protegidas con **`authGuard`** |
| Login | Ruta pública `/login`; tras éxito redirige a `/admin/dashboard` |
| 404 | Ruta comodín redirige a Home o página de error simple |
| Carpeta `pages/` | Nombres en inglés (ej. `home`, `students`); URLs en español donde se indica |

---

## 2. Diagrama de routing

```
                         ┌─────────────────┐
                         │   app.routes    │
                         └────────┬────────┘
                                  │
              ┌───────────────────┴───────────────────┐
              │                                       │
     ┌────────▼────────┐                    ┌─────────▼─────────┐
     │  PublicLayout   │                    │   AdminLayout     │
     │  (sin guard)    │                    │  + authGuard      │
     └────────┬────────┘                    └─────────┬─────────┘
              │                                       │
    /, /nosotros, /login,                    /admin/dashboard,
    /niveles, /admision,                     /admin/estudiantes,
    /noticias, /comunicados,                 /admin/notas, ...
    /galeria, /contacto
```

---

## 3. Rutas públicas

**Layout:** `PublicLayout`  
**Guard:** ninguno  
**Componentes asociados (carpeta `pages/`):**

| Ruta URL | Página | Componente | Descripción |
|----------|--------|------------|-------------|
| `/` | Home | `home` | Inicio institucional |
| `/nosotros` | About | `about` | Misión, visión, valores |
| `/niveles` | Levels | `levels` | Niveles educativos |
| `/admision` | Admission | `admission` | Proceso de admisión |
| `/noticias` | News | `news` | Listado de noticias |
| `/comunicados` | Announcements | `announcements` | Comunicados oficiales |
| `/galeria` | Gallery | `gallery` | Galería fotográfica |
| `/contacto` | Contact | `contact` | Formulario de contacto |
| `/login` | Login | `login` | Acceso a intranet |

### Rutas públicas adicionales (opcionales)

| Ruta URL | Descripción |
|----------|-------------|
| `/noticias/:id` | Detalle de noticia (opcional en MVP) |
| `/comunicados/:id` | Detalle de comunicado (opcional en MVP) |

---

## 4. Rutas privadas (intranet)

**Layout:** `AdminLayout`  
**Guard:** `authGuard` (obligatorio en todas las rutas del grupo)  
**Prefijo base:** `/admin`

| Ruta URL | Página | Componente | Módulo |
|----------|--------|------------|--------|
| `/admin/dashboard` | Dashboard | `dashboard` | Panel principal |
| `/admin/perfil` | Profile | `profile` | Perfil de usuario |
| `/admin/notas` | Grades | `grades` | Calificaciones |
| `/admin/horarios` | Schedules | `schedules` | Horarios |
| `/admin/tareas` | Tasks | `tasks` | Tareas |
| `/admin/recursos` | Resources | `resources` | Recursos |
| `/admin/asistencia` | Attendance | `attendance` | Asistencia |
| `/admin/seguimiento-padres` | Parent Tracking | `parent-tracking` | Seguimiento padres |
| `/admin/estudiantes` | Students | `students` | Estudiantes |
| `/admin/docentes` | Teachers | `teachers` | Docentes |
| `/admin/padres` | Parents | `parents` | Padres |
| `/admin/usuarios` | Users | `users` | Usuarios |
| `/admin/cursos` | Courses | `courses` | Cursos |
| `/admin/configuracion` | Settings | `settings` | Configuración |

### Redirecciones privadas sugeridas

| Ruta | Comportamiento |
|------|----------------|
| `/admin` | Redirige a `/admin/dashboard` |
| Ruta privada sin sesión | `authGuard` redirige a `/login` |
| `/login` con sesión activa | Redirige a `/admin/dashboard` (opcional) |

---

## 5. Guards aplicados

| Guard | Rutas | Comportamiento |
|-------|-------|----------------|
| `authGuard` | Todas las rutas `/admin/*` | Si no hay sesión mock → redirect `/login?returnUrl=...` |
| `roleGuard` | Subconjunto futuro (opcional) | Si rol no autorizado → redirect `/admin/dashboard` o página de acceso denegado |

**Nota Fase 2:** solo se planifica `authGuard`. `roleGuard` se documenta para implementación posterior.

---

## 6. Estructura propuesta en `app.routes.ts` (referencia)

Documentación conceptual; **no implementar hasta Fase 3**:

```typescript
// Estructura conceptual — Fase 3
const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'nosotros', component: AboutPage },
      { path: 'niveles', component: LevelsPage },
      { path: 'admision', component: AdmissionPage },
      { path: 'noticias', component: NewsPage },
      { path: 'comunicados', component: AnnouncementsPage },
      { path: 'galeria', component: GalleryPage },
      { path: 'contacto', component: ContactPage },
      { path: 'login', component: LoginPage },
    ],
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPage },
      { path: 'perfil', component: ProfilePage },
      { path: 'notas', component: GradesPage },
      { path: 'horarios', component: SchedulesPage },
      { path: 'tareas', component: TasksPage },
      { path: 'recursos', component: ResourcesPage },
      { path: 'asistencia', component: AttendancePage },
      { path: 'seguimiento-padres', component: ParentTrackingPage },
      { path: 'estudiantes', component: StudentsPage },
      { path: 'docentes', component: TeachersPage },
      { path: 'padres', component: ParentsPage },
      { path: 'usuarios', component: UsersPage },
      { path: 'cursos', component: CoursesPage },
      { path: 'configuracion', component: SettingsPage },
    ],
  },
  { path: '**', redirectTo: '' },
];
```

---

## 7. Navegación en UI

### Navbar público (enlaces)

```txt
Inicio → /
Nosotros → /nosotros
Niveles → /niveles
Admisión → /admision
Noticias → /noticias
Comunicados → /comunicados
Galería → /galeria
Contacto → /contacto
Ingresar → /login
```

### Sidebar intranet (enlaces)

```txt
Dashboard → /admin/dashboard
Estudiantes → /admin/estudiantes
Docentes → /admin/docentes
Padres → /admin/padres
Usuarios → /admin/usuarios
Cursos → /admin/cursos
Notas → /admin/notas
Horarios → /admin/horarios
Tareas → /admin/tareas
Recursos → /admin/recursos
Asistencia → /admin/asistencia
Seguimiento padres → /admin/seguimiento-padres
Perfil → /admin/perfil
Configuración → /admin/configuracion
```

---

## 8. Relación ruta ↔ servicio mock

| Ruta | Servicio principal |
|------|-------------------|
| `/noticias` | `NewsService` |
| `/comunicados` | `AnnouncementService` |
| `/galeria` | `GalleryService` |
| `/login` | `AuthService` |
| `/admin/dashboard` | `DashboardService` |
| `/admin/estudiantes` | `StudentService` |
| `/admin/docentes` | `TeacherService` |
| `/admin/padres` | `ParentService` |
| `/admin/cursos` | `CourseService` |
| `/admin/notas` | `GradeService` |
| `/admin/horarios` | `ScheduleService` |
| `/admin/tareas` | `TaskService` |
| `/admin/recursos` | `ResourceService` |
| `/admin/asistencia` | `AttendanceService` |

---

## 9. Referencias

- Alcance MVP: `MVP_SCOPE.md`
- Arquitectura: `ARCHITECTURE.md`
- Requisitos: `SYSTEM_REQUIREMENTS.md`
