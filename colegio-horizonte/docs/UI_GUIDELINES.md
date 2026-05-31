# Guía de interfaz — HORIZONTE DIGITAL

## Sistema web institucional con intranet académica para la I.E.P. Horizonte

Este documento define la **identidad visual** y los **criterios de diseño** del proyecto. Debe aplicarse de forma consistente en la web pública y en la intranet académica.

---

## 1. Identidad visual institucional

HORIZONTE DIGITAL representa a la **I.E.P. Horizonte**. La interfaz debe transmitir:

- Seriedad institucional.
- Modernidad y profesionalismo.
- Confianza para padres, estudiantes y docentes.
- Claridad funcional en la intranet tipo ERP.

---

## 2. Paleta de colores

### Colores principales

| Nombre | Hex | Uso sugerido |
|--------|-----|--------------|
| Azul marino | `#0B1F3A` | Header público, sidebar intranet, fondos principales |
| Azul oscuro | `#071527` | Fondos profundos, hover en navegación, contraste |
| Rojo institucional | `#C1121F` | Acentos, CTAs importantes, alertas críticas |
| Amarillo institucional | `#F4C430` | Destacados, badges, elementos de énfasis |
| Blanco | `#FFFFFF` | Texto sobre fondos oscuros, fondos de cards |

### Colores neutros (plomo)

| Nombre | Hex | Uso sugerido |
|--------|-----|--------------|
| Plomo claro | `#F3F4F6` | Fondos de sección, cards secundarias |
| Plomo medio | `#9CA3AF` | Texto secundario, bordes suaves, placeholders |
| Plomo oscuro | `#4B5563` | Texto principal en fondos claros, subtítulos |

### Ejemplo de aplicación

```css
:root {
  --color-navy: #0B1F3A;
  --color-navy-dark: #071527;
  --color-red: #C1121F;
  --color-yellow: #F4C430;
  --color-gray-light: #F3F4F6;
  --color-gray-medium: #9CA3AF;
  --color-gray-dark: #4B5563;
  --color-white: #FFFFFF;
}
```

*(Implementación real en SCSS/CSS durante Fase 3.)*

---

## 3. Tipografía y legibilidad

- Usar fuentes del sistema o fuentes web legibles (sin librerías pesadas innecesarias).
- Jerarquía clara: títulos de página, subtítulos, cuerpo, etiquetas de formulario.
- Contraste suficiente entre texto y fondo (accesibilidad básica).
- En intranet: densidad informativa moderada; evitar páginas sobrecargadas.

---

## 4. Estilo visual esperado

### 4.1 Página pública premium

La web institucional debe sentirse como el sitio oficial de un colegio privado de calidad:

- **Hero moderno** en inicio con imagen o gradiente institucional y mensaje claro.
- **Header fijo o sticky** con logo/nombre institucional y navegación principal.
- **Secciones amplias** con buen espaciado (whitespace).
- **Cards profesionales** para niveles, noticias, comunicados y admisión.
- **Llamados a la acción (CTA)** visibles: “Admisión”, “Contacto”, “Ingresar”.
- **Footer institucional** con datos de contacto, enlaces y copyright.
- **Responsive:** mobile-first; menú colapsable en móvil (Bootstrap navbar).

### 4.2 Intranet tipo ERP

La zona privada debe parecer un **sistema académico real**:

- **Sidebar administrativo** con iconos o texto para cada módulo.
- **Navbar interno** con nombre de usuario, rol simulado y opción de cerrar sesión.
- **Dashboard** con cards de métricas (StatCard) y tablas resumen.
- **Tablas Bootstrap** para listados (estudiantes, docentes, cursos, etc.).
- **Formularios claros** con labels, validaciones visibles y botones de acción.
- **Estados vacíos** (EmptyState) cuando no hay registros.
- Fondo general claro (`#F3F4F6` o blanco) con sidebar en azul marino.

---

## 5. Bootstrap 5 como base

- Usar **Bootstrap 5** para grid, utilidades, componentes y responsive.
- Personalizar colores institucionales sobre variables Bootstrap o CSS custom.
- Componentes Bootstrap frecuentes:
  - `container`, `row`, `col-*`
  - `card`, `card-body`, `card-header`
  - `table`, `table-striped`, `table-hover`
  - `form-control`, `form-label`, `form-select`
  - `btn`, `btn-primary`, `btn-outline-*`
  - `navbar`, `nav`, `dropdown`
  - `alert`, `badge`
  - `modal` (si se requiere confirmación)

**No usar Angular Material** salvo autorización explícita posterior.

---

## 6. Componentes UI reutilizables

| Componente | Descripción visual |
|------------|-------------------|
| Navbar | Logo + enlaces; fondo azul marino en público; variante compacta en intranet |
| Footer | Fondo oscuro, texto claro, columnas de enlaces |
| Sidebar | Ancho fijo, fondo `#0B1F3A`, ítem activo resaltado |
| PageHeader | Título H1/H2, subtítulo opcional, breadcrumb |
| StatCard | Card con número grande, etiqueta y color de acento |
| DataTable | Tabla con encabezado, filas alternadas, acciones por fila |
| EmptyState | Icono o ilustración simple + mensaje + botón opcional |

---

## 7. Formularios y validaciones

Los formularios son críticos para la rúbrica académica:

- Labels visibles sobre cada campo.
- Mensajes de error **debajo del campo** en color de alerta (rojo institucional o Bootstrap `text-danger`).
- Campos inválidos con borde rojo (`is-invalid` de Bootstrap).
- Botón submit **deshabilitado** cuando el formulario es inválido (Signal Forms / Signals).
- Agrupación lógica en cards o secciones.

Formularios principales: Login, Contacto, estudiante, docente, curso, tarea/recurso.

---

## 8. Responsive design

| Breakpoint | Comportamiento |
|------------|----------------|
| Móvil (< 768px) | Navbar colapsable; sidebar oculto o drawer; tablas con scroll horizontal |
| Tablet (768px – 991px) | Grid de 2 columnas en cards; sidebar reducido opcional |
| Escritorio (≥ 992px) | Layout completo; sidebar visible; dashboard en grid amplio |

Usar clases responsive de Bootstrap (`col-md-*`, `d-none d-lg-block`, etc.).

---

## 9. Iconografía e imágenes

- Preferir iconos simples (Bootstrap Icons o SVG inline) si se incorporan.
- Imágenes institucionales: placeholders o assets locales; evitar dependencias externas frágiles.
- Galería: grid de imágenes con aspect ratio consistente.

---

## 10. Estados de interfaz

| Estado | Tratamiento visual |
|--------|-------------------|
| Carga | Spinner Bootstrap o skeleton simple |
| Vacío | Componente EmptyState |
| Error | Alert Bootstrap con mensaje claro |
| Éxito | Alert verde o toast simple (opcional) |
| Hover / Active | Transiciones suaves en botones y enlaces del sidebar |

---

## 11. Lo que evitar

- Paletas de colores ajenas a la institución.
- Animaciones excesivas o distractoras.
- Tipografías decorativas difíciles de leer.
- Layouts sobrecargados con demasiados colores simultáneos.
- Librerías UI adicionales que compitan con Bootstrap.
- Diseño que no funcione en móvil.

---

## 12. Estado actual

Esta guía es **documentación de referencia** (Fase 1). Los estilos se implementarán a partir de la **Fase 3** (Bootstrap) y se aplicarán progresivamente en las Fases 4–9.

---

## Referencia

- Colores y criterios generales: `SYSTEM_REQUIREMENTS.md` (sección 4)
- Arquitectura de componentes: `ARCHITECTURE.md`
