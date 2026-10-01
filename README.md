# Weld

Catálogo de indumentaria urbana construido con React, Vite, Bootstrap 5 y React Bootstrap. La navegación usa enlaces y parámetros de URL, sin React Router. Los componentes reciben datos mediante props y las listas se generan con bucles `for`, sin `.map`.

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
| `npm run format`       | Formato e indentación con Prettier          |
| `npm run format:check` | Comprueba el formato sin modificar archivos |

## Funcionalidades

- Catálogo con ocho productos, precios en pesos argentinos y enlaces desde el nombre y la imagen al detalle (`?producto=1`, por ejemplo).
- Las tarjetas muestran la tercera foto al pasar el cursor y permiten recorrer las imágenes con flechas e indicadores. En celulares, tocar la foto abre el detalle.
- Detalle con galería, miniaturas centradas, descripción y precio por transferencia con un 10% de descuento calculado automáticamente.
- Selector de cantidad con botones para sumar y restar, con mínimo de una unidad. **Agregar al carrito todavía es un botón visual:** no guarda productos, no utiliza almacenamiento local ni base de datos.
- Botón “Agregar al carrito” responsive: se adapta al espacio disponible junto al contador, con un ancho máximo de 400 px. El contador conserva su ancho de 110 px.
- “Volver a productos” abre el catálogo y desplaza la página a `#productos` después del renderizado.
- Franja animada de envío gratis compartida entre catálogo y detalle; respeta la preferencia de reducir movimiento.
- Navbar con menú desplegable por debajo de 1400 px y logo junto al carrito desde ese ancho. El modal de registro es una presentación, todavía sin formulario.
- Footer con logo centrado y secciones debajo en pantallas menores a 1200 px.
- Fondo ilustrado del detalle desde 1400 px y fondo blanco por debajo. Escala de tipografía y catálogo adaptada a pantallas mayores a 1920 px.

Los enlaces a secciones como Nosotros y Franquicias siguen siendo referencias: sus secciones aún no están implementadas.

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

Tras las dos pasadas de refactorización y el ajuste responsive del botón, el CSS propio pasó de **257 a 140 declaraciones** (aproximadamente **46% menos**) y de **9846 a 6403 bytes** (aproximadamente **35% menos**), sumando todos los `.css` de `src/`. La segunda pasada reemplazó ajustes de la navbar por utilidades responsive de Bootstrap y unificó selectores y reglas para pantallas grandes. No se trasladaron estilos a objetos JavaScript ni se ocultaron archivos del cálculo de lenguajes.

Estas cifras miden el CSS del proyecto, no el porcentaje final de lenguajes de GitHub ni el CSS de Bootstrap incluido en la compilación. El porcentaje que muestre el repositorio debe comprobarse después de subir los cambios.

Montserrat es la fuente general; BBH Bartle se usa en el título del catálogo. Las fuentes se cargan en `index.html`. `.prettierrc.json` y `.editorconfig` definen el formato del código.

## Estructura

```text
src/
├── components/
│   ├── Banner.jsx                  # Imágenes responsive del inicio
│   ├── EnvioGratis.jsx / .css      # Franja animada compartida
│   ├── Footer.jsx / .css           # Pie de página
│   ├── Navbar.jsx / .css           # Menú y modal de registro
│   ├── ProductoDetalle.jsx / .css  # Galería, descripción y cantidad
│   ├── Productos.jsx              # Grilla del catálogo
│   └── ProductosCard.jsx / .css    # Tarjeta y controles de fotos
├── data/products.js               # Datos del catálogo
├── utils/precios.js               # Formato de importes
├── App.jsx                        # Selección de vista por URL
├── index.css                      # Tipografía y estilos globales
└── main.jsx                       # Entrada e importación de Bootstrap
```

## Verificación

Ejecutá `npm run lint`, `npm run format:check` y `npm run build`. Al cambiar estilos, revisá además el catálogo y el detalle en celular, tablet, escritorio y 4K, incluyendo hover, galería, cantidad y navegación de regreso. Comprobá que el botón de agregar al carrito y el contador permanezcan juntos sin desbordar la columna de información.

La compilación avisa que `/img/fondotodocompu.png`, referenciada por el fondo global, no existe. Es una referencia previa a esta refactorización y debe reemplazarse o completarse con el recurso correspondiente.
