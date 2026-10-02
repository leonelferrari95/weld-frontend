import { Button, Container, Image } from 'react-bootstrap'
import './FranquiciasPage.css'

function FranquiciasPage({ onClose }) {
  return (
    <section id="franquicias" className="franquicias-page">
      <picture className="position-absolute top-0 start-0 w-100 h-100">
        <source media="(max-width: 767.98px)" srcSet="/img/sucursalweldcel.png" />
        <Image src="/img/sucursalweldpc.png" alt="" className="w-100 h-100 object-fit-cover" />
      </picture>
      <Container fluid className="franquicias-page-container">
        <button type="button" className="franquicias-home-link" onClick={onClose}>
          Volver al inicio
        </button>
        <div className="franquicias-page-content">
          <h1 className="display-4 franquicias-page-title">Conoce nuestras sucursales</h1>
          <Button
            href="https://wa.me/5493816414960"
            target="_blank"
            rel="noreferrer"
            variant="light"
            size="lg"
            className="franquicias-more-button rounded-0 px-4 fw-semibold"
          >
            Ver más
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default FranquiciasPage