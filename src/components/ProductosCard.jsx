import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import './ProductosCard.css'

function ProductosCard({ product }) {
  const images = product.images?.length ? product.images : [product.image]
  const [activeImage, setActiveImage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchPreview, setIsTouchPreview] = useState(false)
  const [hoverImage, setHoverImage] = useState(0)
  const hasMultipleImages = images.length > 1
  const hoverImages = images.length > 2
    ? [images[2], images[0], images[1], ...images.slice(3)]
    : images
  const showHoverOrder = (isHovered || isTouchPreview) && images.length > 2
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

  return (
    <Card
      className="h-100 productos-card"
      onMouseEnter={() => {
        setHoverImage(0)
        setIsTouchPreview(false)
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsTouchPreview(false)
        setHoverImage(0)
      }}
    >
      <div className="productos-card-image-frame">
        <Card.Img
          key={`${displayedImage}-${selectedImage}`}
          variant="top"
          src={displayedImage}
          alt={`${product.name}, foto ${selectedImage + 1}`}
          className="productos-card-image"
          role={images.length > 2 ? 'button' : undefined}
          tabIndex={images.length > 2 ? 0 : undefined}
          aria-label={images.length > 2 ? `Alternar vista de fotos de ${product.name}` : undefined}
          onClick={() => {
            if (images.length > 2 && window.matchMedia('(hover: none)').matches) {
              setHoverImage(0)
              setIsTouchPreview((isActive) => !isActive)
            }
          }}
          onKeyDown={(event) => {
            if (images.length > 2 && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault()
              setHoverImage(0)
              setIsTouchPreview((isActive) => !isActive)
            }
          }}
        />
        {hasMultipleImages && (
          <>
            <button
              type="button"
              className="productos-card-image-control productos-card-image-control--previous"
              aria-label={`Ver foto anterior de ${product.name}`}
              onClick={() => showImage(selectedImage - 1)}
            >
              <span className="productos-card-image-chevron" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="productos-card-image-control productos-card-image-control--next"
              aria-label={`Ver foto siguiente de ${product.name}`}
              onClick={() => showImage(selectedImage + 1)}
            >
              <span className="productos-card-image-chevron" aria-hidden="true" />
            </button>
            <div className="productos-card-image-indicators" aria-label="Fotos del producto">
              {visibleImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`productos-card-image-indicator${index === selectedImage ? ' is-active' : ''}`}
                  aria-label={`Ver foto ${index + 1} de ${product.name}`}
                  aria-current={index === selectedImage ? 'true' : undefined}
                  onClick={() => showImage(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <strong className="productos-card-price">{product.price}</strong>
      </Card.Body>
    </Card>
  )
}

export default ProductosCard
