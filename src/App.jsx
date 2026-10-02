import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Productos from './components/Productos'
import Footer from './components/Footer'
import ProductoDetalle from './components/ProductoDetalle'
import EnvioGratis from './components/EnvioGratis'
import FranquiciasPage from './components/FranquiciasPage'
import NosotrosPage from './components/NosotrosPage'
import PreguntasFrecuentes from './components/PreguntasFrecuentes'
import { products } from './data/products'

function App() {
  const [seccionAbierta, setSeccionAbierta] = useState(() => {
    const section = window.location.hash.slice(1)
    return section === 'franquicias' || section === 'nosotros' ? section : null
  })
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false)

  useEffect(() => {
    const sectionId = window.location.hash.slice(1)
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView()
    }
  }, [])

  useEffect(() => {
    if (seccionAbierta) {
      document.getElementById(seccionAbierta)?.scrollIntoView()
    }
  }, [seccionAbierta])

  const abrirSeccion = (section) => {
    setMostrarPreguntas(false)
    setSeccionAbierta(section)

    if (seccionAbierta === section) {
      document.getElementById(section)?.scrollIntoView()
    }
  }

  const cerrarSeccion = () => {
    setSeccionAbierta(null)
    window.scrollTo({ top: 0 })
  }

  const cambiarPreguntas = (mostrar) => {
    setMostrarPreguntas(mostrar)
    setSeccionAbierta(null)
  }

  const productId = new URLSearchParams(window.location.search).get('producto')
  const product = products.find((item) => String(item.id) === productId)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        onFranquiciasClick={() => abrirSeccion('franquicias')}
        onNosotrosClick={() => abrirSeccion('nosotros')}
        seccionAbierta={seccionAbierta}
        mostrarPreguntas={mostrarPreguntas}
        setMostrarPreguntas={cambiarPreguntas}
      />

      <main className={`flex-grow-1${productId !== null ? ' producto-detalle-fondo' : ''}`}>
        {seccionAbierta === 'franquicias' && <FranquiciasPage onClose={cerrarSeccion} />}
        {seccionAbierta === 'nosotros' && <NosotrosPage onClose={cerrarSeccion} />}

        {mostrarPreguntas ? (
          <PreguntasFrecuentes />
        ) : productId !== null ? (
          <>
            <EnvioGratis />
            <ProductoDetalle product={product} />
          </>
        ) : (
          <>
            <Banner />
            <Productos />
          </>
        )}
      </main>

      <Footer
        onFranquiciasClick={() => abrirSeccion('franquicias')}
        onNosotrosClick={() => abrirSeccion('nosotros')}
      />
    </div>
  )
}

export default App
