# EduEval Local como aplicación instalable (PWA)

Esta carpeta es **todo lo que hay que publicar**. No necesita servidor propio ni base de datos:
son archivos estáticos. Los datos de cada docente se guardan cifrados **en su propio dispositivo**;
el servidor solo entrega la aplicación.

## Contenido
| Archivo | Para qué sirve |
|---|---|
| `index.html` | La aplicación completa (la v2.16) |
| `manifest.webmanifest` | Nombre, iconos y colores para instalarla |
| `sw.js` | Guarda la aplicación en el dispositivo (uso sin conexión) y gestiona las actualizaciones |
| `icons/` | Iconos de la aplicación |
| `_headers` | Cabeceras de seguridad (se usan en Cloudflare Pages y Netlify) |

## Cómo publicarla (elige una)

**Opción A. Cloudflare Pages o Netlify (recomendada, aplica las cabeceras de seguridad)**
1. Crea una cuenta gratuita.
2. Crea un proyecto nuevo y sube esta carpeta (arrastrar y soltar, sin configurar «build»).
3. Te da una dirección `https://….pages.dev` o `https://….netlify.app`. Puedes enlazar tu propio dominio.

**Opción B. GitHub Pages**
1. Crea un repositorio y sube estos archivos a la raíz.
2. En Settings → Pages elige la rama principal.
3. No aplica el archivo `_headers`: la aplicación sigue protegida por la política de seguridad que ya lleva dentro, pero sin las cabeceras adicionales.

**Opción C. Servidor del centro o de la Consejería**
Sirve la carpeta por **HTTPS** (obligatorio) y copia en el servidor las cabeceras de `_headers`. Además:
`sw.js`, `index.html` y `manifest.webmanifest` deben servirse con `Cache-Control: no-cache` para que las actualizaciones lleguen.

## Cómo actualizar
1. Sustituye los archivos por los de la nueva versión (siempre la carpeta entera).
2. Los usuarios verán el aviso «Hay una versión nueva» la próxima vez que abran la aplicación y pulsarán «Actualizar ahora».
3. Los datos no se tocan en la actualización.

## Importante antes de abrirla a otros docentes
- **Elige la dirección definitiva antes de empezar.** Los datos quedan ligados al dominio: si cambia, cada docente tendría que migrar con una copia de seguridad.
- **La contraseña no se puede recuperar.** Quien la olvide pierde sus datos si no tiene copia. Conviene decirlo claramente en la guía para el profesorado.
- **Copias de seguridad:** la copia automática a carpeta solo funciona en Chrome y Edge (ordenador y Android). En iPhone, iPad y Firefox hay que exportar copias a mano.
- **iPhone y iPad:** instalar desde Safari con Compartir → «Añadir a pantalla de inicio». Sin instalar, Safari puede borrar los datos de una web que no se usa durante semanas.
- **IA (Gemini):** cada docente usa su propia clave de API. Solo se envía texto no personal, con vista previa y opción de cancelar.
- **Legal:** conviene revisar con el delegado de protección de datos del centro o la Consejería, añadir un aviso legal y comprobar las licencias de las librerías incluidas (SheetJS, Chart.js, Font Awesome, Tailwind).

## Cómo comprobar que funciona
1. Abre la dirección en Chrome o Edge: debe aparecer la opción «Instalar» en la barra de direcciones.
2. En **Copias de seguridad**, la tarjeta «Instalar y usar sin conexión» debe decir «Lista para funcionar sin conexión».
3. Con la aplicación abierta, desconecta internet y recarga: debe abrirse igual y tus datos seguir ahí.

## Versión de archivo único
Además de esta carpeta tienes `edueval_local_v2.16.html`: la misma aplicación en un solo archivo para usar sin publicar nada
(tal como la usas ahora). Esa versión no se instala ni funciona como PWA.
