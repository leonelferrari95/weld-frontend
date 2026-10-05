# Weld Company

E-commerce frontend de indumentaria urbana desarrollado con React y Vite. Incluye catálogo, detalle de productos, carrito de compras, preguntas frecuentes, contacto y una sección de sucursales con mapas y galerías. La navegación entre vistas se resuelve con la URL y la API History del navegador, sin React Router.

## Integrantes

- Joaquin Bernardo
- Leonel Ferrari
- Santiago Juarez
- Santiago Acosta

## Tecnologías

- React 19 y JavaScript
- Vite 8
- Bootstrap 5 y React Bootstrap
- React Router
- React Icons
- CSS y Google Fonts
- Node.js Test Runner para las pruebas
- Google Maps embebido para las ubicaciones de las sucursales

## Desarrollo

Desde la carpeta que contiene `package.json`:

```bash
npm install
npm run dev
```

Abrí la dirección que muestra Vite. En PowerShell, si la política de ejecución bloquea `npm.ps1`, usá `npm.cmd` en lugar de `npm`.

| Comando                | Uso                                                    |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Servidor de desarrollo                                 |
| `npm run build`        | Compilación de producción en `dist/`                   |
| `npm run preview`      | Vista previa de la compilación                         |
| `npm run lint`         | Revisión con ESLint                                    |
| `npm test`             | Pruebas de cantidades, productos y totales del carrito |
| `npm run format`       | Formato e indentación con Prettier                     |
| `npm run format:check` | Comprueba el formato sin modificar archivos            |

## Funcionalidades

- Catálogo de ocho productos con precios en pesos argentinos, imágenes y acceso a una página de detalle mediante el parámetro `?producto=`.
- Tarjetas con navegación por fotos. El detalle muestra galería, descripción, precio normal y precio por transferencia con un 10% de descuento informativo.
- Selector de cantidad y acción para agregar productos al carrito.
- Carrito lateral con opción para cambiar cantidades, quitar productos y ver subtotal, envío y total.
- Envío de **$10.000** para pedidos con subtotal menor a **$120.000**; es gratis al alcanzar ese umbral.
- Confirmación visual al finalizar la compra. El carrito se vacía, pero no se procesa un pago ni se registra un pedido en un servidor.
- Franja animada de envío gratis compartida entre el catálogo y el detalle; respeta la preferencia de reducir movimiento.
- Sección Franquicias con sucursales de Tucumán, dirección, horario, mapa y carrusel de fotos.
- Sección Nosotros con imágenes adaptadas a móvil y escritorio.
- Preguntas frecuentes en un acordeón de Bootstrap.
- Formulario de contacto con campos para nombre, correo y mensaje.
- Footer con enlaces de navegación, Instagram, WhatsApp y correo electrónico.
- Diseño responsive para móviles, tablets y escritorio.

## Alcance actual

El carrito vive en el estado de React y se pierde al recargar la página. No se usa base de datos ni `localStorage`. El botón de registro abre un modal informativo; todavía no existe un formulario de alta, perfil de cliente, selección de provincia o carga de dirección de envío. El formulario de contacto tampoco está conectado a un servidor: al enviarlo solo muestra una confirmación en pantalla y limpia los campos.

## Carrito

El estado se administra en memoria desde `src/App.jsx`, sin persistencia local. Los enlaces internos actualizan la vista mediante React Router, por lo que la navegación Atrás/Adelante conserva el carrito durante la sesión. Recargar la página o abrir otra pestaña crea un carrito vacío.

`src/utils/carrito.js` contiene las operaciones para agregar, cambiar cantidades, quitar productos y calcular totales. `COSTO_ENVIO` define el costo de envío y `UMBRAL_ENVIO_GRATIS` el importe desde el que no se cobra. La compra muestra una confirmación y vacía el carrito; no se conecta con una pasarela de pago ni guarda pedidos.

## Franquicias y Nosotros

`src/components/FranquiciasPage.jsx` contiene los datos de las sucursales, las direcciones, los horarios y las imágenes de cada galería. Los mapas se generan con la dirección de cada sucursal. Para agregar o modificar una ubicación, actualizá el arreglo `branches` y sus fotos en `public/img/`.

`src/components/NosotrosPage.jsx` selecciona imágenes distintas para móvil y escritorio. La imagen móvil se usa hasta 767 px y la de escritorio desde 768 px; ambas conservan su proporción.

## Contacto

La opción **CONTACTANOS** del menú abre la sección en `/contacto`. El formulario solicita nombre, correo y mensaje, y valida los campos antes de mostrar una confirmación. Actualmente el mensaje no se envía ni se guarda; para habilitarlo hace falta conectarlo a un servicio o backend.

## Editar productos

Los datos están en `src/data/products.js`. Cada producto tiene un `id` único, `name`, `price`, `description` e `images`.

```js
const product = {
  id: 1,
  name: 'CAMISA WELD BLUE',
  price: 55000,
  description: 'Tu descripción del producto.',
  images: ['/img/foto-frente.png', '/img/foto-espalda.png'],
}
```

Guardá los precios como números, sin símbolos ni separadores. `src/utils/precios.js` aplica el formato monetario; el detalle calcula `price * 0.9` para transferencia. Las descripciones aparecen únicamente dentro del detalle. Las imágenes se guardan en `public/img/` y se referencian como `/img/archivo.png`.

## Interfaz y estilos

Bootstrap y React Bootstrap se usan para la grilla, navegación, acordeón, modal y carrito lateral. Los archivos CSS de cada componente definen la apariencia propia y sus ajustes responsive. Las fuentes del sitio se cargan desde `index.html`; Montserrat se usa como tipografía general y BBH Bartle en títulos destacados.

## Estructura

```text
src/
├── components/
│   ├── Banner.jsx                  # Imágenes responsive del inicio
│   ├── Carrito.jsx / .css          # Panel lateral y resumen de compra
│   ├── Contacto.jsx                # Formulario de contacto
│   ├── EnvioGratis.jsx / .css      # Franja animada compartida
│   ├── Footer.jsx / .css           # Pie de página
│   ├── FranquiciasPage.jsx / .css  # Sucursales, mapas y galerías
│   ├── Navbar.jsx / .css           # Menú y modal de registro
│   ├── NosotrosPage.jsx           # Presentación responsive de Nosotros
│   ├── PreguntasFrecuentes.jsx    # Acordeón de preguntas frecuentes
│   ├── SeccionImagen.jsx          # Presentación visual reutilizable
│   ├── ProductoDetalle.jsx / .css  # Galería, descripción y cantidad
│   ├── Productos.jsx              # Grilla del catálogo
│   └── ProductosCard.jsx / .css    # Tarjeta y controles de fotos
├── data/products.js               # Datos del catálogo
├── utils/
│   ├── carrito.js                 # Operaciones del carrito y cálculo de envío
│   └── precios.js                 # Formato de importes
├── App.jsx                        # Estructura compartida y estado del carrito
├── index.css                      # Tipografía y estilos globales
└── main.jsx                       # Entrada e importación de Bootstrap
```

## Verificación

```bash
npm test
npm run lint
npm run format:check
npm run build
```

Las pruebas de `tests/carrito.test.mjs` verifican el cálculo del envío, el umbral gratuito, las cantidades, la eliminación de productos y el vaciado del carrito. También comprueban que las operaciones no muten el estado anterior.

## Rutas

Las rutas se definen en `src/components/routes/Rutas.jsx`; `BrowserRouter` envuelve la aplicaci?n en `main.jsx`.

- `/`: inicio con banner y cat?logo.
- `/productos`: cat?logo.
- `/producto/:id`: detalle del producto.
- `/preguntas`: preguntas frecuentes.
- `/contacto`: formulario de contacto.
- `/nosotros`: presentaci?n de la marca.
- `/franquicias`: presentaci?n de franquicias.
- `/franquicias/sucursales`: direcciones, mapas y galer?as.
- Las direcciones desconocidas muestran una p?gina no encontrada.

Al publicar, el hosting debe servir `index.html` para las rutas de la aplicaci?n, para permitir abrirlas directamente o recargarlas.
