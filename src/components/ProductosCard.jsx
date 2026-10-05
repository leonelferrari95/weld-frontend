import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { formatoPrecio } from '../utils/precios'
import './ProductosCard.css'

function ProductosCard({ product }) {
  const images = product.images?.length ? product.images : [product.image]
  const [activeImage, setActiveImage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hoverImage, setHoverImage] = useState(0)
  const hasMultipleImages = images.length > 1
  const hoverImages =
    images.length > 2 ? [images[2], images[0], images[1], ...images.slice(3)] : images
  const showHoverOrder = isHovered && images.length > 2
  const visibleImages = showHoverOrder ? hoverImages : images
  const selectedImage = showHoverOrder ? hoverImage : activeImage
  const displayedImage = visibleImages[selectedImage]

  const showImage = (index) => {
    const nextImage = (index + visibleImages.length) % visibleImages.length

    if (showHoverOrder) {
      setHoverImage(nextImage)
      return
    }

    setActiveImage(nextImage)
  }

  const indicators = visibleImages.map((image, index) => (
    <button
      key={`${image}-${index}`}
      type="button"
      className={`foto-indicador p-0 border border-white rounded-circle ${index === selectedImage ? 'bg-white' : 'bg-transparent'}`}
      aria-label={`Ver foto ${index + 1} de ${product.name}`}
      aria-current={index === selectedImage ? 'true' : undefined}
      onClick={() => showImage(index)}
    />
  ))

  const controls = [
    ['previous', 'anterior', -1],
    ['next', 'siguiente', 1],
  ].map(([direction, label, step]) => (
    <button
      key={direction}
      type="button"
      className={`position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center border-0 rounded-circle foto-control ${direction === 'previous' ? 'foto-anterior' : 'foto-siguiente'}`}
      aria-label={`Ver foto ${label} de ${product.name}`}
      onClick={() => showImage(selectedImage + step)}
    >
      <span className="foto-flecha" aria-hidden="true" />
    </button>
  ))

  return (
    <Card
      className="h-100 d-flex flex-column overflow-hidden border-0 rounded-0 bg-transparent productos-card"
      onMouseEnter={() => {
        setHoverImage(0)
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setHoverImage(0)
      }}
    >
      <div className="position-relative w-100 overflow-hidden foto-marco">
        <Link
          to={`/producto/${product.id}`}
          className="d-block w-100 h-100"
          aria-label={`Ver detalle de ${product.name}`}
        >
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
            <div
              className="position-absolute start-0 end-0 d-flex justify-content-center foto-indicadores"
              aria-label="Fotos del producto"
            >
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
