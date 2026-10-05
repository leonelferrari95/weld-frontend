import { useEffect, useState } from 'react'
import { Alert, Breadcrumb, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CampoCuenta({ campo }) {
  return (
    <Form.Group className="mb-4" controlId={campo.name}>
      <Form.Label className="small">{campo.label}</Form.Label>
      <>
        {campo.type === 'select' ? (
          <Form.Select
            name={campo.name}
            required
            autoComplete={campo.autoComplete}
            defaultValue=""
            className="rounded-0 py-3 shadow-none"
          >
            <option value="" disabled>
              Seleccioná tu provincia
            </option>
            {campo.options.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </Form.Select>
        ) : (
          <Form.Control
            name={campo.name}
            defaultValue={campo.value}
            readOnly={campo.readOnly}
            type={campo.type}
            placeholder={campo.placeholder}
            autoComplete={campo.autoComplete}
            required={campo.required !== false}
            className="rounded-0 py-3 shadow-none"
          />
        )}
      </>
    </Form.Group>
  )
}

function FormularioCuenta({ titulo, descripcion, campos, onEnviar }) {
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const tituloAnterior = document.title
    const meta = document.querySelector('meta[name="description"]')
    const descripcionAnterior = meta?.content
    document.title = `${titulo} | Weld Company`
    if (meta) meta.content = descripcion
    return () => {
      document.title = tituloAnterior
      if (meta) meta.content = descripcionAnterior
    }
  }, [titulo, descripcion])

  const enviar = (event) => {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    setMensaje('')
    const valores = Object.fromEntries(
      [...datos.entries()].map(([clave, valor]) => [clave, valor.trim()]),
    )
    if (campos.some((campo) => campo.required !== false && !valores[campo.name])) {
      setError('Completá todos los campos obligatorios.')
      return
    }
    const resultado = onEnviar?.(valores)
    if (resultado) {
      setError(resultado)
      return
    }
    setError('')
    setMensaje('Perfil guardado en este navegador.')
    event.currentTarget.reset()
  }

  return (
    <section className="bg-white text-dark py-4 py-lg-5" aria-labelledby="titulo-cuenta">
      <Container>
        <Row>
          <Col xs={12} md={8} lg={6}>
            <Breadcrumb className="small">
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                Inicio
              </Breadcrumb.Item>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/perfil' }}>
                Mi cuenta
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{titulo}</Breadcrumb.Item>
            </Breadcrumb>
            <h1 id="titulo-cuenta" className="display-5 fw-semibold mb-4">
              {titulo}
            </h1>
            <p className="mb-4">Completá tus datos para la entrega.</p>
            <Form
              onSubmit={enviar}
              onChange={() => {
                setError('')
                setMensaje('')
              }}
            >
              {campos.map((campo) => (
                <CampoCuenta key={campo.name} campo={campo} />
              ))}
              <p className="small text-secondary">
                Tus datos se guardan en este navegador hasta que cierres sesión.
              </p>
              {error && (
                <Alert variant="danger" role="alert">
                  {error}
                </Alert>
              )}
              {mensaje && (
                <Alert variant="info" role="status">
                  {mensaje}
                </Alert>
              )}
              <Button type="submit" variant="dark" className="w-100 rounded-0 py-3">
                {titulo}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default FormularioCuenta
