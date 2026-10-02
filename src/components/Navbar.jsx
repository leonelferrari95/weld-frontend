import { useState } from 'react'
import {
  Button,
  Container,
  Modal,
  Nav,
  Navbar as BootstrapNavbar,
} from 'react-bootstrap'
import './Navbar.css'

function Navbar({
  onFranquiciasClick,
  mostrarPreguntas,
  setMostrarPreguntas,
}) {
  const [showRegister, setShowRegister] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState(
    () => window.location.hash,
  )

  const cerrarSecciones = () => {
    setMostrarPreguntas(false)
    setExpanded(false)
  }

  const sectionLink = (href, label) => (
    <Nav.Link
      href={`?${href}`}
      className={`fs-6 fw-normal${
        !mostrarPreguntas && activeSection === href ? ' active' : ''
      }`}
      onClick={() => {
        setActiveSection(href)
        cerrarSecciones()
      }}
    >
      {label}
    </Nav.Link>
  )

  const abrirFranquicias = (event) => {
    event.preventDefault()
    setActiveSection('#franquicias')
    setExpanded(false)
    onFranquiciasClick()
  }

  const abrirPreguntas = (event) => {
    event.preventDefault()
    setActiveSection('#preguntas')
    setMostrarPreguntas(true)
    setExpanded(false)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <BootstrapNavbar
        expand="xxl"
        expanded={expanded}
        onToggle={setExpanded}
        className="position-relative py-2 bg-black weld-navbar"
      >
        <Container
          fluid
          className="position-relative justify-content-between weld-navbar-container"
        >
          <div className="d-flex align-items-center">
            <BootstrapNavbar.Toggle
              className="z-3 m-0 p-1 border-0 rounded-0 shadow-none"
              aria-controls="weld-navbar-links"
              aria-label={expanded ? 'Cerrar menú' : 'Abrir menú'}
            />

            <BootstrapNavbar.Collapse
              id="weld-navbar-links"
              className="flex-xxl-grow-0"
            >
              <Nav className="gap-0 gap-xxl-2 align-items-start align-items-xxl-stretch weld-section-links">
                {sectionLink('#productos', 'SHOP NOW')}

                <Nav.Link
                  href="#franquicias"
                  className={`fs-6 fw-normal${
                    !mostrarPreguntas && activeSection === '#franquicias'
                      ? ' active'
                      : ''
                  }`}
                  onClick={abrirFranquicias}
                >
                  FRANQUICIAS
                </Nav.Link>

                <Nav.Link
                  href="#preguntas"
                  className={`fs-6 fw-normal${
                    mostrarPreguntas ? ' active' : ''
                  }`}
                  onClick={abrirPreguntas}
                >
                  PREGUNTAS FRECUENTES
                </Nav.Link>

                {sectionLink('#contacto', 'CONTACTANOS')}
                {sectionLink('#nosotros', 'NOSOTROS')}
              </Nav>
            </BootstrapNavbar.Collapse>
          </div>

          <BootstrapNavbar.Brand
            href="?#inicio"
            aria-label="Weld, inicio"
            onClick={cerrarSecciones}
            className="weld-navbar-brand top-50 start-50 flex-shrink-0 z-2 p-0"
          >
            <img
              src="/img/weldblanco.png"
              alt="Weld"
              className="logo-navbar object-fit-contain"
            />
          </BootstrapNavbar.Brand>

          <Nav className="d-flex align-items-center flex-row flex-nowrap flex-shrink-0 gap-1 ms-auto ms-xxl-0 z-3 text-nowrap weld-navbar-actions">
            <Nav.Link
              href="#carrito"
              aria-label="Ver carrito"
              className="d-inline-flex align-items-center justify-content-center p-0 border-0 rounded-0 bg-transparent weld-navbar-action"
            >
              <img
                src="/img/carritosinfondo.png"
                alt=""
                className="cart-logo d-block object-fit-contain"
              />
            </Nav.Link>

            <Button
              type="button"
              variant="link"
              className="d-inline-flex align-items-center justify-content-center p-0 border-0 rounded-0 bg-transparent weld-navbar-action"
              aria-label="Registrarse"
              onClick={() => setShowRegister(true)}
            >
              <svg
                className="user-logo d-block"
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