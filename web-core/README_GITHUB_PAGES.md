# Publicacion de web-core en GitHub Pages

El proyecto ya esta preparado para compilarse desde la carpeta `web-core` y publicarse con GitHub Actions.

## Antes de publicar

1. En GitHub, entra al repositorio `Caja_Maynas_Sem14`.
2. Ve a `Settings > Pages`.
3. En `Build and deployment`, selecciona `GitHub Actions`.
4. Ve a `Settings > Secrets and variables > Actions > Variables`.
5. Crea la variable `VITE_BASE_URL` con la URL HTTPS publica del backend `core-api`.

Ejemplo:

```text
VITE_BASE_URL=https://tu-backend-publico.com
```

No uses `localhost` en GitHub Pages porque el navegador intentaria llamar a la computadora del usuario.

## Build local para Pages

Desde `web-core`:

```bash
npm run build:pages
```

El resultado queda en `web-core/dist`.

## URL esperada

Cuando GitHub Pages termine de desplegar, la web quedara bajo:

```text
https://leonardoeufracio.github.io/Caja_Maynas_Sem14/
```

La app usa rutas con hash (`#/inicio`, `#/login`, etc.) para que las recargas funcionen correctamente en GitHub Pages.
