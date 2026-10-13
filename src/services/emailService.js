import emailjs from '@emailjs/browser'

const URL_WELD = 'https://weld-frontend-wine.vercel.app'

const obtenerImagenPublica = (ruta) => {
  return new URL(ruta, URL_WELD).href
}

export const enviarCorreoPedido = (datosPedido) => {
  const { nombre, email, pedidoId, productos, total, direccion } = datosPedido

  const productosHtml = productos
    .map(
      (item) => `
    <div style="margin-bottom:20px;">
      <img
        src="${obtenerImagenPublica(item.product.images[0])}"
        alt=""
        width="100"
      />
      <p>${item.product.name}</p>
      <p>Talle: ${item.talle}</p>
      <p>Cantidad: ${item.cantidad}</p>
      <p>Precio: $${item.product.price.toLocaleString('es-AR')}</p>
    </div>
  `,
    )
    .join('')

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      nombre,
      email,
      pedido_id: pedidoId,
      productos_html: productosHtml,
      total: total.toLocaleString('es-AR'),
      direccion,
    },
    {
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    },
  )
}
