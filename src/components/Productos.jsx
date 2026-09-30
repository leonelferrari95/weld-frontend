import { Col, Container, Row } from 'react-bootstrap'
import ProductosCard from './ProductosCard'

const products = [
  {
    id: 1,
    name: 'CAMISA WELD BLUE',
    price: '$55.000,00',
    images: ['/img/camisaweldadelante2.png', '/img/camisaatrasweld3.png', '/img/camisaweld3.png'],
  },
  {
    id: 2,
    name: 'REMERA WELD WHITE',
    price: '$45.000,00',
    images: ['/img/remeraweld2.png', '/img/remeraweld3.png', '/img/remeraweld4.png'],
  },
        {
    id: 3,
    name: 'POLO WELD RED WOMEN',
    price: '$40.000,00',
    images: ['/img/poloweldmujer.png', '/img/poloweldmujer2.png', '/img/poloweldmujer3.png'],
  },
  {
    id: 4,
    name: 'SHORT WELD SHINE',
    price: '$75.000,00',
    images: ['/img/shortweld.png', '/img/shortweld2.png', '/img/shortweld3.png'],
  },

     {
    id: 5,
    name: 'POLO WELD BLUE',
    price: '$80.000,00',
    images: ['/img/poloweld.png', '/img/poloweld2.png', '/img/poloweld3.png'],
  },
       {
    id: 6,
    name: 'ZIPHOODIE WELD BLACK',
    price: '$100.000,00',
    images: ['/img/ziphoodieweld.png', '/img/ziphoodieweld2.png', '/img/ziphoodieweld3.png'],
  },
    {
    id: 7 ,
    name: 'CAMPERA WELD BLACK',
    price: '$150.000,00',
    images: ['/img/campeweld.png', '/img/campeweld2.png', '/img/campeweld5.png'],
  },
     {
    id: 8,
    name: 'JEAN WELD BLACK',
    price: '$90.000,00',
    images: ['/img/pantalonweld.png', '/img/pantalonweld2.png', '/img/pantalonweld3.png'],
  },
]

function Productos() {
  return (
    <section id="productos" className="pb-5 productos-section">
      <Container>
        <h4 className="productos-heading mb-0">PRODUCTOS</h4>
        <div className="productos-marquee" aria-label="Envío gratis a partir de $120.000. Weld Company.">
          <div className="productos-marquee-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div className="productos-marquee-group" key={copy}>
                {[0, 1, 2, 3].map((item) => (
                  <div className="productos-marquee-item" key={item}>
                    <span>ENVÍO GRATIS: A PARTIR DE $120.000</span>
                    <span className="productos-marquee-brand">® WELD COMPANY</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <Row className="gx-3 gy-6 mt-3">
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
