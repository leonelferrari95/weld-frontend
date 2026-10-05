import { useEffect, useReducer, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carrito from './components/Carrito'
import Rutas from './components/routes/Rutas'
import { actualizarCarrito, calcularTotales } from './utils/carrito'

function App() {
  const [carrito, dispatchCarrito] = useReducer(actualizarCarrito, [])
  const [mostrarCarrito, setMostrarCarrito] = useState(false)
  const { pathname, hash } = useLocation()
  const { cantidad } = calcularTotales(carrito)

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  const agregarAlCarrito = (product, cantidad) => {
    dispatchCarrito({ tipo: 'agregar', product, cantidad })
    setMostrarCarrito(true)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onCarritoClick={() => setMostrarCarrito(true)} cantidadCarrito={cantidad} />
      <main
        className={`flex-grow-1${pathname.startsWith('/producto/') ? ' producto-detalle-fondo bg-white' : ''}`}
      >
        <Rutas onAgregarAlCarrito={agregarAlCarrito} />
      </main>
      <Footer />
      <Carrito
        show={mostrarCarrito}
        onHide={() => setMostrarCarrito(false)}
        items={carrito}
        onCambiarCantidad={(id, cambio) => dispatchCarrito({ tipo: 'cantidad', id, cambio })}
        onQuitar={(id) => dispatchCarrito({ tipo: 'quitar', id })}
        onFinalizarCompra={() => dispatchCarrito({ tipo: 'vaciar' })}
      />
    </div>
  )
}

export default App
