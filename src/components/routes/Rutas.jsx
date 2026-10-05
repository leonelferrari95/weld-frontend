import Perfil from '../../pages/Perfil'
import Registro from '../../pages/Registro'
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Banner from '../Banner'
import Productos from '../Productos'
import PreguntasFrecuentes from '../PreguntasFrecuentes'
import NosotrosPage from '../NosotrosPage'
import FranquiciasPage from '../FranquiciasPage'
import Contacto from '../Contacto'
import ProductoDetalle from '../ProductoDetalle'
import EnvioGratis from '../EnvioGratis'
import { products } from '../../data/products'

function DetalleProductoRuta({ onAgregarAlCarrito }) {
  const { id } = useParams()
  const product = products.find((item) => String(item.id) === id)

  return (
    <>
      <EnvioGratis />
      <ProductoDetalle key={id} product={product} onAgregarAlCarrito={onAgregarAlCarrito} />
    </>
  )
}

const Rutas = ({ onAgregarAlCarrito, perfil, onCrearPerfil, onCerrarPerfil }) => {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path="/login" element={<Navigate to={perfil ? '/perfil' : '/registro'} replace />} />
      <Route
        path="/registro"
        element={
          perfil ? (
            <Navigate to="/perfil" replace />
          ) : (
            <Registro
              onCrearPerfil={(datos) => {
                const error = onCrearPerfil(datos)
                if (error) return error
                navigate('/perfil')
              }}
            />
          )
        }
      />
      <Route path="/perfil" element={<Perfil perfil={perfil} onCerrarPerfil={onCerrarPerfil} />} />
      <Route
        path="/"
        element={
          <>
            <Banner />
            <Productos />
          </>
        }
      />
      <Route path="/productos" element={<Productos />} />
      <Route path="/preguntas" element={<PreguntasFrecuentes />} />
      <Route path="/nosotros" element={<NosotrosPage onClose={() => navigate('/')} />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route
        path="/franquicias"
        element={
          <FranquiciasPage
            onClose={() => navigate('/')}
            onMore={() => navigate('/franquicias/sucursales')}
          />
        }
      />
      <Route
        path="/franquicias/sucursales"
        element={
          <FranquiciasPage
            showBranches
            onClose={() => navigate('/')}
            onBack={() => navigate('/franquicias')}
          />
        }
      />
      <Route
        path="/producto/:id"
        element={<DetalleProductoRuta onAgregarAlCarrito={onAgregarAlCarrito} />}
      />
      <Route
        path="*"
        element={
          <section className="container py-5">
            <h1>Pagina no encontrada</h1>
            <Link to="/">Volver al inicio</Link>
          </section>
        }
      />
    </Routes>
  )
}

export default Rutas
