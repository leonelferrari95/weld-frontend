import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { formatoPrecio } from '../utils/precios'
import './ProductoDetalle.css'
import { FiShield, FiCheck, FiCornerUpLeft } from 'react-icons/fi'

function ProductoDetalle({ product, onAgregarAlCarrito }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [cantidad, setCantidad] = useState(1)

  if (!product) {
    return (
      <Container className="py-5s">
        <h1>Producto no encontrado</h1>
        <Link className="text-dark fw-normal text-decoration-none" to="/productos">
          Volver a productos
        </Link>
      </Container>
    )
  }

  const thumbnails = product.images.map((image, index) => (
    <button
      key={`${image}-${index}`}
      type="button"
      className={`producto-detalle-miniatura bg-transparent border border-2 ${selectedImage === index ? 'border-black' : 'border-transparent'}`}
      aria-label={`Ver foto ${index + 1}`}
      aria-pressed={selectedImage === index}
      onClick={() => setSelectedImage(index)}
    >
      <img className="d-block w-100 object-fit-cover" src={image} alt="" />
    </button>
  ))

  return (
    <Container className="py-4 py-lg-5 producto-detalle">
      <Link
        className="d-inline-block mb-4 text-dark fw-normal text-decoration-none"
        to="/productos"
      >
        Volver a productos
      </Link>
      <Row className="g-4 g-lg-5">
        <Col xs={12} lg={6}>
          <img
            className="d-block w-100 h-auto"
            src={product.images[selectedImage]}
            alt={`${product.name}, foto ${selectedImage + 1}`}
          />
          <div
            className="d-flex flex-wrap justify-content-center gap-2 mt-3"
            aria-label="Fotos del producto"
          >
            {thumbnails}
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <h1 className="h4">{product.name}</h1>
          <p className="fs-5 fw-semibold mt-4 mb-2">{formatoPrecio(product.price)}</p>
          <p className="producto-precio-transferencia fs-7 fw-medium mb-4">
            {formatoPrecio(product.price * 0.9)} por transferencia (10% de descuento)
          </p>
          {product.description && (
            <>
              <h5 className="h7">Descripción</h5>
              <p className="producto-detalle-descripcion">{product.description}</p>
            </>
          )}
          <div className="d-flex mt-4">
            <div className="producto-cantidad d-flex flex-shrink-0 align-items-center justify-content-between bg-white text-black">
              <button
                type="button"
                className="align-self-stretch border-0 bg-transparent text-reset fs-5"
                aria-label="Restar cantidad"
                disabled={cantidad === 1}
                onClick={() => setCantidad((actual) => Math.max(1, actual - 1))}
              >
                −
              </button>

              <span aria-live="polite">{cantidad}</span>

              <button
                type="button"
                className="align-self-stretch border-0 bg-transparent text-reset fs-5"
                aria-label="Sumar cantidad"
                onClick={() => setCantidad((actual) => actual + 1)}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="producto-agregar border-0 text-white py-2"
              onClick={() => onAgregarAlCarrito(product, cantidad)}
            >
              Agregar al carrito
            </button>
          </div>
          <div className="mt-4 small text-black">
            <div className="d-flex align-items-start gap-3 mb-3">
              <span className="position-relative d-inline-flex flex-shrink-0">
                <FiShield size={26} />
                <FiCheck size={13} className="position-absolute top-50 start-50 translate-middle" />
              </span>

              <div>
                <p className="fw-semibold mb-0">Compra protegida</p>
                <p className="mb-0">Tus datos cuidados durante toda la compra.</p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3">
              <FiCornerUpLeft size={26} className="flex-shrink-0" />

              <div>
                <p className="fw-semibold mb-0">Cambios y devoluciones</p>
                <p className="mb-0">
                  Si no estas conforme con tu compra, Podés cambiarlo por otro o devolverlo.
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductoDetalle
