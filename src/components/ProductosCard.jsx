import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Card } from 'react-bootstrap'
import './ProductosCard.css'

const formatoPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const formatoPrecio = (precio) => formatoPesos.format(precio)

function ProductosCard({ product }) {
  const images = product.images?.length ? product.images : [product.image]
  const [activeImage, actualizarImagenActiva] = useState(0)
  const [isHovered, actualizarCursorEncima] = useState(false)
  const [hoverImage, actualizarImagenAlPasarCursor] = useState(0)
  const hasMultipleImages = images.length > 1
  const hoverImages =
    images.length > 2 ? [images[2], images[0], images[1], ...images.slice(3)] : images
  const showHoverOrder = isHovered && images.length > 2
  const visibleImages = showHoverOrder ? hoverImages : images
  const selectedImage = showHoverOrder ? hoverImage : activeImage
  const displayedImage = visibleImages[selectedImage]

  const mostrarImagen = (index) => {
    const nextImage = (index + visibleImages.length) % visibleImages.length

    if (showHoverOrder) {
      actualizarImagenAlPasarCursor(nextImage)
      return
    }

    actualizarImagenActiva(nextImage)
  }

  const indicators = visibleImages.map((image, index) => (
    <button
      key={`${image}-${index}`}
      type="button"
      className={`foto-indicador p-0 border border-white rounded-circle ${index === selectedImage ? 'bg-white' : 'bg-transparent'}`}
      onClick={() => mostrarImagen(index)}
    />
  ))

  const controls = [
    ['previous', -1],
    ['next', 1],
  ].map(([direction, step]) => (
    <button
      key={direction}
      type="button"
      className={`position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center border-0 rounded-circle foto-control ${direction === 'previous' ? 'foto-anterior' : 'foto-siguiente'}`}
      onClick={() => mostrarImagen(selectedImage + step)}
    >
      <span className="foto-flecha" />
    </button>
  ))

  return (
    <Card
      className="h-100 d-flex flex-column overflow-hidden border-0 rounded-0 bg-transparent productos-card"
      onMouseEnter={() => {
        actualizarImagenAlPasarCursor(0)
        actualizarCursorEncima(true)
      }}
      onMouseLeave={() => {
        actualizarCursorEncima(false)
        actualizarImagenAlPasarCursor(0)
      }}
    >
      <div className="position-relative w-100 overflow-hidden foto-marco">
        <Link to={`/producto/${product.id}`} className="d-block w-100 h-100">
          <Card.Img
            key={`${displayedImage}-${selectedImage}`}
            variant="top"
            src={displayedImage}
            alt={`${product.name}, foto ${selectedImage + 1}`}
            className="w-100 h-100 object-fit-cover rounded-0 foto-producto"
          />
        </Link>
        {hasMultipleImages && (
          <>
            {controls}
            <div className="position-absolute start-0 end-0 d-flex justify-content-center foto-indicadores">
              {indicators}
            </div>
          </>
        )}
      </div>
      <Card.Body className="flex-grow-1">
        <Card.Title className="fw-normal">
          <Link className="text-reset text-decoration-none" to={`/producto/${product.id}`}>
            {product.name}
          </Link>
        </Card.Title>
        <strong className="productos-card-price fw-semibold">{formatoPrecio(product.price)}</strong>
      </Card.Body>
    </Card>
  )
}

export default ProductosCard
