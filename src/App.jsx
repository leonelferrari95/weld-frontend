import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Productos from './components/Productos'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <Productos />
      </main>
      <Footer />
    </>
  )
}

export default App
