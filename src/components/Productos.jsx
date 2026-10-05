import { Col, Container, Row } from 'react-bootstrap'
import ProductosCard from './ProductosCard'
import EnvioGratis from './EnvioGratis'

import { products } from '../data/products'

function Productos() {
  const cards = products.map((product) => (
    <Col key={product.id} xs={6} lg={3}>
      <ProductosCard product={product} />
    </Col>
  ))

  return (
    <section id="productos" className="pb-5 productos-section">
      <Container>
        <h4 className="productos-heading mb-0 position-relative start-50 vw-100 bg-black border border-black text-center text-white fw-normal">
          PRODUCTOS
        </h4>
        <EnvioGratis />

        <Row className="gx-3 gy-6 mt-3">{cards}</Row>
      </Container>
    </section>
  )
}

export default Productos
