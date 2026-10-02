import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Productos from './components/Productos'
import Footer from './components/Footer'
import ProductoDetalle from './components/ProductoDetalle'
import EnvioGratis from './components/EnvioGratis'
import PreguntasFrecuentes from './components/PreguntasFrecuentes'
import { products } from './data/products'

function App() {
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false)

  useEffect(() => {
    if (window.location.hash === '#productos') {
      document.getElementById('productos')?.scrollIntoView()
    }
  }, [])

  const productId = new URLSearchParams(window.location.search).get('producto')
  const product = products.find((item) => String(item.id) === productId)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar mostrarPreguntas={mostrarPreguntas} setMostrarPreguntas={setMostrarPreguntas} />

      <main className={`flex-grow-1${productId !== null ? ' producto-detalle-fondo' : ''}`}>
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

      <Footer />
    </div>
  )
}

export default App
