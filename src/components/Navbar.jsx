import { useState } from 'react'
import { Button, Container, Modal, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap'
import './Navbar.css'

function Navbar() {
  const [showRegister, setShowRegister] = useState(false)
  const [activeSection, setActiveSection] = useState(() => window.location.hash)

  const sectionLink = (href, label) => (
    <Nav.Link
      href={href}
      className={activeSection === href ? 'active' : undefined}
      onClick={() => setActiveSection(href)}
    >
      {label}
    </Nav.Link>
  )

  return (
    <>
      <BootstrapNavbar expand="lg" className="weld-navbar">
        <Container fluid className="weld-navbar-container">
          <div className="weld-navbar-left">
            <BootstrapNavbar.Toggle
              aria-controls="weld-navbar-links"
              aria-label="Abrir menú"
            />

            <BootstrapNavbar.Collapse id="weld-navbar-links">
              <Nav className="weld-section-links">
                {sectionLink('#productos', 'SHOP NOW')}
                {sectionLink('#franquicias', 'FRANQUICIAS')}
                {sectionLink('#preguntas', 'PREGUNTAS FRECUENTES')}
                {sectionLink('#contacto', 'CONTACTANOS')}
              </Nav>
            </BootstrapNavbar.Collapse>
          </div>

          <BootstrapNavbar.Brand href="#inicio" aria-label="Weld, inicio">
            <img
              src="/img/weldblanco.png"
              alt="Weld"
              className="logo-navbar"
            />
          </BootstrapNavbar.Brand>

          <Nav className="weld-navbar-actions">
            <Nav.Link href="#carrito" aria-label="Ver carrito" className="cart-nav-link">
              <img src="/img/carritosinfondo.png" alt="" className="cart-logo" />
            </Nav.Link>
            <Button
              type="button"
              variant="link"
              className="user-nav-link"
              aria-label="Registrarse"
              onClick={() => setShowRegister(true)}
            >
              <svg className="user-logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5Zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5Z" />
              </svg>
            </Button>
          </Nav>
        </Container>
      </BootstrapNavbar>

      <Modal show={showRegister} onHide={() => setShowRegister(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>El formulario de registro se puede agregar cuando migremos esa sección.</Modal.Body>
      </Modal>
    </>
  )
}

export default Navbar
