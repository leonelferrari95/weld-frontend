import { Button, Container, Image } from 'react-bootstrap'
import './FranquiciasPage.css'

function FranquiciasPage({ onCerrar, onVerMas }) {
  return (
    <section
      id="franquicias"
      className="franquicias-page text-white position-relative overflow-hidden"
    >
      <picture className="position-absolute top-0 start-0 w-100 h-100">
        <source
          media="(max-width: 767.98px)"
          srcSet="/img/sucursalweldcel.png"
          width={950}
          height={1656}
        />
        <Image
          src="/img/sucursalweldpc.png"
          width={1672}
          height={941}
          alt=""
          className="w-100 h-100 object-fit-cover"
        />
      </picture>
      <Container
        fluid
        className="franquicias-contenedor position-relative d-flex align-items-center justify-content-center text-center"
      >
        <button
          type="button"
          className="franquicias-inicio position-absolute top-0 start-0 m-3 m-md-4 p-0 border-0 bg-transparent text-white text-decoration-none"
          onClick={onCerrar}
        >
          Volver al inicio
        </button>
        <div className="franquicias-contenido w-100">
          <h1 className="display-4 fw-semibold franquicias-titulo">Conoce nuestras sucursales</h1>
          <Button
            onClick={onVerMas}
            href={onVerMas ? undefined : 'https://wa.me/5493816414960'}
            target={onVerMas ? undefined : '_blank'}
            rel={onVerMas ? undefined : 'noreferrer'}
            variant="light"
            size="lg"
            className="franquicias-boton rounded-0 px-4 fw-semibold"
          >
            Ver más
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default FranquiciasPage
