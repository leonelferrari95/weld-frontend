import { Alert, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Perfil({ perfil, onCerrarPerfil }) {
  return (
    <section className="bg-white text-dark py-5">
      <Container>
        <h1 className="mb-4">Mi perfil</h1>
        {perfil ? (
          <>
            <h2 className="h4">
              {perfil.nombre} {perfil.apellido}
            </h2>
            <p>{perfil.email}</p>
            <h2 className="h5">Dirección de entrega</h2>
            <address>
              {perfil.direccion}
              <br />
              {perfil.localidad}, {perfil.provincia}
              <br />
              {perfil.pais}
            </address>
            <p className="small text-secondary">
              Tus datos quedan guardados en este navegador hasta que cierres sesión.
            </p>
            <Button as={Link} to="/productos" variant="dark" className="rounded-0 me-3">
              Ver productos
            </Button>
            <Button variant="outline-dark" className="rounded-0" onClick={onCerrarPerfil}>
              Cerrar sesión
            </Button>
          </>
        ) : (
          <Alert variant="light" className="border">
            Todavía no creaste un perfil. <Link to="/registro">Crear perfil</Link>
          </Alert>
        )}
      </Container>
    </section>
  )
}
export default Perfil
