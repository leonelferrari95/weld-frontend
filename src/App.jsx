import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carrito from './components/Carrito'
import Rutas from './components/routes/Rutas'
import useCarrito from './hooks/useCarrito'
import usePerfil from './hooks/usePerfil'


function App() {
  const { perfil, crearPerfil, cerrarPerfil } = usePerfil()
  const {
    carrito,
    mostrarCarrito,
    cantidad,
    subtotal,
    envio,
    total,
    abrirCarrito,
    cerrarCarrito,
    agregarAlCarrito,
    cambiarCantidad,
    quitarProducto,
    vaciarCarrito,
  } = useCarrito()
  const { pathname, } = useLocation()

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname,])

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar perfil={perfil} onCarritoClick={abrirCarrito} cantidadCarrito={cantidad} />
      <main
        className={`flex-grow-1${pathname.startsWith('/producto/') ? ' producto-detalle-fondo bg-white' : ''}`}
      >
        <Rutas
          onAgregarAlCarrito={agregarAlCarrito}
          perfil={perfil}
          onCrearPerfil={crearPerfil}
          onCerrarPerfil={cerrarPerfil}
        />
      </main>
      <Footer />
      <Carrito
        show={mostrarCarrito}
        onHide={cerrarCarrito}
        items={carrito}
        subtotal={subtotal}
        envio={envio}
        total={total}
        perfil={perfil}
        onCambiarCantidad={cambiarCantidad}
        onQuitar={quitarProducto}
        onFinalizarCompra={vaciarCarrito}
      />
    </div>
  )
}

export default App
