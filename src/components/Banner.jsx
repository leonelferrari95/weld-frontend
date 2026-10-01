function Banner() {
  return (
    <section id="inicio" aria-label="Presentación de Weld">
      <picture className="d-block w-100">
        <source
          media="(max-width: 767px)"
          srcSet="/img/weldbannercelu.png"
          width={1024}
          height={1536}
        />
        <source
          media="(min-width: 768px)"
          srcSet="/img/weldbannercompu.png"
          width={1672}
          height={941}
        />
        <img
          src="/img/weldbannercelu.png"
          width={1024}
          height={1536}
          alt="Weld: ropa urbana. No rules, just style."
          className="d-block w-100 h-auto"
        />
      </picture>
    </section>
  )
}

export default Banner
