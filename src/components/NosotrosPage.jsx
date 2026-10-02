import { Button, Container } from 'react-bootstrap'

function NosotrosPage({ onClose }) {
  return (
    <section id="nosotros" aria-label="Nosotros">
      <Container fluid className="bg-black px-3 px-lg-5 py-3">
        <Button
          type="button"
          variant="link"
          className="p-0 text-white fw-normal text-decoration-none"
          onClick={onClose}
        >
          Volver al inicio
        </Button>
      </Container>
      <hr className="m-0 w-100 border-white border-1 opacity-100" />
      <picture className="d-block w-100">
        <source
          media="(max-width: 767.98px)"
          srcSet="/img/welduscel.png"
          width={1122}
          height={1402}
        />
        <img
          src="/img/welduspc.png"
          width={1672}
          height={941}
          alt="Nosotros, Weld Company"
          className="d-block w-100 h-auto"
        />
      </picture>
      <hr className="m-0 w-100 border-white border-1 opacity-100" />
    </section>
  )
}

export default NosotrosPage
