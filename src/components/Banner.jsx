import './Banner.css'

function Banner() {
  return (
    <section id="inicio" className="weld-banner" aria-label="Presentación de Weld">
      <picture>
        <source
          media="(max-width: 425px)"
          srcSet="/img/weldbannercelu.png"
        />
        <source
          media="(min-width: 426px)"
          srcSet="/img/weldbannercompu.png"
        />
        <img
          src="/img/weldbannercelu.png"
          alt="Weld: ropa urbana. No rules, just style."
          className="weld-banner-image"
        />
      </picture>
    </section>
  )
}

export default Banner
