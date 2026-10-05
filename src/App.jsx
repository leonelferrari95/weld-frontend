import { useEffect, useReducer, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carrito from './components/Carrito'
import Rutas from './components/routes/Rutas'
import { actualizarCarrito, calcularTotales } from './utils/carrito'

function App() {
  const [perfil, setPerfil] = useState(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem('weld-perfil'))
      const campos = [
        'nombre',
        'apellido',
        'telefono',
        'email',
        'documento',
        'pais',
        'provincia',
        'localidad',
        'direccion',
      ]
      return guardado &&
        campos.every((campo) => typeof guardado[campo] === 'string' && guardado[campo].trim())
        ? guardado
        : null
    } catch {
      return null
    }
  })
  const [errorPerfil, setErrorPerfil] = useState('')

  const crearPerfil = (datos) => {
    try {
      localStorage.setItem('weld-perfil', JSON.stringify(datos))
      setPerfil(datos)
      setErrorPerfil('')
    } catch {
      return 'No se pudo guardar el perfil. Habilitá el almacenamiento del navegador e intentá nuevamente.'
    }
  }

  const cerrarPerfil = () => {
    try {
      localStorage.removeItem('weld-perfil')
      setPerfil(null)
      setErrorPerfil('')
    } catch {
      setErrorPerfil('No se pudo borrar el perfil guardado. Intentá nuevamente.')
    }
  }
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
      <Navbar
        perfil={perfil}
        onCarritoClick={() => setMostrarCarrito(true)}
        cantidadCarrito={cantidad}
      />
      {errorPerfil && (
        <Alert variant="danger" role="alert">
          {errorPerfil}
        </Alert>
      )}
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
        onHide={() => setMostrarCarrito(false)}
        items={carrito}
        perfil={perfil}
        onCambiarCantidad={(id, cambio) => dispatchCarrito({ tipo: 'cantidad', id, cambio })}
        onQuitar={(id) => dispatchCarrito({ tipo: 'quitar', id })}
        onFinalizarCompra={() => dispatchCarrito({ tipo: 'vaciar' })}
      />
    </div>
  )
}

export default App
