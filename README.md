# Weld

Weld es un proyecto de sitio web para una marca de ropa urbana y actual. Se está desarrollando como una aplicación de una sola página con React y Vite. La interfaz se está construyendo progresivamente y este README describe el estado actual.

## Estado actual

- Navbar responsive con enlaces a Shop Now, Franquicias, Preguntas frecuentes y Contáctanos.
- Logo centrado, menú desplegable para pantallas pequeñas y accesos al carrito y a la cuenta.
- Banner de inicio responsive: usa `weldbannercelu.png` hasta 425 px y `weldbannercompu.png` desde 426 px.
- Modal de cuenta provisional; el formulario de registro se agregará en una feature posterior.
- Las secciones de productos, Franquicias, Preguntas frecuentes y Contacto todavía están pendientes de desarrollo para la identidad de Weld.

## Tecnologías

- React
- Vite
- Bootstrap 5
- React Bootstrap
- CSS
- Ropa Sans y Montserrat, cargadas desde Google Fonts

## Requisitos

- Node.js y npm instalados.

## Instalación y ejecución

1. Clonar o descargar este repositorio.
2. Abrir una terminal en la carpeta del proyecto, donde está `package.json`.
3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Iniciar el servidor local:

   ```bash
   npm run dev
   ```

5. Abrir en el navegador la dirección que muestra Vite en la terminal.

## Comandos disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve localmente la versión generada.
- `npm run lint`: revisa el código con ESLint.

## Estructura actual

```text
weld-frontend/
├── public/
│   └── img/                 # Imágenes disponibles mediante rutas como /img/weldblanco.png
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Estructura y comportamiento de la navbar
│   │   └── Navbar.css       # Estilos responsive de la navbar
│   ├── App.jsx              # Componente principal de la aplicación
│   ├── index.css            # Estilos globales
│   └── main.jsx             # Punto de entrada de React
├── index.html               # Documento base y metadatos de la página
└── package.json
```

## Próximas features

Se agregarán progresivamente las secciones de productos de ropa urbana, Franquicias, Preguntas frecuentes, carrito y Contacto, además del formulario de cuenta y sus interacciones.
