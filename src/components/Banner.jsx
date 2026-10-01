function Banner() {
  return (
    <section id="inicio" aria-label="Presentación de Weld">
      <picture className="d-block w-100">
        <source
          media="(max-width: 767px)"
          srcSet="/img/weldbannercelu.png"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/img/weldbannercompu.png"
        />
        <img
          src="/img/weldbannercelu.png"
          alt="Weld: ropa urbana. No rules, just style."
          className="d-block w-100 h-auto"
        />
      </picture>
    </section>
  )
}

export default Banner
