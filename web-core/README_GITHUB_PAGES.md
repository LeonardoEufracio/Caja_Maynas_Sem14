# Publicacion de web-core en GitHub Pages

El proyecto ya esta preparado para compilarse desde la carpeta `web-core` y publicarse con GitHub Actions.

## Antes de publicar

1. En GitHub, entra al repositorio `Caja_Maynas_Sem14`.
2. Ve a `Settings > Pages`.
3. En `Build and deployment`, selecciona `GitHub Actions`.
4. El workflow ya usa por defecto el backend publicado en Railway.

Backend configurado:

```text
https://cajamaynassem14-production.up.railway.app
```

Opcionalmente puedes crear la variable `VITE_BASE_URL` en `Settings > Secrets and variables > Actions > Variables` si deseas reemplazar el backend sin tocar codigo.

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
