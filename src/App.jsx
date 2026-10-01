import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Productos from './components/Productos'
import Footer from './components/Footer'
import ProductoDetalle from './components/ProductoDetalle'
import EnvioGratis from './components/EnvioGratis'
import FranquiciasPage from './components/FranquiciasPage'
import { products } from './data/products'

function App() {
  const [showFranquicias, setShowFranquicias] = useState(false)

  useEffect(() => {
    const sectionId = window.location.hash.slice(1)
    if (sectionId) document.getElementById(sectionId)?.scrollIntoView()
  }, [])

  useEffect(() => {
    if (showFranquicias) document.getElementById('franquicias')?.scrollIntoView()
  }, [showFranquicias])

  const openFranquicias = () => {
    if (showFranquicias) {
      document.getElementById('franquicias')?.scrollIntoView()
    } else {
      setShowFranquicias(true)
    }
  }

  const closeFranquicias = () => {
    setShowFranquicias(false)
    window.scrollTo({ top: 0 })
  }

  const productId = new URLSearchParams(window.location.search).get('producto')
  const product = products.find((item) => String(item.id) === productId)

  return (
    <>
      <Navbar onFranquiciasClick={openFranquicias} />
      <main className={productId !== null ? 'producto-detalle-fondo' : undefined}>
        {showFranquicias && <FranquiciasPage onClose={closeFranquicias} />}
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
      <Footer onFranquiciasClick={openFranquicias} />
    </>
  )
}

export default App
