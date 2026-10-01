import { useRef, useState } from 'react'
import { Button, Container, Modal, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap'
import './Navbar.css'

function Navbar({ mostrarPreguntas, setMostrarPreguntas }) {
  const [showRegister, setShowRegister] = useState(false)
  const [activeSection, setActiveSection] = useState(() => window.location.hash)
  const navbarToggleRef = useRef(null)

  const sectionLink = (href, label) => (
    <Nav.Link
      href={href}
      className={activeSection === href ? 'active' : undefined}
      onClick={() => {
        setActiveSection(href)
        setMostrarPreguntas(false)
      }}
    >
      {label}
    </Nav.Link>
  )

  const irAlInicio = () => {
    setMostrarPreguntas(false)
    navbarToggleRef.current?.click()
  }

  const irAPreguntas = () => {
    setMostrarPreguntas(true)
    navbarToggleRef.current?.click()
  }

  return (
    <>
      <BootstrapNavbar
        expand="xxl"
        className="position-relative py-2 weld-navbar"
      >
        <Container
          fluid
          className="position-relative justify-content-between weld-navbar-container"
        >
          <div className="d-flex align-items-center">
            <BootstrapNavbar.Toggle
              ref={navbarToggleRef}
              aria-controls="weld-navbar-links"
              aria-label="Abrir menú"
            />

            <BootstrapNavbar.Collapse id="weld-navbar-links">
              <Nav className="gap-2 weld-section-links">

                <Nav.Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    irAlInicio()
                  }}
                  className={!mostrarPreguntas ? 'active' : undefined}
                >
                  SHOP NOW
                </Nav.Link>

                {sectionLink('#franquicias', 'FRANQUICIAS')}

                <Nav.Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    irAPreguntas()
                  }}
                  className={mostrarPreguntas ? 'active' : undefined}
                >
                  PREGUNTAS FRECUENTES
                </Nav.Link>

                {sectionLink('#contacto', 'CONTACTANOS')}

                {sectionLink('#nosotros', 'NOSOTROS')}

              </Nav>
            </BootstrapNavbar.Collapse>
          </div>

          <BootstrapNavbar.Brand
            href="#"
            aria-label="Weld, inicio"
            onClick={(e) => {
              e.preventDefault()
              irAlInicio()
            }}
            className="position-absolute top-50 start-50 z-2 translate-middle m-0 p-0"
          >
            <img
              src="/img/weldblanco.png"
              alt="Weld"
              className="logo-navbar"
            />
          </BootstrapNavbar.Brand>

          <Nav className="d-flex align-items-center flex-row flex-nowrap gap-1 ms-auto z-3 text-nowrap weld-navbar-actions">

            <Nav.Link
              href="#carrito"
              aria-label="Ver carrito"
              className="d-inline-flex align-items-center justify-content-center p-0 border-0 rounded-0 bg-transparent cart-nav-link"
            >
              <img
                src="/img/carritosinfondo.png"
                alt=""
                className="cart-logo"
              />
            </Nav.Link>

            <Button
              type="button"
              variant="link"
              className="d-inline-flex align-items-center justify-content-center p-0 border-0 rounded-0 bg-transparent user-nav-link"
              aria-label="Registrarse"
              onClick={() => setShowRegister(true)}
            >
              <svg
                className="user-logo"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5Zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5Z" />
              </svg>
            </Button>

          </Nav>
        </Container>
      </BootstrapNavbar>

      <Modal
        show={showRegister}
        onHide={() => setShowRegister(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          El formulario de registro se puede agregar cuando migremos esa sección.
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Navbar