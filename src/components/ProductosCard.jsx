import Card from 'react-bootstrap/Card'
import './ProductosCard.css'

function ProductosCard({ product }) {
  return (
    <Card className="h-100 productos-card">
      <div className="productos-card-image-frame">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="productos-card-image"
        />
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
