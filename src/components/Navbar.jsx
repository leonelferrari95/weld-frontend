import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Badge, Button, Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap'
import './Navbar.css'

function Navbar({ onCarritoClick, cantidadCarrito, perfil }) {
  const [expanded, setExpanded] = useState(false)
  const cerrarMenu = () => setExpanded(false)

  const sectionLink = (to, label) => (
    <Nav.Link as={NavLink} to={to} className="fs-6 fw-normal" onClick={cerrarMenu}>
      {label}
    </Nav.Link>
  )

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

            <BootstrapNavbar.Collapse id="weld-navbar-links" className="flex-xxl-grow-0">
              <Nav className="gap-0 gap-xxl-2 align-items-start align-items-xxl-stretch weld-section-links">
                {sectionLink('/productos', 'SHOP NOW')}
                {sectionLink('/franquicias', 'FRANQUICIAS')}
                {sectionLink('/preguntas', 'PREGUNTAS FRECUENTES')}
                {sectionLink('/contacto', 'CONTACTANOS')}
                {sectionLink('/nosotros', 'NOSOTROS')}
              </Nav>
            </BootstrapNavbar.Collapse>
          </div>

          <BootstrapNavbar.Brand
            as={Link}
            to="/"
            aria-label="Weld, inicio"
            onClick={cerrarMenu}
            className="weld-navbar-brand top-50 start-50 flex-shrink-0 z-2 p-0"
          >
            <img src="/img/weldblanco.png" alt="Weld" className="logo-navbar object-fit-contain" />
          </BootstrapNavbar.Brand>

          <Nav className="d-flex align-items-center flex-row flex-nowrap flex-shrink-0 gap-1 ms-auto ms-xxl-0 z-3 text-nowrap weld-navbar-actions">
            <Button
              type="button"
              variant="link"
              aria-label={`Abrir carrito, ${cantidadCarrito} productos`}
              aria-controls="carrito"
              onClick={() => {
                setExpanded(false)
                onCarritoClick()
              }}
              className="position-relative d-inline-flex align-items-center justify-content-center p-0 border-0 rounded-0 bg-transparent weld-navbar-action"
            >
              <img
                src="/img/carritosinfondo.png"
                alt=""
                className="cart-logo d-block object-fit-contain"
              />
              {cantidadCarrito > 0 && (
                <Badge bg="light" text="dark" pill className="position-absolute top-0 end-0">
                  {cantidadCarrito}
                </Badge>
              )}
            </Button>

            <Button
              type="button"
              variant="link"
              className="d-inline-flex align-items-center justify-content-center p-0 border-0 rounded-0 bg-transparent weld-navbar-action"
              as={Link}
              to={perfil ? '/perfil' : '/registro'}
              aria-label="Mi cuenta"
              onClick={cerrarMenu}
            >
              <svg
                className="user-logo d-block"
                fill="#fff"
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
    </>
  )
}

export default Navbar
