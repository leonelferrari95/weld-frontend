import { Button, Container, Image } from 'react-bootstrap'
import './FranquiciasPage.css'

function SeccionImagen({ id, title, onClose, onMore, mobileImage, desktopImage }) {
  return (
    <section
      id={id}
      aria-label={title}
      className="franquicias-page position-relative overflow-hidden"
    >
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
      <Container
        fluid
        className="franquicias-page-container position-relative d-flex align-items-center justify-content-center text-center"
      >
        <button
          type="button"
          className="franquicias-home-link position-absolute top-0 start-0 m-3 m-md-4 p-0 border-0 bg-transparent text-white text-decoration-none"
          onClick={onClose}
        >
          Volver al inicio
        </button>
        <div className="franquicias-page-content">
          <h1 className="display-4 franquicias-page-title">{title}</h1>
          <Button
            onClick={onMore}
            href={onMore ? undefined : 'https://wa.me/5493816414960'}
            target={onMore ? undefined : '_blank'}
            rel={onMore ? undefined : 'noreferrer'}
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
