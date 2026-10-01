import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Productos from './components/Productos'
import Footer from './components/Footer'
import PreguntasFrecuentes from './components/PreguntasFrecuentes'

function Inicio() {
  return (
    <>
      <Banner />
      <Productos />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
