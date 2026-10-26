import { useEffect, useState } from 'react'
import { Alert, Breadcrumb, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Login() {
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const tituloAnterior = document.title
    document.title = 'Iniciar sesión | Weld Company'
    return () => {
      document.title = tituloAnterior
    }
  }, [])

  const enviar = (event) => {
    event.preventDefault()
    setMensaje(
      'El inicio de sesión estará disponible cuando conectemos el backend. Todavía no se verificaron tus credenciales.',
    )
    event.currentTarget.elements.password.value = ''
  }

  return (
    <section className="bg-white text-dark py-4 py-lg-5">
      <Container>
        <Row>
          <Col xs={12} md={8} lg={6}>
            <Breadcrumb className="small">
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                Inicio
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Iniciar sesión</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="display-5 fw-semibold mb-4">Iniciar sesión</h1>
            <p className="mb-4">Ingresá con tu email y contraseña.</p>
            <Form onSubmit={enviar} onChange={() => setMensaje('')}>
              <Form.Group className="mb-4" controlId="login-email">
                <Form.Label className="small">Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="tuemail@ejemplo.com"
                  autoComplete="username"
                  required
                  className="rounded-0 py-3 shadow-none"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="login-password">
                <Form.Label className="small">Contraseña</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                  required
                  className="rounded-0 py-3 shadow-none"
                />
              </Form.Group>
              {mensaje && (
                <Alert variant="info" role="status">
                  {mensaje}
                </Alert>
              )}
              <Button type="submit" variant="dark" className="w-100 rounded-0 py-3">
                Iniciar sesión
              </Button>
            </Form>
            <p className="mt-4 small">
              ¿Todavía no tenés un perfil?{' '}
              <Link to="/registro" className="text-dark">
                Crear perfil
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login
