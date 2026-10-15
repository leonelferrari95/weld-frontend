import { useState } from 'react'

export default function usePerfil() {
  const [perfil, setPerfil] = useState(null)

  const crearPerfil = (datos) => {
    setPerfil(datos)
  }

  const cerrarPerfil = () => {
    setPerfil(null)
  }

  return { perfil, crearPerfil, cerrarPerfil }
}
