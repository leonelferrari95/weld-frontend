import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Alert, Button, Card, Col, Image, Offcanvas, Row, Stack } from 'react-bootstrap'
import { calcularTotales } from '../utils/carrito'
import { formatoPrecio } from '../utils/precios'
import './Carrito.css'
import './ProductosCard.css'

function Carrito({ show, onHide, items, onCambiarCantidad, onQuitar, onFinalizarCompra }) {
  const [mostrarTotal, setMostrarTotal] = useState(false)
  const [compraRealizada, setCompraRealizada] = useState(false)
  const { subtotal, envio, total } = calcularTotales(items)

  const reiniciarMensajes = () => {
    setCompraRealizada(false)
    setMostrarTotal(false)
  }

  const productos = items.map(({ product, cantidad }) => (
    <Row as="li" key={product.id} className="g-3 mb-4 productos-card">
      <Col xs={4}>
        <Image src={product.images[0]} alt={product.name} fluid />
      </Col>
      <Col xs={8}>
        <Card.Title as="h3" className="fw-normal text-break">
          {product.name}
        </Card.Title>
        <p className="productos-card-price mb-3">{formatoPrecio(product.price)}</p>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div
            className="d-inline-flex align-items-center border"
            role="group"
            aria-label={`Cantidad de ${product.name}`}
          >
            <Button
              variant="link"
              className="text-dark text-decoration-none rounded-0 px-3"
              disabled={cantidad === 1}
              aria-label={`Restar una unidad de ${product.name}`}
              onClick={() => {
                reiniciarMensajes()
                onCambiarCantidad(product.id, -1)
              }}
            >
              −
            </Button>
            <span className="px-2" aria-live="polite" aria-atomic="true">
              {cantidad}
            </span>
            <Button
              variant="link"
              className="text-dark text-decoration-none rounded-0 px-3"
              aria-label={`Sumar una unidad de ${product.name}`}
              onClick={() => {
                reiniciarMensajes()
                onCambiarCantidad(product.id, 1)
              }}
            >
              +
            </Button>
          </div>
          <Button
            variant="link"
            className="carrito-quitar text-black p-0 small"
            aria-label={`Quitar ${product.name} del carrito`}
            onClick={() => {
              reiniciarMensajes()
              onQuitar(product.id)
            }}
          >
            Quitar
          </Button>
        </div>
      </Col>
    </Row>
  ))

  return (
    <Offcanvas
      id="carrito"
      show={show}
      onShow={reiniciarMensajes}
      onHide={onHide}
      onExited={() => setMostrarTotal(false)}
      placement="end"
      className="carrito-panel text-dark overflow-y-auto"
      aria-labelledby="carrito-titulo"
    >
      <Offcanvas.Header closeButton closeLabel="Cerrar carrito" className="border-bottom p-4">
        <Offcanvas.Title id="carrito-titulo" className="h5 fw-normal mb-0">
          CARRITO
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-3 p-sm-4">
        {items.length ? (
          <ul className="list-unstyled mb-0">{productos}</ul>
        ) : (
          <p className="text-center text-secondary my-4">Tu carrito está vacío.</p>
        )}
      </Offcanvas.Body>

      <div className="border-top p-3 p-sm-4 flex-shrink-0">
        <Button
          as={Link}
          to="/productos"
          variant="outline-dark"
          className="carrito-ver-productos w-100 rounded-0 py-2 mb-3"
          onClick={onHide}
        >
          VER MÁS PRODUCTOS
        </Button>
        {items.length > 0 && (
          <>
            <Stack direction="horizontal" className="justify-content-between gap-3 mb-2">
              <span>Subtotal</span>
              <span>{formatoPrecio(subtotal)}</span>
            </Stack>
            <Stack direction="horizontal" className="justify-content-between gap-3 mb-3">
              <span>Envío</span>
              <span>{formatoPrecio(envio)}</span>
            </Stack>
            {mostrarTotal && (
              <Alert variant="light" className="border text-dark" role="status" aria-atomic="true">
                <strong className="d-block">Total de tu compra: {formatoPrecio(total)}</strong>
                <span className="small">Incluye {formatoPrecio(envio)} de envío.</span>
              </Alert>
            )}
          </>
        )}
        <Button
          variant="danger"
          className="carrito-finalizar w-100 rounded-0 py-3 d-flex flex-wrap justify-content-center gap-2"
          disabled={!items.length}
          onClick={() => {
            setCompraRealizada(true)
            setMostrarTotal(false)
            onFinalizarCompra()
          }}
        >
          <span>FINALIZAR COMPRA</span>
          {items.length > 0 && <span>· {formatoPrecio(total)}</span>}
        </Button>
        {compraRealizada && (
          <p className="carrito-confirmacion mt-3 mb-0 text-center" role="status">
            ¡Muchas gracias por su compra! Su pedido fue realizado con éxito.
          </p>
        )}
      </div>
    </Offcanvas>
  )
}

export default Carrito
