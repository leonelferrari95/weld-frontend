import { useState } from 'react'

import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Productos from './components/Productos'
import Footer from './components/Footer'
import PreguntasFrecuentes from './components/PreguntasFrecuentes'

function App() {
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false)

  return (
    <>
      <Navbar
        mostrarPreguntas={mostrarPreguntas}
        setMostrarPreguntas={setMostrarPreguntas}
      />

      <main>
        {mostrarPreguntas ? (
          <PreguntasFrecuentes />
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