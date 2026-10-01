import './EnvioGratis.css'

function EnvioGratis() {
  const items = []
  for (let item = 0; item < 4; item++) {
    items.push(
      <div className="d-flex align-items-center flex-shrink-0 productos-marquee-item" key={item}>
        <span>ENVÍO GRATIS: A PARTIR DE $120.000</span>
        <span className="productos-marquee-brand">® WELD COMPANY</span>
      </div>,
    )
  }
  const groups = []
  for (let copy = 0; copy < 2; copy++) {
    groups.push(
      <div className="d-flex align-items-center flex-shrink-0 productos-marquee-group" key={copy}>
        {items}
      </div>,
    )
  }

  return (
    <div
      className="productos-marquee position-relative start-50 vw-100 overflow-hidden text-nowrap fw-medium"
      aria-label="Envío gratis a partir de $120.000. Weld Company."
    >
      <div className="d-flex align-items-center productos-marquee-track" aria-hidden="true">
        {groups}
      </div>
    </div>
  )
}

export default EnvioGratis
