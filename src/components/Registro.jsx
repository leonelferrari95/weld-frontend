import FormularioCuenta from './FormularioCuenta'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
const API_URL = import.meta.env.VITE_API_URL

const campos = [
  {
    name: 'nombre',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Tu nombre',
    autoComplete: 'given-name',
  },
  {
    name: 'apellido',
    label: 'Apellido',
    type: 'text',
    placeholder: 'Tu apellido',
    autoComplete: 'family-name',
  },
  {
    name: 'telefono',
    label: 'Número de teléfono',
    type: 'tel',
    placeholder: '381 1234567',
    autoComplete: 'tel',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'tuemail@ejemplo.com',
    autoComplete: 'email',
  },
  {
    name: 'documento',
    label: 'Documento',
    type: 'text',
    placeholder: 'DNI / Documento',
  },
  {
    name: 'pais',
    label: 'País',
    type: 'text',
    value: 'Argentina',
    readOnly: true,
    autoComplete: 'country-name',
  },
  {
    name: 'provincia',
    label: 'Provincia',
    type: 'select',
    options: [],
    autoComplete: 'address-level1',
  },
  {
    name: 'localidad',
    label: 'Localidad',
    type: 'text',
    placeholder: 'Ej.: San Miguel de Tucumán',
    autoComplete: 'address-level2',
  },
  {
    name: 'direccion',
    label: 'Dirección',
    type: 'text',
    placeholder: 'Calle y número',
    autoComplete: 'street-address',
  },
]

function Registro({ onCrearPerfil }) {
  const [provincias, setProvincias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const cargarProvincias = async () => {
      setCargando(true)
      setError('')
      try {
        if (!API_URL) throw new Error('Falta configurar VITE_API_URL')

        const response = await axios.get(`${API_URL.replace(/\/$/, '')}/provincias`, {
          params: {
            orden: 'nombre',
            max: 24,
          },
          timeout: 15000,
        })

        if (
          !Array.isArray(response.data?.provincias) ||
          !response.data.provincias.length ||
          !response.data.provincias.every((provincia) => typeof provincia?.nombre === 'string')
        ) {
          throw new Error('La API no devolvió una lista válida de provincias')
        }

        setProvincias(response.data.provincias)
      } catch (errorPeticion) {
        const mensaje = !API_URL
          ? 'Falta configurar VITE_API_URL. Reiniciá el servidor de Vite después de agregarla.'
          : errorPeticion.code === 'ECONNABORTED'
            ? 'La API tardó demasiado en responder. Volvé a intentar.'
            : errorPeticion.response
              ? `La API devolvió un error (${errorPeticion.response.status}). Volvé a intentar.`
              : errorPeticion.code === 'ERR_NETWORK'
                ? 'No se pudo conectar con la API de provincias. Revisá tu conexión y volvé a intentar.'
                : 'La API no devolvió una lista válida de provincias. Revisá la URL configurada.'
        setError(mensaje)

        Swal.fire({
          icon: 'error',
          title: 'Error al cargar provincias',
          text: mensaje,
        })
      } finally {
        setCargando(false)
      }
    }

    cargarProvincias()
  }, [intento])

  const camposConProvincias = campos.map((campo) =>
    campo.name === 'provincia'
      ? {
          ...campo,
          options: provincias.map((provincia) => provincia.nombre),
          disabled: cargando || Boolean(error),
        }
      : campo,
  )

  return (
    <>
      {cargando && (
        <p className="container mt-3" role="status">
          Cargando provincias...
        </p>
      )}
      {error && (
        <div className="container mt-3">
          <p className="text-danger" role="alert">
            {error}
          </p>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => setIntento((actual) => actual + 1)}
          >
            Reintentar cargar provincias
          </button>
        </div>
      )}
      <FormularioCuenta
        titulo="Crear perfil"
        descripcion="Completá tus datos y dirección de entrega en Weld Company."
        campos={camposConProvincias}
        onEnviar={onCrearPerfil}
      />
    </>
  )
}
export default Registro
