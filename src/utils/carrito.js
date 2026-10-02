export const COSTO_ENVIO = 10000
export const UMBRAL_ENVIO_GRATIS = 120000

export function actualizarCarrito(carrito, accion) {
  if (accion.tipo === 'vaciar') return []

  if (accion.tipo === 'quitar') {
    return carrito.filter((item) => item.product.id !== accion.id)
  }

  if (accion.tipo !== 'agregar' && accion.tipo !== 'cantidad') return carrito

  const siguiente = []
  let encontrado = false
  const id = accion.product?.id ?? accion.id

  for (const item of carrito) {
    if (item.product.id !== id) {
      siguiente.push(item)
      continue
    }

    encontrado = true
    const cantidad =
      accion.tipo === 'agregar' ? item.cantidad + accion.cantidad : item.cantidad + accion.cambio
    siguiente.push({ ...item, cantidad: Math.max(1, cantidad) })
  }

  if (accion.tipo === 'agregar' && !encontrado) {
    siguiente.push({ product: accion.product, cantidad: accion.cantidad })
  }

  return siguiente
}

export function calcularTotales(carrito) {
  let subtotal = 0
  let cantidad = 0

  for (const item of carrito) {
    subtotal += item.product.price * item.cantidad
    cantidad += item.cantidad
  }

  const envio = cantidad > 0 && subtotal < UMBRAL_ENVIO_GRATIS ? COSTO_ENVIO : 0
  return { subtotal, envio, total: subtotal + envio, cantidad }
}
