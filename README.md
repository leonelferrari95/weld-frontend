# Weld

Sitio web de Weld, una marca de ropa urbana. La aplicación está construida como una SPA con React y Vite.

## Funcionalidades actuales

- Navbar responsive con navegación a las secciones disponibles, logo y accesos de cuenta y carrito.
- Layouts responsive y footer construidos con componentes y utilidades de React Bootstrap; el CSS personalizado queda para identidad visual, animaciones y controles específicos.
- Banner de inicio responsive: usa `weldbannercelu.png` hasta 767 px y `weldbannercompu.png` desde 768 px.
- Sección de productos con tarjetas, nombre, precio y carrusel de imágenes.
- En las tarjetas con tres o más fotos, al pasar el cursor se muestra primero la tercera imagen y las flechas permiten recorrer la primera y la segunda. Al salir, vuelve la selección normal.
- En dispositivos táctiles, se puede tocar la imagen para activar o quitar esa vista previa.
- Flechas compactas con animación de aparición al pasar el cursor o enfocar la tarjeta. Las imágenes también tienen una transición al cambiar.
- Franja gris animada debajo del título “PRODUCTOS”, con el mensaje de envío y el nombre Weld Company.
- El encabezado de productos usa BBH Bartle; las tarjetas conservan Montserrat.

## Tecnologías

- React y React DOM
- Vite
- Bootstrap 5 y React Bootstrap
- CSS
- Google Fonts: Ropa Sans, Montserrat y BBH Bartle

## Requisitos

- Node.js y npm

## Instalación y ejecución

1. Abre una terminal en la carpeta que contiene `package.json`.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre la dirección local que indica Vite en la terminal.

## Comandos

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve localmente la versión generada.
- `npm run lint`: revisa el código con ESLint.

## Estructura principal

```text
public/
└── img/                 # Banners, productos y otros recursos visuales
src/
├── components/
│   ├── Banner.jsx       # Banner responsive de inicio
│   ├── Banner.css
│   ├── Navbar.jsx       # Navegación principal
│   ├── Navbar.css
│   ├── Footer.jsx      # Pie de página
│   ├── Footer.css
│   ├── Productos.jsx    # Catálogo y datos de productos
│   ├── ProductosCard.jsx # Tarjeta y controles del carrusel
│   └── ProductosCard.css
├── App.jsx              # Composición de la página
├── index.css            # Estilos globales
└── main.jsx             # Punto de entrada de React
```
