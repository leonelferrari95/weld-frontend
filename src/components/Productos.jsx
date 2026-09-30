import { Col, Container, Row } from 'react-bootstrap'
import ProductosCard from './ProductosCard'

const products = [
  {
    id: 1,
    name: 'CAMISA WELD BLUE',
    price: '$55.000,00',
    image: '/img/45.camisa-4x5.png',
  },
  {
    id: 2,
    name: 'REMERA WELD WHITE',
    price: '$45.000,00',
    image: '/img/REMERAWELD.png',
  },
  {
    id: 3,
    name: 'CAMPERA WELD BLACK',
    price: '$150.000,00',
    image: '/img/campeweld.png',
  },
   {
    id: 4,
    name: 'JEAN WELD BLACK',
    price: '$90.000,00',
    image: '/img/pantalonweld.png',
  },
]

function Productos() {
  return (
    <section id="productos" className="pb-5 productos-section">
      <Container>
        <h4 className="productos-heading mb-4">PRODUCTOS</h4>

        <Row className="gx-3 gy-6">
          {products.map((product) => (
            <Col key={product.id} xs={6} lg={3}>
              <ProductosCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Productos
