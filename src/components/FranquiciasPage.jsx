import SeccionImagen from './SeccionImagen'

function FranquiciasPage({ onClose }) {
  return (
    <SeccionImagen
      id="franquicias"
      title="Conoce nuestras sucursales"
      onClose={onClose}
      mobileImage={{ src: '/img/sucursalweldcel.png', width: 950, height: 1656 }}
      desktopImage={{ src: '/img/sucursalweldpc.png', width: 1672, height: 941 }}
    />
  )
}

export default FranquiciasPage
