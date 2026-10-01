import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'

function PreguntasFrecuentes() {
  return (
    <section id="preguntas">
      <Container className="my-5">
        <h2 className="text-center mb-4">PREGUNTAS FRECUENTES</h2>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              ¿Cómo puedo realizar una compra?
            </Accordion.Header>
            <Accordion.Body>
              Podés realizar tu compra seleccionando el producto que te
              interesa y siguiendo los pasos indicados en la página.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Recibí un artículo fallado ¿Qué debo hacer?
            </Accordion.Header>
            <Accordion.Body>
             No te preocupes, quizás se trate de una prenda que se haya filtrado de nuestra mesa de revisión, nos haremos cargo de todos los costos que impliquen cambiarlas, incluso en algunos casos podrás conservar la prenda en cuestión y te mandaremos instantáneamente otra igual pero corregida. 
             Lo único que tenes que hacer es comunicarte por los canales de contacto y manifestarnos con fotos y detalles las imperfecciones que recibiste de la prenda, así el sector encargado iniciara el proceso de cambio.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              ¿Cómo se recomiendan lavar las prendas?
            </Accordion.Header>
            <Accordion.Body>
              El lavado de cada prenda va a depender siempre del tipo de tela en la que se encuentre confeccionada, para saber de cual se está hablando recomendamos leer las especificaciones en la ficha técnica de cada ítem ubicada en la parte derecha del artículo. 
              Casi todas las telas se recomiendan lavar de la misma forma, acá te dejamos con algunos tips para que tengas en cuenta:
              Aconsejamos que toda nuestra ropa se lave a 30 grados o menos, aunque preferiblemente con agua fría.
              Evitar lavarropas. Siempre optar por lavado a mano (en especial si se trata de una prenda con estampado/s).
              Desde adentro hacia afuera.
              No planche nuestra ropa de poliéster o microfibra.
              Para ropa de algodón, use una plancha fría y no planche el logotipo / la marca o algún estampado que encuentre en ella.
              Es muy importante que evites usar un secarropa o someter la prenda a mucho calor, porque el algodón genuino tiende a contraerse ante altas temperaturas.
              Evite el uso de químicos agresivos que puedan generar efectos secundarios en prendas especiales como camisas, shorts o jeans.
              Es importante seguir dichas recomendaciones para evitar el daño de la prenda, ya que si es percudida no será válido su cambio. 
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              ¿Como puedo realizar un cambio?
            </Accordion.Header>
            <Accordion.Body>
              Para consultar las condiciones de cambio, comunicate con
              nosotros indicando los datos de tu compra.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </section>
  )
}

export default PreguntasFrecuentes
