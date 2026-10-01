import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Productos from './components/Productos'
import Footer from './components/Footer'
import ProductoDetalle from './components/ProductoDetalle'
import EnvioGratis from './components/EnvioGratis'
import { products } from './data/products'

function App() {
  useEffect(() => {
    if (window.location.hash === '#productos') {
      document.getElementById('productos')?.scrollIntoView()
    }
  }, [])

  const productId = new URLSearchParams(window.location.search).get('producto')
  const product = products.find((item) => String(item.id) === productId)

  return (
    <>
      <Navbar />
      <main className={productId !== null ? 'producto-detalle-fondo' : undefined}>
        {productId !== null ? (
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
    </>
  )
}

export default App
