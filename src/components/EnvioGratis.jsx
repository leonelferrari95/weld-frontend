import './EnvioGratis.css'

function EnvioGratis() {
  const items = [0, 1, 2, 3].map((item) => (
    <div className="d-flex align-items-center flex-shrink-0 envio-item" key={item}>
      <span>ENVÍO GRATIS: A PARTIR DE $120.000</span>
      <span className="envio-marca">® WELD COMPANY</span>
    </div>
  ))
  const groups = [0, 1].map((copy) => (
    <div className="d-flex align-items-center flex-shrink-0 envio-grupo" key={copy}>
      {items}
    </div>
  ))

  return (
    <div
      className="envio-gratis position-relative start-50 vw-100 overflow-hidden text-nowrap fw-medium"
      aria-label="Envío gratis a partir de $120.000. Weld Company."
    >
      <div className="d-flex align-items-center envio-track" aria-hidden="true">
        {groups}
      </div>
    </div>
  )
}

export default EnvioGratis
