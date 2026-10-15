# WELD Company

E-commerce de indumentaria urbana con React 19, Vite 8, React Bootstrap, React Router y React Icons. Usa Axios para consultar Georef, SweetAlert2 para errores y EmailJS para enviar el detalle del pedido. Incluye CSS, Google Fonts y mapas de Google Maps.

**Integrantes:** Joaquin Bernardo, Leonel Ferrari, Santiago Juarez y Santiago Acosta.

## Ejecutar el proyecto

Desde la carpeta que contiene `package.json`:

```bash
npm install
npm run dev
```

Creá un `.env` en esa misma carpeta:

```env
VITE_API_URL=https://apis.datos.gob.ar/georef/api
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

Configurá los identificadores de tu cuenta y plantilla de EmailJS. Reiniciá Vite después de cambiar variables. `.env` está excluido de Git; en Vercel configurá las variables y volvé a desplegar. En PowerShell, usá `npm.cmd` si se bloquea `npm.ps1`.

| Comando                | Uso                        |
| ---------------------- | -------------------------- |
| `npm run dev`          | Desarrollo                 |
| `npm run build`        | Compilación en `dist/`     |
| `npm run preview`      | Vista previa de producción |
| `npm run lint`         | ESLint                     |
| `npm run format`       | Formato con Prettier       |
| `npm run format:check` | Verificar formato          |

## Funcionalidades y alcance

- Catálogo de ocho productos en ARS, galería, talles y cantidades. El descuento por transferencia del 10% es informativo y no se aplica al carrito.
- Carrito lateral con variantes por producto y talle, subtotal, envío y total. El envío cuesta **$10.000**; es gratis desde **$120.000 de subtotal**.
- Perfil y dirección guardados en `localStorage` bajo `weld-perfil`. Las provincias se cargan desde Georef con Axios, `useEffect`, estados de datos/carga/error y opción de reintento.
- Finalizar requiere un perfil. EmailJS envía el número de pedido, productos y dirección; el carrito se vacía si el envío resulta correcto y se conserva si falla.
- Inicio, Nosotros, preguntas frecuentes, sucursales con mapas y galerías, contacto y enlaces a redes. Diseño responsive y franja de envío que respeta la preferencia de reducir movimiento.

**Límites:** el carrito vive en memoria y se pierde al recargar o abrir otra pestaña. No hay base de datos, contraseñas, autenticación ni procesamiento/verificación de pagos. Los pedidos son de demostración y no se registran en un servidor. El formulario de contacto valida los campos, pero no envía ni guarda mensajes. Los textos de pagos y entregas no representan integraciones implementadas.

## Archivos y edición

| Archivo o carpeta                                          | Responsabilidad                                  |
| ---------------------------------------------------------- | ------------------------------------------------ |
| `src/main.jsx` y `src/App.jsx`                             | Entrada, Bootstrap, estructura, perfil y carrito |
| `src/components/home.jsx`                                  | Inicio con `Banner` y `Productos`                |
| `src/components/routes/Rutas.jsx`                          | Rutas                                            |
| `src/pages/Registro.jsx` y `Perfil.jsx`                    | Registro, provincias y perfil local              |
| `src/components/FormularioCuenta.jsx`                      | Campos reutilizables del registro                |
| `src/data/products.js`                                     | Catálogo                                         |
| `src/components/ProductosCard.jsx` y `ProductoDetalle.jsx` | Fotos, detalle, talle y cantidad                 |
| `src/components/Carrito.jsx`                               | Resumen y finalización                           |
| `src/utils/carrito.js` y `precios.js`                      | Operaciones, envío y formato ARS                 |
| `src/services/emailService.js`                             | Parámetros y HTML de productos para EmailJS      |
| `src/components/FranquiciasPage.jsx`                       | Datos de sucursales y galerías                   |
| `public/img/`                                              | Imágenes referenciadas como `/img/archivo.png`   |
| `src/index.css` y CSS de componentes                       | Estilos globales y responsive                    |

Cada producto requiere `id` único, `name`, `sizes`, `price` numérico, `description` e `images`:

```js
{
  id: 1,
  name: 'CAMISA WELD BLUE',
  sizes: ['S', 'M', 'L', 'XL'],
  price: 55000,
  description: 'Descripción del producto.',
  images: ['/img/foto-frente.png', '/img/foto-espalda.png'],
}
```

El envío se ajusta con `COSTO_ENVIO` y `UMBRAL_ENVIO_GRATIS` en `carrito.js`. Las sucursales se editan en el arreglo `branches`. El correo usa la primera imagen de cada producto y el dominio público definido en `emailService.js`; las imágenes deben estar accesibles desde internet.

## Etiquetas SEO

Las etiquetas generales se configuran en el `<head>` de `index.html`:

| Etiqueta | Configuración y función |
| --- | --- |
| `<html lang="es">` | Indica que el contenido está en español. |
| `<title>` | Define el título general: `Weld Company \| Ropa urbana`. |
| `meta name="description"` | Resume la marca y su colección de ropa urbana. |
| `meta name="keywords"` | Incluye la marca y términos del catálogo, como streetwear, remeras, camisas y jeans. |
| `meta name="author"` | Identifica a `Weld Company` como autor. |
| `meta name="robots"` | Declara `index, follow` para permitir la indexación y el seguimiento de enlaces. |
| `meta name="viewport"` | Ajusta la visualización al ancho del dispositivo. |
| Open Graph | `og:site_name`, `og:title`, `og:description` y `og:type` describen el sitio al compartir enlaces. |
| Imagen Open Graph | `og:image` apunta a `/img/weldbannercompu.png`; `og:image:alt` contiene `Weld Company: ropa urbana`. |

Además, `index.html` define UTF-8, el favicon y el color del navegador (`theme-color`).

## Rutas y despliegue

`/`, `/productos`, `/producto/:id`, `/registro`, `/perfil`, `/preguntas`, `/contacto`, `/nosotros`, `/franquicias` y `/franquicias/sucursales`.

`/login` redirige a registro o perfil; las rutas desconocidas muestran una página no encontrada. El hosting debe servir `index.html` para las rutas de React Router; `vercel.json` incluye esa configuración.

## Verificación

```bash
npm run lint
npm run format:check
npm run build
```

Para revisar la interfaz: crear un perfil, recargar, agregar productos de distintos talles, comprobar envío y dirección, finalizar y cerrar sesión. El envío real depende de la configuración de EmailJS y la consulta de provincias de la disponibilidad de Georef.
