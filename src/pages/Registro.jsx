import FormularioCuenta from '../components/FormularioCuenta'

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
    options: [
      'Buenos Aires',
      'Ciudad Autónoma de Buenos Aires',
      'Catamarca',
      'Chaco',
      'Chubut',
      'Córdoba',
      'Corrientes',
      'Entre Ríos',
      'Formosa',
      'Jujuy',
      'La Pampa',
      'La Rioja',
      'Mendoza',
      'Misiones',
      'Neuquén',
      'Río Negro',
      'Salta',
      'San Juan',
      'San Luis',
      'Santa Cruz',
      'Santa Fe',
      'Santiago del Estero',
      'Tierra del Fuego',
      'Tucumán',
    ],
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
  return (
    <FormularioCuenta
      titulo="Crear perfil"
      descripcion="Completá tus datos y dirección de entrega en Weld Company."
      campos={campos}
      onEnviar={onCrearPerfil}
    />
  )
}
export default Registro
