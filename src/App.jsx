import { useEffect, useReducer, useState } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Productos from './components/Productos'
import Footer from './components/Footer'
import ProductoDetalle from './components/ProductoDetalle'
import EnvioGratis from './components/EnvioGratis'
import FranquiciasPage from './components/FranquiciasPage'
import NosotrosPage from './components/NosotrosPage'
import PreguntasFrecuentes from './components/PreguntasFrecuentes'
import Carrito from './components/Carrito'
import Contacto from './components/Contacto'
import { products } from './data/products'
import { actualizarCarrito, calcularTotales } from './utils/carrito'

function App() {
  const [ubicacion, setUbicacion] = useState(() => new URL(window.location.href))
  const [carrito, dispatchCarrito] = useReducer(actualizarCarrito, [])
  const [mostrarCarrito, setMostrarCarrito] = useState(false)
  const [mostrarSucursales, setMostrarSucursales] = useState(
    () => ubicacion.searchParams.get('sucursales') === '1',
  )
  const [seccionAbierta, setSeccionAbierta] = useState(() => {
    const section = window.location.hash.slice(1)
    return section === 'franquicias' || section === 'nosotros' ? section : null
  })
  const [mostrarPreguntas, setMostrarPreguntas] = useState(() => ubicacion.hash === '#preguntas')

  useEffect(() => {
    const volver = () => {
      const url = new URL(window.location.href)
      const section = url.hash.slice(1)
      setSeccionAbierta(section === 'franquicias' || section === 'nosotros' ? section : null)
      setMostrarPreguntas(section === 'preguntas')
      setMostrarSucursales(url.searchParams.get('sucursales') === '1')
      setMostrarCarrito(false)
      setUbicacion(url)
    }

    window.addEventListener('popstate', volver)
    return () => window.removeEventListener('popstate', volver)
  }, [])

  useEffect(() => {
    const sectionId = ubicacion.hash.slice(1)
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [ubicacion])

  useEffect(() => {
    if (seccionAbierta) {
      document.getElementById(seccionAbierta)?.scrollIntoView()
    }
  }, [seccionAbierta])

  const abrirSeccion = (section) => {
    if (mostrarSucursales) {
      const url = new URL(window.location.href)
      url.searchParams.delete('sucursales')
      url.hash = `#${section}`
      window.history.pushState(null, '', url)
      setUbicacion(url)
    }
    setMostrarSucursales(false)
    setMostrarPreguntas(false)
    setSeccionAbierta(section)

    if (seccionAbierta === section) {
      document.getElementById(section)?.scrollIntoView()
    }
  }

  const cerrarSeccion = () => {
    const url = new URL(window.location.href)
    if (url.searchParams.has('sucursales')) {
      url.searchParams.delete('sucursales')
      url.hash = ''
      window.history.pushState(null, '', url)
      setUbicacion(url)
    }
    setMostrarSucursales(false)
    setSeccionAbierta(null)
    window.scrollTo({ top: 0 })
  }

  const cambiarPreguntas = (mostrar) => {
    if (mostrarSucursales) {
      const url = new URL(window.location.href)
      url.searchParams.delete('sucursales')
      url.hash = mostrar ? '#preguntas' : ''
      window.history.pushState(null, '', url)
      setUbicacion(url)
    }
    setMostrarSucursales(false)
    setMostrarPreguntas(mostrar)
    setSeccionAbierta(null)
  }

  const volverAFranquicias = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('sucursales')
    url.hash = '#franquicias'
    window.history.pushState(null, '', url)
    setUbicacion(url)
    setMostrarSucursales(false)
    setSeccionAbierta('franquicias')
    window.scrollTo({ top: 0 })
  }

  // Los enlaces internos cambian la vista sin recargar ni perder el carrito en memoria.
  const navegar = (event) => {
    const enlace = event.target.closest('a[href]')
    if (
      !enlace ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      enlace.hasAttribute('download') ||
      (enlace.target && enlace.target !== '_self')
    ) {
      return
    }

    const url = new URL(enlace.href)
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return

    event.preventDefault()
    if (url.href !== window.location.href) window.history.pushState(null, '', url)
    setMostrarSucursales(false)
    setSeccionAbierta(null)
    setMostrarPreguntas(false)
    setUbicacion(url)
  }

  const agregarAlCarrito = (product, cantidad) => {
    dispatchCarrito({ tipo: 'agregar', product, cantidad })
    setMostrarCarrito(true)
  }

  const productId = ubicacion.searchParams.get('producto')
  const product = products.find((item) => String(item.id) === productId)
  const { cantidad } = calcularTotales(carrito)

  return (
    <div className="d-flex flex-column min-vh-100" onClick={navegar}>
      <Navbar
        onFranquiciasClick={() => abrirSeccion('franquicias')}
        onNosotrosClick={() => abrirSeccion('nosotros')}
        seccionAbierta={seccionAbierta}
        mostrarPreguntas={mostrarPreguntas}
        setMostrarPreguntas={cambiarPreguntas}
        onCarritoClick={() => setMostrarCarrito(true)}
        cantidadCarrito={cantidad}
        activeSection={ubicacion.hash}
      />

      <main
        className={`flex-grow-1${productId !== null ? ' producto-detalle-fondo bg-white' : ''}`}
      >
        {mostrarSucursales ? (
          <FranquiciasPage showBranches onClose={cerrarSeccion} onBack={volverAFranquicias} />
        ) : (
          <>
            {seccionAbierta === 'franquicias' && (
              <FranquiciasPage
                onClose={cerrarSeccion}
                onMore={() => {
                  const url = new URL(window.location.href)
                  url.searchParams.set('sucursales', '1')
                  url.hash = '#franquicias'
                  window.history.pushState(null, '', url)
                  setUbicacion(url)
                  setMostrarSucursales(true)
                  setSeccionAbierta(null)
                  setMostrarPreguntas(false)
                  setMostrarCarrito(false)
                  window.scrollTo({ top: 0 })
                }}
              />
            )}
            {seccionAbierta === 'nosotros' && <NosotrosPage onClose={cerrarSeccion} />}

            {mostrarPreguntas ? (
              <PreguntasFrecuentes />
            ) : ubicacion.hash === '#contacto' ? (
              <Contacto />
            ) : productId !== null ? (
              <>
                <EnvioGratis />
                <ProductoDetalle
                  key={productId}
                  product={product}
                  onAgregarAlCarrito={agregarAlCarrito}
                />
              </>
            ) : (
              <>
                <Banner />
                <Productos />
              </>
            )}
          </>
        )}
      </main>

      <Footer
        onFranquiciasClick={() => abrirSeccion('franquicias')}
        onNosotrosClick={() => abrirSeccion('nosotros')}
      />
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