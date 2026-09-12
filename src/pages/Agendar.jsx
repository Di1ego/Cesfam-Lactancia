import config from '../content/config.json'

export function Agendar() {
  const mensaje = encodeURIComponent(config.whatsapp.mensajePrellenado)
  const enlaceWhatsapp = `https://wa.me/${config.whatsapp.numero}?text=${mensaje}`

  return (
    <div>
      <div className="encabezado">
        <h1 className="encabezado__titulo">Cómo agendar hora en CLAC</h1>
      </div>

      <div className="tarjeta">
        <h2>Horarios de atención</h2>
        <p>{config.horariosAtencion}</p>
      </div>

      <div className="tarjeta">
        <h2>Requisitos</h2>
        <p>{config.requisitosAgendar}</p>
      </div>

      <a className="btn btn-primario btn-bloque" href={enlaceWhatsapp} target="_blank" rel="noreferrer">
        Agendar por WhatsApp
      </a>
    </div>
  )
}
