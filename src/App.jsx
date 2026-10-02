import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Productos from './components/Productos'
import Footer from './components/Footer'
import ProductoDetalle from './components/ProductoDetalle'
import EnvioGratis from './components/EnvioGratis'
import FranquiciasPage from './components/FranquiciasPage'
import PreguntasFrecuentes from './components/PreguntasFrecuentes'
import { products } from './data/products'

function App() {
  const [showFranquicias, setShowFranquicias] = useState(false)
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false)

  useEffect(() => {
    const sectionId = window.location.hash.slice(1)
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView()
    }
  }, [])

  useEffect(() => {
    if (showFranquicias) {
      document.getElementById('franquicias')?.scrollIntoView()
    }
  }, [showFranquicias])

  const openFranquicias = () => {
    setMostrarPreguntas(false)
    setShowFranquicias(true)

    if (showFranquicias) {
      document.getElementById('franquicias')?.scrollIntoView()
    }
  }

  const closeFranquicias = () => {
    setShowFranquicias(false)
    window.scrollTo({ top: 0 })
  }

  const cambiarPreguntas = (mostrar) => {
    setMostrarPreguntas(mostrar)
    setShowFranquicias(false)
  }

  const productId = new URLSearchParams(window.location.search).get('producto')
  const product = products.find((item) => String(item.id) === productId)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        onFranquiciasClick={openFranquicias}
        mostrarPreguntas={mostrarPreguntas}
        setMostrarPreguntas={cambiarPreguntas}
      />

      <main
        className={`flex-grow-1${productId !== null ? ' producto-detalle-fondo' : ''}`}
      >
        {showFranquicias && (
          <FranquiciasPage onClose={closeFranquicias} />
        )}

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

      <Footer onFranquiciasClick={openFranquicias} />
    </div>
  )
}

export default App