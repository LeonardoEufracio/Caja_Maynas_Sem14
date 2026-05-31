# Instalación y ejecución — HORIZONTE DIGITAL

## Sistema web institucional con intranet académica para la I.E.P. Horizonte

Guía para instalar dependencias y ejecutar el proyecto en desarrollo local.

**Estado actual:** Fase 3 completada — Angular 21 y Bootstrap 5 configurados.

---

## 1. Requisitos

| Requisito | Versión usada en Fase 3 |
|-----------|-------------------------|
| Node.js | v22.22.0 o superior recomendado |
| npm | 10.x o superior |
| Angular CLI | 21.2.x |
| Angular | 21.2.x |
| Bootstrap | 5.3.x |

---

## 2. Comandos usados en Fase 3

Creación del proyecto (en la carpeta raíz `colegio-horizonte`, conservando `docs/`):

```bash
npx @angular/cli@21 new colegio-horizonte --routing --style=scss --skip-git --directory . --defaults --ssr=false
```

Instalación de Bootstrap 5:

```bash
npm install bootstrap
```

Verificación de compilación:

```bash
npm run build
```

---

## 3. Instalar dependencias

Si clonas o descargas el proyecto por primera vez:

```bash
cd colegio-horizonte
npm install
```

---

## 4. Ejecutar el proyecto

Servidor de desarrollo:

```bash
npm start
```

Equivalente:

```bash
ng serve
```

Abrir en el navegador:

```txt
http://localhost:4200/
```

Deberías ver la pantalla inicial con el título **HORIZONTE DIGITAL** y el mensaje de Fase 3.

---

## 5. Detener el servidor

En la terminal donde corre `ng serve`, presionar:

```txt
Ctrl + C
```

Confirmar si el sistema lo solicita.

---

## 6. Otros comandos útiles

| Comando | Descripción |
|---------|-------------|
| `npm run build` | Compila el proyecto para producción en `dist/` |
| `npm test` | Ejecuta pruebas unitarias (Vitest) |
| `ng version` | Muestra versiones de Angular CLI y dependencias |

---

## 7. Bootstrap 5

Bootstrap se importa globalmente en `src/styles.scss`:

```scss
@import 'bootstrap/scss/bootstrap';
```

**Nota:** Sass puede mostrar un aviso de deprecación por `@import`. Es esperado en esta fase; no afecta la compilación ni la ejecución.

Variables CSS institucionales definidas en el mismo archivo:

```scss
:root {
  --horizonte-blue: #0B1F3A;
  --horizonte-dark: #071527;
  --horizonte-red: #C1121F;
  --horizonte-yellow: #F4C430;
  --horizonte-gray-light: #F3F4F6;
  --horizonte-gray: #9CA3AF;
  --horizonte-gray-dark: #4B5563;
  --horizonte-white: #FFFFFF;
}
```

Clases utilitarias mínimas: `.text-horizonte-blue`, `.bg-horizonte-blue`, `.btn-horizonte-primary`, `.section-padding`.

No se instalaron librerías visuales adicionales (sin Angular Material).

---

## 8. Estructura base creada

Carpetas preparadas bajo `src/app/` (con `.gitkeep`; sin componentes generados aún):

```txt
layouts/          → public-layout, admin-layout
pages/            → home, about, levels, … settings (23 carpetas)
components/       → navbar, footer, sidebar, … empty-state
services/
interfaces/
guards/
data/
```

---

## 9. Estado de la Fase 3

| Elemento | Estado |
|----------|--------|
| Proyecto Angular 21 | ✅ Creado |
| Bootstrap 5 | ✅ Instalado y configurado |
| Estilos globales institucionales | ✅ En `src/styles.scss` |
| Estructura base de carpetas | ✅ Creada |
| Layouts y navegación base | ✅ Fase 4 — ver abajo |

---

## 10. Estado de la Fase 4

| Elemento | Estado |
|----------|--------|
| `PublicLayout`, `AdminLayout` | ✅ Implementados |
| `Navbar`, `Footer`, `Sidebar` | ✅ Implementados |
| Rutas base | ✅ `/`, `/login`, `/admin/dashboard` |

---

## 11. Estado de la Fase 5

| Elemento | Estado |
|----------|--------|
| Web pública premium | ✅ 9 páginas activas |
| `PageHeader` | ✅ Componente reutilizable |
| Formulario contacto | ✅ Visual (sin Signals) |
| Autenticación / guards | ❌ Fase 6 |

---

## 12. Próxima fase

**Fase 6 — Login, autenticación simulada y guards.**

No avanzar sin autorización.

---

## Referencias

- Requisitos del sistema: `SYSTEM_REQUIREMENTS.md`
- Arquitectura: `ARCHITECTURE.md`
- Mapa de rutas planificado: `ROUTE_MAP.md`
- Historial de cambios: `CHANGELOG.md`
