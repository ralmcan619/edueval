# Licencias: prueba de 30 días y pago único (9 €)

La aplicación incluye un sistema de licencias **que está apagado por defecto**. Se enciende solo cuando publicas
un archivo `licencia-config.json` junto a `index.html`. Sin ese archivo, EduEval funciona libre, como hasta ahora.

## Cómo funciona para el usuario
1. Abre la dirección, crea su contraseña y usa **todas las funciones durante 30 días** (cuenta desde el primer uso en ese dispositivo).
2. Una etiqueta abajo a la izquierda le recuerda los días que quedan (se pone ámbar en la última semana).
3. Compra la licencia en tu enlace de pago. Recibe una clave por correo y la pega en **Copias de Seguridad → Licencia**.
4. La clave se comprueba **una sola vez, con conexión**. Después la aplicación funciona sin conexión para siempre.
5. Si la prueba termina sin licencia, aparece una ventana que pide la clave. **Los datos nunca quedan retenidos:** desde esa ventana siempre se puede exportar una copia completa.
6. Cada ~30 días, si hay conexión, la app vuelve a preguntar si la clave sigue siendo válida (por ejemplo, si se reembolsó). Sin conexión no pasa nada.

Solo viajan a la plataforma de pago la clave y una etiqueta del dispositivo. **Nunca datos de alumnado.**

## Qué plataforma de pago usar
**Lemon Squeezy ya no sirve:** anuncia su cierre el 31 de marzo de 2027 y no admite altas.

| Opción | Cuándo elegirla | Ojo con |
|---|---|---|
| **Polar** (recomendada para empezar) | Es «comerciante registrado»: cobra y gestiona el IVA europeo por ti. Tiene claves de licencia con límite de dispositivos. Comisión aproximada: 4–5 % + 40 céntimos. | Sus pagos a España van por Stripe Connect; **comprueba al registrarte que admite vendedores particulares en España**. No tiene PayPal. Es una empresa joven. |
| **Gumroad** (plan B) | Muy establecida, admite particulares, claves de licencia incluidas. También gestiona el IVA. | Comisión más alta (en torno al 10 % + tarifas). El límite de dispositivos lo controla la app (`maxDispositivos`), no la plataforma. |

Las tarifas y condiciones cambian: compruébalas en su web antes de decidir.

## Puesta en marcha con Polar (los nombres de los menús pueden variar)
1. Crea una cuenta y una organización en polar.sh y completa la verificación de pagos.
2. Crea un **producto de pago único**: «EduEval Local, licencia vitalicia», 9 €. Revisa cómo muestra los impuestos (IVA incluido o aparte).
3. Añade al producto la ventaja **Clave de licencia (License key)**: límite de activaciones = 3, sin caducidad, prefijo `EDUEVAL` (opcional).
4. Copia el **ID de la organización** (en los ajustes de la organización) y el **enlace de compra** (checkout link) del producto.
5. Copia `licencia-config.ejemplo.json` como `licencia-config.json` y rellénalo:
   - `urlCompra`: el enlace de compra.
   - `polar.organizationId`: el ID de la organización.
   - Deja `"proveedor": "polar"`, `"diasPrueba": 30`.
6. Sube `licencia-config.json` a Netlify junto al resto de archivos (vuelve a desplegar la carpeta).
7. **Prueba antes de anunciarla:** crea un código de descuento del 100 % para ti, «compra» el producto, recibe la clave y actívala en un navegador limpio. Comprueba también que una 4.ª activación se rechaza.

## Puesta en marcha con Gumroad (plan B)
1. Crea el producto de 9 € y activa en su contenido el bloque de **clave de licencia**.
2. En `licencia-config.json` pon `"proveedor": "gumroad"`, `gumroad.productId` con el identificador del producto (lo indica su documentación de licencias) y `urlCompra`.
3. Prueba igual que arriba.

## Si al activar sale «No se ha podido conectar» aunque haya internet
Algunas plataformas no permiten llamadas desde el navegador. No he podido comprobarlo contra sus servidores reales desde aquí. En ese caso usa el **plan B**, en la carpeta `opcional-proxy-licencias`:
una pequeña función de Netlify que hace la comprobación desde el servidor. Requiere desplegar desde un repositorio de GitHub (no vale arrastrar la carpeta). Después pon en `licencia-config.json` `"endpoint": "/api/licencias"`.

## Límites que conviene conocer
- Como toda aplicación que se ejecuta en el dispositivo del usuario, **un usuario técnico puede saltarse el control**. A 9 € lo razonable es dificultarlo, no impedirlo.
- Si el usuario borra los datos del navegador, pierde también la prueba y la licencia (tendrá que volver a pegar su clave) y, desde luego, sus datos: de ahí la insistencia en las copias.
- Cada clave se puede activar en el número de dispositivos que fijes (3 es razonable: ordenador, móvil y tablet).

## Antes de vender (no es asesoramiento legal)
- Alta fiscal y, si eres personal docente público, **compatibilidad** para actividad privada.
- **Condiciones de venta:** define «vitalicio» (la vida del producto, no la tuya), qué actualizaciones y soporte incluye, y el derecho de desistimiento de 14 días en contenido digital.
- **Política de privacidad** (tratas solo correo y datos de compra, en la plataforma) y aviso legal.
