import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  })

  const [enviado, setEnviado] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((actual) => ({ ...actual, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const campos = [
      { key: 'nombre', label: 'Nombre' },
      { key: 'correo', label: 'Correo' },
      { key: 'mensaje', label: 'Mensaje' },
    ]

    const campoFaltante = campos.find(({ key }) => !formData[key].trim())

    if (campoFaltante) {
      const input = document.querySelector(`[name="${campoFaltante.key}"]`)
      input?.focus()
      alert(`Falta completar: ${campoFaltante.label}`)
      return
    }

    setEnviado(true)
    setFormData({ nombre: '', correo: '', mensaje: '' })
  }

  return (
    <section id="contacto" className="py-5" style={{ backgroundColor: '#ffffff' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={8} xl={6}>
            <h2 className="text-center mb-4 text-black" style={{ letterSpacing: '0.08em' }}>
              CONTACTANOS
            </h2>

            <div
              className="p-4 p-md-5"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: 'none',
                transform: 'none',
              }}
            >
              <Form onSubmit={handleSubmit}>
                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Nombre"
                      required
                      style={{
                        borderRadius: '0',
                        border: '1px solid #ececec',
                        backgroundColor: '#ffffff',
                        boxShadow: 'none',
                        color: '#111111',
                        padding: '0.85rem 0.9rem',
                      }}
                    />
                  </Col>

                  <Col md={6}>
                    <Form.Control
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="Correo"
                      required
                      style={{
                        borderRadius: '0',
                        border: '1px solid #ececec',
                        backgroundColor: '#ffffff',
                        boxShadow: 'none',
                        color: '#111111',
                        padding: '0.85rem 0.9rem',
                      }}
                    />
                  </Col>
                </Row>

                <Form.Group className="mb-4" controlId="contactoMensaje">
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Mensaje"
                    required
                    style={{
                      borderRadius: '0',
                      border: '1px solid #e5e5e5',
                      backgroundColor: '#ffffff',
                      boxShadow: 'none',
                      color: '#111111',
                      padding: '0.85rem 0.9rem',
                    }}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="dark"
                    className="fw-semibold py-2"
                    style={{
                      borderRadius: '0',
                      letterSpacing: '0.04em',
                      backgroundColor: '#111111',
                      border: '1px solid #111111',
                      boxShadow: 'none',
                    }}
                  >
                    ENVIAR
                  </Button>
                </div>

                {enviado && (
                  <p className="text-success mt-3 mb-0 text-center">
                    ¡Tu mensaje fue enviado correctamente!
                  </p>
                )}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contacto
