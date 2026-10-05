import { Accordion, Container } from 'react-bootstrap'

const preguntas = [
  {
    pregunta: '¿Cómo puedo realizar una compra?',
    respuesta:
      'Elegí un producto, abrí su detalle y seleccioná la cantidad que querés. Tocá "Agregar al carrito" y revisá tu selección. Antes de finalizar, creá tu perfil con tus datos y dirección de entrega. Luego confirmá la compra desde el carrito.',
  },
  {
    pregunta: '¿Realizan envíos y cuánto cuestan?',
    respuesta:
      'Hacemos envíos a todo el país. El costo es de $10.000 por pedido y el envío es gratis en compras desde $120.000. Entregamos en 2 a 4 días hábiles en Tucumán y en 5 a 8 días hábiles en el resto del país. Los plazos se cuentan desde la confirmación del pago.',
  },
  {
    pregunta: '¿Cuáles son los medios de pago?',
    respuesta:
      'Aceptamos tarjetas Visa y Mastercard, con hasta 3 cuotas sin interés. También podés pagar por transferencia bancaria con un 10% de descuento, o en efectivo al retirar tu compra en una sucursal. El descuento por transferencia no se acumula con otras promociones.',
  },
  {
    pregunta: '¿Puedo cambiar una prenda?',
    respuesta:
      'Sí, tenés 30 días corridos desde que recibís tu compra para cambiarla por otro talle o modelo. La prenda debe estar sin uso, sin lavar y con sus etiquetas originales. Presentá el comprobante de compra en una sucursal. Si elegís una prenda de mayor valor, abonás la diferencia.',
  },
  {
    pregunta: '¿Qué pasa si recibo un producto equivocado o con una falla?',
    respuesta:
      'Avisanos dentro de las primeras 48 horas desde la entrega y enviá fotos de la prenda y del comprobante. Coordinamos el retiro y el reemplazo sin costo de envío. Conservá el embalaje y las etiquetas hasta que resolvamos el cambio.',
  },
  {
    pregunta: '¿Puedo retirar mi pedido en una sucursal?',
    respuesta:
      'Sí, el retiro es gratuito en nuestras sucursales Centro y Solar. Tu pedido estará listo dentro de las 24 a 48 horas hábiles posteriores a la confirmación del pago. Para retirarlo, llevá tu documento y el comprobante de compra. Encontrá las direcciones y horarios en la sección Franquicias.',
  },
]

function PreguntasFrecuentes() {
  return (
    <section id="preguntas" className="text-dark">
      <Container className="my-5">
        <h1 className="h2 text-center mb-4">Preguntas frecuentes</h1>
        <Accordion>
          {preguntas.map((item, index) => (
            <Accordion.Item key={item.pregunta} eventKey={String(index)}>
              <Accordion.Header>{item.pregunta}</Accordion.Header>
              <Accordion.Body>{item.respuesta}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}

export default PreguntasFrecuentes
