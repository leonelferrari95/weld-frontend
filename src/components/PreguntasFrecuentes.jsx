import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'

function PreguntasFrecuentes() {
  return (
    <section id="preguntas">
      <Container className="my-5">
        <h2 className="text-center mb-4 text-black">Preguntas frecuentes</h2>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>¿Cómo puedo realizar una compra?</Accordion.Header>
            <Accordion.Body>
              Podés realizar tu compra seleccionando el producto que te interesa y siguiendo los
              pasos indicados en la página.
              Podés realizar tu compra seleccionando el producto que te interesa y siguiendo
              los pasos indicados en la página.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>¿Realizan envíos?</Accordion.Header>
            <Accordion.Body>
              Sí, realizamos envíos. Para conocer las opciones disponibles, podés comunicarte con
              nosotros desde la sección de contacto.
              Sí, realizamos envíos. Para conocer las opciones disponibles, podés comunicarte
              con nosotros desde la sección de contacto.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>¿Cuáles son los medios de pago?</Accordion.Header>
            <Accordion.Body>
              Podés consultar los medios de pago disponibles comunicándote con nuestro equipo.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>¿Puedo realizar un cambio?</Accordion.Header>
            <Accordion.Body>
              Sí. Para consultar las condiciones de cambio, comunicate con nosotros indicando los
              datos de tu compra.
              Sí. Para consultar las condiciones de cambio, comunicate con nosotros indicando
              los datos de tu compra.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </section>
  )
}

export default PreguntasFrecuentes
