import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { Alert, Button, Card, Col, Image, Offcanvas, Row, Stack } from 'react-bootstrap'
import './Carrito.css'
import './ProductosCard.css'
import { enviarCorreoPedido } from '../services/emailService'

const formatoPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const formatoPrecio = (precio) => formatoPesos.format(precio)

function Carrito({
  show,
  onHide,
  items,
  subtotal,
  envio,
  total,
  perfil,
  onCambiarCantidad,
  onQuitar,
  onFinalizarCompra,
}) {
  const [compraRealizada, setCompraRealizada] = useState(null)
  const [enviandoCorreo, setEnviandoCorreo] = useState(false)
  const [errorCorreo, setErrorCorreo] = useState('')
  const [alertaAbierta, setAlertaAbierta] = useState(false)
  const envioEnCurso = useRef(false)
  const mostrarAlerta = async (opciones) => {
    setAlertaAbierta(true)
    try {
      return await Swal.fire({ confirmButtonColor: '#111', ...opciones })
    } finally {
      setAlertaAbierta(false)
    }
  }

  const finalizarCompra = async () => {
    if (!items.length || !perfil || envioEnCurso.current) return

    envioEnCurso.current = true
    setEnviandoCorreo(true)
    setErrorCorreo('')

    try {
      const pedidoId = `WELD-${crypto.randomUUID().toUpperCase()}`
      const direccion = [perfil.direccion, perfil.localidad, perfil.provincia, perfil.pais].join(
        ', ',
      )
      await enviarCorreoPedido({
        nombre: `${perfil.nombre} ${perfil.apellido}`,
        email: perfil.email,
        pedidoId,
        productos: items,
        total,
        direccion,
      })

      setCompraRealizada({ ...perfil, total, pedidoId })
      onFinalizarCompra()
    } catch (error) {
      console.error('Error al enviar el correo:', error)
      const mensaje = Number.isInteger(error?.status)
        ? `No pudimos enviar el correo del pedido (error ${error.status}). Intentá nuevamente.`
        : 'No pudimos enviar el correo del pedido. Intentá nuevamente.'
      setEnviandoCorreo(false)
      setErrorCorreo(mensaje)
      await mostrarAlerta({
        icon: 'error',
        title: 'No se pudo enviar el correo',
        text: `${mensaje} Tus productos siguen en el carrito.`,
        confirmButtonText: 'Entendido',
      })
    } finally {
      envioEnCurso.current = false
      setEnviandoCorreo(false)
    }
  }

  const reiniciarMensajes = () => {
    setCompraRealizada(null)
    setErrorCorreo('')
  }

  const productos = items.map(({ product, cantidad, talle }) => (
    <Row as="li" key={`${product.id}-${talle ?? ''}`} className="g-3 mb-4 productos-card">
      <Col xs={4}>
        <Image src={product.images[0]} alt={product.name} fluid />
      </Col>
      <Col xs={8}>
        <Card.Title as="h3" className="fw-normal text-break text-uppercase">
          {product.name}
        </Card.Title>
        {talle && <p className="small mb-2">Talle: {talle}</p>}
        <p className="productos-card-price mb-3 text-uppercase">{formatoPrecio(product.price)}</p>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="d-inline-flex align-items-center border" role="group">
            <Button
              variant="link"
              className="text-dark text-decoration-none rounded-0 px-3"
              disabled={cantidad === 1 || enviandoCorreo}
              onClick={() => {
                reiniciarMensajes()
                onCambiarCantidad(product.id, -1, talle)
              }}
            >
              −
            </Button>
            <span className="px-2">{cantidad}</span>
            <Button
              variant="link"
              className="text-dark text-decoration-none rounded-0 px-3"
              disabled={enviandoCorreo}
              onClick={() => {
                reiniciarMensajes()
                onCambiarCantidad(product.id, 1, talle)
              }}
            >
              +
            </Button>
          </div>
          <Button
            variant="link"
            className="carrito-quitar text-black p-0 small"
            disabled={enviandoCorreo}
            onClick={() => {
              reiniciarMensajes()
              onQuitar(product.id, talle)
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
      enforceFocus={!alertaAbierta}
      onShow={reiniciarMensajes}
      onHide={() => {
        if (!enviandoCorreo) onHide()
      }}
      placement="end"
      className="carrito-panel text-dark overflow-y-auto"
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
          className="carrito-ver-productos text-uppercase w-100 rounded-0 py-2 mb-3"
          onClick={onHide}
          disabled={enviandoCorreo}
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
          </>
        )}
        <div className="bg-light border p-3 mb-3 small">
          <strong className="d-block mb-2">Dirección de entrega</strong>
          {perfil ? (
            <address className="mb-0">
              {perfil.direccion}, {perfil.localidad}, {perfil.provincia}, {perfil.pais}
            </address>
          ) : (
            <>
              <p>Todavía no creaste un perfil.</p>
              <Link to="/registro" className="text-dark" onClick={onHide}>
                Crear perfil para finalizar la compra
              </Link>
            </>
          )}
        </div>
        <Button
          variant="danger"
          className="carrito-finalizar w-100 rounded-0 py-3 d-flex flex-wrap justify-content-center gap-2"
          disabled={!items.length || !perfil || enviandoCorreo}
          onClick={finalizarCompra}
        >
          <span>{enviandoCorreo ? 'ENVIANDO PEDIDO...' : 'FINALIZAR COMPRA'}</span>
          {items.length > 0 && <span>· {formatoPrecio(total)}</span>}
        </Button>
        {errorCorreo && (
          <Alert variant="danger" className="mt-3" role="alert">
            {errorCorreo}
          </Alert>
        )}
        {compraRealizada && (
          <p className="carrito-confirmacion mt-3 mb-0 text-center" role="status">
            ¡Gracias, {compraRealizada.nombre}! Tu compra de demostración por{' '}
            {formatoPrecio(compraRealizada.total)} fue confirmada.
            <span className="d-block mt-2">
              Dirección de entrega: {compraRealizada.direccion}, {compraRealizada.localidad},{' '}
              {compraRealizada.provincia}, {compraRealizada.pais}.
            </span>
          </p>
        )}
      </div>
    </Offcanvas>
  )
}

export default Carrito
