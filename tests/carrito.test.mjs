import assert from 'node:assert/strict'
import test from 'node:test'
import { actualizarCarrito, calcularTotales } from '../src/utils/carrito.js'
import { products } from '../src/data/products.js'

const camisa = products[0]
const remera = products[1]

test('rechaza cantidades inválidas sin alterar el carrito ni sus totales', () => {
  const original = [{ product: camisa, cantidad: 1 }]
  for (const cantidad of [0, -1, 1.5, NaN, Infinity, undefined, '2']) {
    assert.strictEqual(
      actualizarCarrito(original, { tipo: 'agregar', product: camisa, cantidad }),
      original,
    )
  }
  for (const cambio of [1.5, NaN, Infinity, undefined, '1']) {
    assert.strictEqual(
      actualizarCarrito(original, { tipo: 'cantidad', id: camisa.id, cambio }),
      original,
    )
  }
  assert.equal(calcularTotales(original).total, 65000)
})

test('rechaza productos sin un precio válido', () => {
  const original = []
  for (const price of [-1, NaN, Infinity, undefined]) {
    assert.strictEqual(
      actualizarCarrito(original, {
        tipo: 'agregar',
        product: { ...camisa, price },
        cantidad: 1,
      }),
      original,
    )
  }
})

test('evita cantidades fuera del rango entero seguro al sumar unidades', () => {
  const original = [{ product: camisa, cantidad: Number.MAX_SAFE_INTEGER }]
  assert.strictEqual(
    actualizarCarrito(original, { tipo: 'cantidad', id: camisa.id, cambio: 1 }),
    original,
  )
})

test('el carrito vacío no cobra envío', () => {
  assert.deepEqual(calcularTotales([]), { subtotal: 0, envio: 0, total: 0, cantidad: 0 })
})

test('agrega la cantidad elegida con el nombre y la imagen del catálogo', () => {
  const carrito = actualizarCarrito([], { tipo: 'agregar', product: camisa, cantidad: 2 })
  assert.deepEqual(carrito, [{ product: camisa, cantidad: 2 }])
  assert.deepEqual(calcularTotales(carrito), {
    subtotal: 110000,
    envio: 10000,
    total: 120000,
    cantidad: 2,
  })
})

test('agregar el mismo producto acumula unidades sin duplicar la fila ni mutar el estado', () => {
  const original = Object.freeze([Object.freeze({ product: camisa, cantidad: 2 })])
  const carrito = actualizarCarrito(original, { tipo: 'agregar', product: camisa, cantidad: 3 })
  assert.equal(carrito.length, 1)
  assert.equal(carrito[0].cantidad, 5)
  assert.equal(original[0].cantidad, 2)
})

test('el envío es gratis cuando el subtotal alcanza $120.000', () => {
  let carrito = actualizarCarrito([], { tipo: 'agregar', product: camisa, cantidad: 2 })
  carrito = actualizarCarrito(carrito, { tipo: 'agregar', product: remera, cantidad: 1 })
  assert.equal(carrito.length, 2)
  assert.deepEqual(calcularTotales(carrito), {
    subtotal: 155000,
    envio: 0,
    total: 155000,
    cantidad: 3,
  })
})

test('sumar y restar afectan al producto indicado y nunca bajan de una unidad', () => {
  let carrito = [
    { product: camisa, cantidad: 1 },
    { product: remera, cantidad: 1 },
  ]
  carrito = actualizarCarrito(carrito, { tipo: 'cantidad', id: camisa.id, cambio: 1 })
  assert.equal(carrito[0].cantidad, 2)
  assert.equal(calcularTotales(carrito).total, 155000)
  carrito = actualizarCarrito(carrito, { tipo: 'cantidad', id: camisa.id, cambio: -1 })
  carrito = actualizarCarrito(carrito, { tipo: 'cantidad', id: camisa.id, cambio: -1 })
  assert.equal(carrito[0].cantidad, 1)
  assert.equal(carrito[1].cantidad, 1)
  assert.equal(calcularTotales(carrito).total, 110000)
})

test('quitar productos recalcula el total y quitar el último también elimina el envío', () => {
  const original = [
    { product: camisa, cantidad: 2 },
    { product: remera, cantidad: 1 },
  ]
  const carrito = actualizarCarrito(original, { tipo: 'quitar', id: camisa.id })
  assert.deepEqual(carrito, [{ product: remera, cantidad: 1 }])
  assert.equal(calcularTotales(carrito).total, 55000)
  assert.equal(original.length, 2)
  const vacio = actualizarCarrito(carrito, { tipo: 'quitar', id: remera.id })
  assert.deepEqual(vacio, [])
  assert.equal(calcularTotales(vacio).total, 0)
})

test('finalizar la compra vacía completamente el carrito sin mutar el estado anterior', () => {
  const original = [
    { product: camisa, cantidad: 2 },
    { product: remera, cantidad: 1 },
  ]

  assert.deepEqual(actualizarCarrito(original, { tipo: 'vaciar' }), [])
  assert.equal(original.length, 2)
})

test('separa talles y modifica solo la variante elegida', () => {
  let carrito = actualizarCarrito([], { tipo: 'agregar', product: camisa, cantidad: 1, talle: 'S' })
  carrito = actualizarCarrito(carrito, {
    tipo: 'agregar',
    product: camisa,
    cantidad: 2,
    talle: 'M',
  })
  carrito = actualizarCarrito(carrito, {
    tipo: 'agregar',
    product: camisa,
    cantidad: 1,
    talle: 'S',
  })
  assert.equal(carrito.length, 2)
  assert.deepEqual(
    carrito.map(({ talle, cantidad }) => ({ talle, cantidad })),
    [
      { talle: 'S', cantidad: 2 },
      { talle: 'M', cantidad: 2 },
    ],
  )
  carrito = actualizarCarrito(carrito, { tipo: 'cantidad', id: camisa.id, cambio: -1, talle: 'M' })
  assert.equal(carrito[0].cantidad, 2)
  assert.equal(carrito[1].cantidad, 1)
  carrito = actualizarCarrito(carrito, { tipo: 'quitar', id: camisa.id, talle: 'S' })
  assert.equal(carrito.length, 1)
  assert.equal(carrito[0].talle, 'M')
  assert.equal(calcularTotales(carrito).subtotal, camisa.price)
})
