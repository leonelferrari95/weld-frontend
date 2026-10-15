import { useReducer, useState } from 'react'

const COSTO_ENVIO = 10000
const UMBRAL_ENVIO_GRATIS = 120000

function actualizarCarrito(carrito, accion) {
  if (accion.tipo === 'vaciar') return []

  if (accion.tipo === 'quitar') {
    return carrito.filter((item) => item.product.id !== accion.id || item.talle !== accion.talle)
  }

  if (accion.tipo !== 'agregar' && accion.tipo !== 'cantidad') return carrito

  const cambio = accion.tipo === 'agregar' ? accion.cantidad : accion.cambio
  if (!Number.isSafeInteger(cambio) || (accion.tipo === 'agregar' && cambio < 1)) return carrito
  if (
    accion.tipo === 'agregar' &&
    (!accion.product || !Number.isFinite(accion.product.price) || accion.product.price < 0)
  )
    return carrito

  const siguiente = []
  let encontrado = false
  const id = accion.product?.id ?? accion.id

  for (const item of carrito) {
    if (item.product.id !== id || item.talle !== accion.talle) {
      siguiente.push(item)
      continue
    }

    encontrado = true
    const cantidad =
      accion.tipo === 'agregar' ? item.cantidad + accion.cantidad : item.cantidad + accion.cambio
    if (!Number.isSafeInteger(cantidad)) return carrito
    siguiente.push({ ...item, cantidad: Math.max(1, cantidad) })
  }

  if (accion.tipo === 'agregar' && !encontrado) {
    siguiente.push({
      product: accion.product,
      cantidad: accion.cantidad,
      ...(accion.talle ? { talle: accion.talle } : {}),
    })
  }

  return siguiente
}

function calcularTotales(carrito) {
  let subtotal = 0
  let cantidad = 0

  for (const item of carrito) {
    subtotal += item.product.price * item.cantidad
    cantidad += item.cantidad
  }

  const envio = cantidad > 0 && subtotal < UMBRAL_ENVIO_GRATIS ? COSTO_ENVIO : 0
  return { subtotal, envio, total: subtotal + envio, cantidad }
}

export default function useCarrito() {
  const [carrito, actualizarEstadoCarrito] = useReducer(actualizarCarrito, [])
  const [mostrarCarrito, setMostrarCarrito] = useState(false)

  const agregarAlCarrito = (product, cantidad, talle) => {
    actualizarEstadoCarrito({ tipo: 'agregar', product, cantidad, talle })
    setMostrarCarrito(true)
  }

  const cambiarCantidad = (id, cambio, talle) => {
    actualizarEstadoCarrito({ tipo: 'cantidad', id, cambio, talle })
  }

  const quitarProducto = (id, talle) => {
    actualizarEstadoCarrito({ tipo: 'quitar', id, talle })
  }

  const vaciarCarrito = () => {
    actualizarEstadoCarrito({ tipo: 'vaciar' })
  }

  return {
    carrito,
    mostrarCarrito,
    ...calcularTotales(carrito),
    abrirCarrito: () => setMostrarCarrito(true),
    cerrarCarrito: () => setMostrarCarrito(false),
    agregarAlCarrito,
    cambiarCantidad,
    quitarProducto,
    vaciarCarrito,
  }
}
