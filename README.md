# Weld

Catálogo de indumentaria urbana construido con React, Vite, Bootstrap 5 y React Bootstrap. La navegación usa enlaces, parámetros de URL y la API History del navegador, sin React Router. Los componentes reciben datos mediante props y las listas se generan con bucles `for`, sin `.map`.

## Desarrollo

Desde la carpeta que contiene `package.json`:

```bash
npm install
npm run dev
```

Abrí la dirección que muestra Vite. En PowerShell, si la política de ejecución bloquea `npm.ps1`, usá `npm.cmd` en lugar de `npm`.

| Comando                | Uso                                         |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo                      |
| `npm run build`        | Compilación de producción en `dist/`        |
| `npm run preview`      | Vista previa de la compilación              |
| `npm run lint`         | Revisión con ESLint                         |
| `npm test`             | Pruebas de cantidades, productos y totales del carrito |
| `npm run format`       | Formato e indentación con Prettier          |
| `npm run format:check` | Comprueba el formato sin modificar archivos |

## Funcionalidades

- Catálogo con ocho productos, precios en pesos argentinos y enlaces desde el nombre y la imagen al detalle (`?producto=1`, por ejemplo).
- Las tarjetas muestran la tercera foto al pasar el cursor y permiten recorrer las imágenes con flechas e indicadores. En celulares, tocar la foto abre el detalle.
- Detalle con galería, miniaturas centradas, descripción y precio por transferencia con un 10% de descuento calculado automáticamente.
- Selector de cantidad con botones para sumar y restar, con mínimo de una unidad. “Agregar al carrito” agrega la cantidad elegida y abre el panel lateral.
- Carrito con React Bootstrap `Offcanvas`: se despliega desde la derecha, oscurece el fondo y permite cerrar con la cruz, Escape o un clic fuera del panel. En celulares ocupa el ancho disponible; en pantallas grandes su ancho es de 35 rem.
- Cada fila muestra la imagen, el nombre y el precio unitario del catálogo, con controles para sumar, restar o quitar. Agregar nuevamente el mismo producto acumula su cantidad.
- “Finalizar compra” muestra el total de los productos más un único envío de **$10.000 por pedido**. El carrito vacío no cobra envío y deshabilita ese botón. No hay talles ni botón “Ver carrito”.
- Botón “Agregar al carrito” responsive: se adapta al espacio disponible junto al contador, con un ancho máximo de 400 px. El contador conserva su ancho de 110 px.
- “Volver a productos” abre el catálogo y desplaza la página a `#productos` después del renderizado.
- Franja animada de envío gratis compartida entre catálogo y detalle; respeta la preferencia de reducir movimiento.
- Navbar con menú desplegable por debajo de 1400 px y logo junto al carrito desde ese ancho. El modal de registro es una presentación, todavía sin formulario.
- Footer con logo centrado y secciones debajo en pantallas menores a 1200 px.
- Fondo ilustrado del detalle desde 1400 px y fondo blanco por debajo. Escala de tipografía y catálogo adaptada a pantallas mayores a 1920 px.

Franquicias y Nosotros se despliegan sobre el contenido actual desde el menú o el footer. Abrir una cierra la otra. Ambas tienen un botón “Volver al inicio” para cerrar la sección. Nosotros muestra una imagen responsive, sin botones sobre la imagen, con líneas blancas finas debajo de la barra superior y de la imagen. Preguntas frecuentes también cierra estas secciones. El enlace a Contactanos sigue pendiente de una sección propia.

## Carrito

El estado se guarda en memoria en `App.jsx`, sin base de datos ni almacenamiento local. Los enlaces internos cambian la URL con `history.pushState` y actualizan la vista sin recargar la página: se pueden agregar distintos productos y usar Atrás/Adelante sin perder el carrito. **Recargar la página o abrir otra pestaña inicia un carrito vacío.**

`src/utils/carrito.js` reúne las operaciones de agregar, cambiar cantidades, quitar y calcular totales. Para cambiar el envío, modificá `COSTO_ENVIO`. Por ahora siempre se suman $10.000 cuando hay productos, también sobre $120.000; la franja promocional de envío gratis existente no modifica este cálculo. Se usa el precio normal del catálogo; el descuento por transferencia sigue siendo informativo en el detalle.

El botón “Finalizar compra” muestra un resumen con el importe final; todavía no registra pedidos ni realiza cobros. `src/components/Carrito.jsx` utiliza componentes y utilidades de Bootstrap y reutiliza los tamaños de texto de las tarjetas. `Carrito.css` solo define el ancho del panel.

## Imágenes de Nosotros

`src/components/NosotrosPage.jsx` configura las imágenes móvil y de escritorio: `/img/welduscel.png` (1122 × 1402) y `/img/welduspc.png` (1672 × 941). Al reemplazarlas, actualizá `srcSet`, `width` y `height` en `<source>` para celular y `src`, `width` y `height` en `<img>` para escritorio.

La versión móvil se usa hasta 767.98 px; desde 768 px se usa la de escritorio. Nosotros muestra la imagen completa al ancho disponible con altura automática, sin recortarla ni deformarla. Su altura depende de las proporciones de la imagen, como en el banner de inicio. Franquicias conserva su fondo a pantalla completa con recorte, su título y su botón “Ver más”.

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

## Estilos y refactorización

Bootstrap resuelve distribución, alineación, bordes, pesos de fuente y otras propiedades comunes mediante sus componentes y utilidades. El CSS propio conserva colores exactos, medidas particulares, animaciones, estados de interacción y ajustes responsive.

En las dos pasadas de refactorización, antes de incorporar Franquicias y Nosotros, el CSS propio pasó de **257 a 140 declaraciones** (aproximadamente **46% menos**) y de **9846 a 6403 bytes** (aproximadamente **35% menos**), sumando todos los `.css` de `src/`. La segunda pasada reemplazó ajustes de la navbar por utilidades responsive de Bootstrap y unificó selectores y reglas para pantallas grandes. No se trasladaron estilos a objetos JavaScript ni se ocultaron archivos del cálculo de lenguajes.

Estas cifras miden el CSS del proyecto, no el porcentaje final de lenguajes de GitHub ni el CSS de Bootstrap incluido en la compilación. El porcentaje que muestre el repositorio debe comprobarse después de subir los cambios.

Montserrat es la fuente general; BBH Bartle se usa en el título del catálogo. Las fuentes se cargan en `index.html`. `.prettierrc.json` y `.editorconfig` definen el formato del código.

## Estructura

```text
src/
├── components/
│   ├── Banner.jsx                  # Imágenes responsive del inicio
│   ├── Carrito.jsx / .css          # Panel lateral y resumen de compra
│   ├── EnvioGratis.jsx / .css      # Franja animada compartida
│   ├── Footer.jsx / .css           # Pie de página
│   ├── FranquiciasPage.jsx / .css  # Franquicias y estilos de las secciones con imagen
│   ├── Navbar.jsx / .css           # Menú y modal de registro
│   ├── NosotrosPage.jsx           # Imagen responsive de Nosotros
│   ├── SeccionImagen.jsx          # Presentación con texto y botones de Franquicias
│   ├── ProductoDetalle.jsx / .css  # Galería, descripción y cantidad
│   ├── Productos.jsx              # Grilla del catálogo
│   └── ProductosCard.jsx / .css    # Tarjeta y controles de fotos
├── data/products.js               # Datos del catálogo
├── utils/
│   ├── carrito.js                 # Operaciones del carrito y cálculo de envío
│   └── precios.js                 # Formato de importes
├── App.jsx                        # Vistas por URL y estado del carrito
├── index.css                      # Tipografía y estilos globales
└── main.jsx                       # Entrada e importación de Bootstrap
```

## Verificación

Ejecutá `npm test`, `npm run lint`, `npm run format:check` y `npm run build`. Al cambiar estilos, revisá además el catálogo y el detalle en celular, tablet, escritorio y 4K, incluyendo hover, galería, cantidad y navegación de regreso. Comprobá que el botón de agregar al carrito y el contador permanezcan juntos sin desbordar la columna de información.

Para comprobar el carrito, agregá dos unidades de la camisa de $55.000, volvé al catálogo y agregá una remera de $45.000: el subtotal debe ser $155.000 y el total con envío $165.000. Probá cambiar cantidades, quitar todos los productos, volver con el navegador y abrir/cerrar el panel desde el ícono. El total debe actualizarse y el envío desaparecer al vaciar el carrito.

La compilación avisa que `/img/fondotodocompu.png`, referenciada por el fondo global, no existe. Es una referencia previa a esta refactorización y debe reemplazarse o completarse con el recurso correspondiente.
