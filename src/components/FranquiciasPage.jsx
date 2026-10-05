import { useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import { FiArrowLeft, FiArrowRight, FiClock, FiMapPin } from 'react-icons/fi'
import SeccionImagen from './SeccionImagen'
import './FranquiciasPage.css'

const branches = [
  {
    id: 'Centro',
    name: 'Weld Tucumán Centro',
    address: '25 de Mayo 398, San Miguel de Tucumán, Tucumán, Argentina',
    photos: [
      { src: '/img/sucursal1weld1.png', alt: 'Exterior de la sucursal Centro' },
      { src: '/img/sucursal1weld2.png', alt: 'Interior de la sucursal Centro' },
      { src: '/img/sucursal1weld3.png', alt: 'Interior de la sucursal Centro' },
    ],
  },
  {
    id: 'Solar',
    name: 'Weld Solar',
    address: 'Avenida Aconquija 1300, Yerba Buena, Tucumán, Argentina',
    photos: [
      { src: '/img/sucursal2weld1.png', alt: 'Exterior de la sucursal Solar' },
      { src: '/img/sucursal2weld2.png', alt: 'Interior de la sucursal Solar' },
      { src: '/img/sucursal2weld3.png', alt: 'Interior de la sucursal Solar' },
    ],
  },
]

function FranquiciasPage({ onClose, onMore, onBack, showBranches = false }) {
  const [photoIndexes, setPhotoIndexes] = useState({})

  const changePhoto = (branchId, direction) => {
    const branch = branches.find((item) => item.id === branchId)
    if (!branch) return

    setPhotoIndexes((currentIndexes) => {
      const photoCount = branch.photos.length
      const nextIndex = ((currentIndexes[branchId] || 0) + direction + photoCount) % photoCount
      return { ...currentIndexes, [branchId]: nextIndex }
    })
  }

  const branchCards = branches.map((branch) => {
    const photoIndex = photoIndexes[branch.id] || 0
    const photo = branch.photos[photoIndex]
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(branch.address)}&output=embed`

    return (
      <article className="sucursal-fila d-grid align-items-stretch" key={branch.id}>
        <section className="sucursal-panel sucursal-info bg-white">
          <span className="sucursal-etiqueta fw-bold text-uppercase">Sucursal</span>
          <h2>{branch.name}</h2>
          <p className="sucursal-dato d-flex align-items-start mb-3">
            <FiMapPin aria-hidden="true" className="flex-shrink-0" />
            <span>{branch.address}</span>
          </p>
          <p className="sucursal-dato d-flex align-items-start mb-0">
            <FiClock aria-hidden="true" />
            <span>
              Lunes a sábado
              <br />
              09:00 a 21:00
            </span>
          </p>
        </section>
        <section className="sucursal-panel sucursal-mapa d-flex flex-column p-0 overflow-hidden border-0">
          <iframe
            title={`Mapa de ${branch.name}`}
            src={mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-100 border-0 flex-grow-1"
          />
        </section>
        <section className="sucursal-panel sucursal-galeria d-flex flex-column p-0 overflow-hidden border-0">
          <div className="sucursal-foto position-relative flex-grow-1 overflow-hidden">
            <Image
              src={photo.src}
              alt={`${branch.name}: ${photo.alt}`}
              className="d-block w-100 h-100 object-fit-cover"
            />
            <button
              type="button"
              className="sucursal-flecha position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center border-0 rounded-circle text-white sucursal-anterior"
              onClick={() => changePhoto(branch.id, -1)}
              aria-label={`Foto anterior de ${branch.name}`}
            >
              <FiArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="sucursal-flecha position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center border-0 rounded-circle text-white sucursal-siguiente"
              onClick={() => changePhoto(branch.id, 1)}
              aria-label={`Foto siguiente de ${branch.name}`}
            >
              <FiArrowRight aria-hidden="true" />
            </button>
            <span className="sucursal-contador position-absolute py-1 px-2 text-white">
              {photoIndex + 1} / {branch.photos.length}
            </span>
          </div>
        </section>
      </article>
    )
  })

  return (
    <section
      id={showBranches ? 'franquicias' : undefined}
      className="franquicias-page text-white position-relative overflow-hidden"
    >
      {showBranches ? (
        <Container fluid className="sucursales text-start">
          <div className="sucursales-barra d-flex align-items-center justify-content-between">
            <button
              type="button"
              className="franquicias-inicio position-static d-inline-flex align-items-center py-1 px-0 border-0 bg-transparent text-decoration-none"
              onClick={onClose}
            >
              Volver al inicio
            </button>
            <button
              type="button"
              className="sucursales-volver d-inline-flex align-items-center gap-2 py-1 px-0 border-0 bg-transparent"
              onClick={onBack}
            >
              <FiArrowLeft aria-hidden="true" /> Volver a Franquicias
            </button>
          </div>
          <header className="sucursales-cabecera">
            <p className="sucursal-etiqueta fw-bold text-uppercase">Weld · Tucumán</p>
            <h1 className="sucursales-titulo m-0">Nuestras sucursales</h1>
          </header>
          <div className="sucursales-lista d-grid gap-3">{branchCards}</div>
        </Container>
      ) : (
        <SeccionImagen
          id="franquicias"
          title="Conoce nuestras sucursales"
          onClose={onClose}
          onMore={onMore}
          mobileImage={{ src: '/img/sucursalweldcel.png', width: 950, height: 1656 }}
          desktopImage={{ src: '/img/sucursalweldpc.png', width: 1672, height: 941 }}
        />
      )}
    </section>
  )
}

export default FranquiciasPage
