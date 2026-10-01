import { Col, Container, Nav, Row } from 'react-bootstrap'
import './Footer.css'
import { FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa';
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
      { label: <FaInstagram size={20} />, href: 'https://www.instagram.com/weld/' },
      { label: <FaWhatsapp size={20} />, href: 'https://wa.me/5493816414960' },
      { label: <FaEnvelope size={20} />, href: 'mailto:info@weldcompany.com' },
    ],
  },
]
function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container fluid className="px-3 px-xl-5 py-4">

        <Row className="g-4 align-items-start">

          <Col xs={12} xl={3}>
            <img
              src="/img/weldblanco.png"
              alt="Weld Company"
              className="weld-footer-logo"
            />
          </Col>

          {footerSections.map((section) => (
            <Col key={section.title} xs={6} xl={3}>
              <h2 className="h6 mb-3 weld-footer-heading">
                {section.title}
              </h2>

              <Nav className="flex-column gap-2">
                {section.links.map((link) => (
                  <Nav.Link
                    key={link.href}
                    className="text-white text-decoration-none p-0 weld-footer-link"
                    href={link.href}
                  >
                    {link.label}
                  </Nav.Link>
                ))}
              </Nav>
            </Col>
          ))}

        </Row>

        <Row className="mt-4 pt-3 border-top border-secondary text-secondary small">
          <Col xs={6}>
            © {new Date().getFullYear()} WELD COMPANY
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
