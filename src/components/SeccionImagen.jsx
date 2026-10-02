import { Button, Container, Image } from 'react-bootstrap'
import './FranquiciasPage.css'

function SeccionImagen({ id, title, onClose, mobileImage, desktopImage }) {
  return (
    <section id={id} aria-label={title} className="franquicias-page">
      <picture className="position-absolute top-0 start-0 w-100 h-100">
        <source
          media="(max-width: 767.98px)"
          srcSet={mobileImage.src}
          width={mobileImage.width}
          height={mobileImage.height}
        />
        <Image
          src={desktopImage.src}
          width={desktopImage.width}
          height={desktopImage.height}
          alt=""
          className="w-100 h-100 object-fit-cover"
        />
      </picture>
      <Container fluid className="franquicias-page-container">
        <button type="button" className="franquicias-home-link" onClick={onClose}>
          Volver al inicio
        </button>
        <div className="franquicias-page-content">
          <h1 className="display-4 franquicias-page-title">{title}</h1>
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

export default SeccionImagen
