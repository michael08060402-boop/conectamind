# Conecta Mind

Sitio estatico con HTML, CSS y JavaScript, sin compilacion.

## Estructura

```text
index.html                  Pagina principal
servicios.html              Detalle de servicios
assets/
  css/
    typography.css          Fuentes y variables tipograficas
    main.css                Estilos y responsive
  js/
    main.js                 Navegacion, menu y modal
    pdf-viewer.mjs           Visor movil de PDF
  images/                   Logos, fondos e imagenes
  documents/                Documentos PDF
vendor/pdfjs/               Libreria PDF.js y licencia
```

## Desarrollo

Abre index.html con Live Server o ejecuta `python -m http.server 5500`
desde la raiz y visita http://localhost:5500. Usa HTTP para cargar modulos y PDF.

## Tipografia

Edita `assets/css/typography.css`:

- `--font-text`: texto general y navegacion.
- `--font-heading`: titulos generales.
- `--font-brand`: titulo manuscrito de portada, Parisienne.
- `--font-accent`: Sobre mi y botones principales, Pacifico.

Parisienne y Pacifico se cargan desde Google Fonts mediante el import central.
Al cambiar una fuente externa, actualiza tambien ese import. Los tamanos,
pesos y espaciados se encuentran junto a cada componente en `main.css`.

## Publicacion

Conserva las dos paginas HTML en la raiz. Publica `assets` y `vendor` completos,
incluidos los modulos `.mjs` y el worker de PDF.js. En Firebase Hosting el
directorio publico sigue siendo `.`; no se modifica la configuracion de Hosting.

Para cambiar el PDF, reemplaza el documento o actualiza las tres referencias
en index.html: enlace original, data-pdf e iframe. La ruta data-pdf se resuelve
desde la pagina HTML; los imports de JavaScript, desde el modulo que los usa.
