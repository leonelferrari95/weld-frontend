import { Col, Container, Nav, Row } from 'react-bootstrap'
import './Footer.css'
import { FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa'
const footerSections = [
  {
    title: 'WELD COMPANY',
    links: [
      { label: 'INICIO', href: '#inicio' },
      { label: 'NOSOTROS', href: '#nosotros' },
      { label: 'FRANQUICIAS', href: '#franquicias' },
    ],
  },
  {
    title: 'CONTACTO',
    links: [
      { label: <FaInstagram size="1.25rem" />, href: 'https://www.instagram.com/weld/' },
      { label: <FaWhatsapp size="1.25rem" />, href: 'https://wa.me/5493816414960' },
      { label: <FaEnvelope size="1.25rem" />, href: 'mailto:info@weldcompany.com' },
    ],
  },
]
function Footer({ onFranquiciasClick }) {
  const sections = []
  for (const section of footerSections) {
    const links = []
    for (const link of section.links) {
      const href =
        link.href === '#franquicias' && !window.location.search
          ? link.href
          : link.href.startsWith('#')
            ? `?${link.href}`
            : link.href
      links.push(
        <Nav.Link
          key={link.href}
          className="text-white text-decoration-none p-0 weld-footer-link"
          href={href}
          onClick={
            link.href === '#franquicias'
              ? (event) => {
                  event.preventDefault()
                  onFranquiciasClick()
                }
              : undefined
          }
        >
          {link.label}
        </Nav.Link>,
      )
    }
    sections.push(
      <Col key={section.title} xs={6} xl={3}>
        <h2 className="h6 mb-3 weld-footer-heading">{section.title}</h2>
        <Nav className="flex-column gap-2">{links}</Nav>
      </Col>,
    )
  }

  return (
    <footer className="bg-black text-white">
      <Container fluid className="px-3 px-xl-5 py-4">
        <Row className="g-4 align-items-start">
          <Col xs={12} xl={3}>
            <img
              src="/img/weldblanco.png"
              alt="Weld Company"
              className="weld-footer-logo d-block h-auto mx-auto mx-xl-0"
            />
          </Col>

          {sections}
        </Row>

        <Row className="mt-4 pt-3 border-top border-secondary text-secondary small">
          <Col xs={6}>
            © {new Date().getFullYear()} WELD COMPANY - TODOS LOS DERECHOS RESERVADOS
          </Col>

          <Col xs={6} className="text-end">
            TUCUMAN, ARGENTINA
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
