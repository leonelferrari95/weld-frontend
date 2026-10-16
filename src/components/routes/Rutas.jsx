import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Perfil from '../Perfil'
import Registro from '../Registro'
import Home from '../home'
import Productos from '../Productos'
import PreguntasFrecuentes from '../PreguntasFrecuentes'
import NosotrosPage from '../NosotrosPage'
import FranquiciasPage from '../FranquiciasPage'
import SucursalesPage from '../SucursalesPage'
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
  const navegar = useNavigate()

  return (
    <Routes>
      <Route path="/registro" element={<Registro onCrearPerfil={(datos) => { onCrearPerfil(datos); navegar('/perfil') }} />} />
      <Route path="/perfil" element={<Perfil perfil={perfil} onCerrarPerfil={onCerrarPerfil} />} />
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/preguntas" element={<PreguntasFrecuentes />} />
      <Route path="/nosotros" element={<NosotrosPage onCerrar={() => navegar('/')} />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/franquicias" element={ <FranquiciasPage onCerrar={() => navegar('/')} onVerMas={() => navegar('/franquicias/sucursales')} /> } />
      <Route path="/franquicias/sucursales" element={ <SucursalesPage onCerrar={() => navegar('/')} onVolver={() => navegar('/franquicias')} /> } />
      <Route path="/producto/:id" element={<DetalleProductoRuta onAgregarAlCarrito={onAgregarAlCarrito} />} />
      <Route path="*" element={ <section className="container py-5"> <h1>Página no encontrada</h1> <Link to="/">Volver al inicio</Link> </section> } />
    </Routes>
  )
}

export default Rutas
