import config from '../content/config.json'

export function Agendar() {
  const mensaje = encodeURIComponent(config.whatsapp.mensajePrellenado)
  const enlaceWhatsapp = `https://wa.me/${config.whatsapp.numero}?text=${mensaje}`

  return (
    <div>
      <h1>Cómo agendar hora en CLAC</h1>

      <h2>Horarios de atención</h2>
      <p>{config.horariosAtencion}</p>

      <h2>Requisitos</h2>
      <p>{config.requisitosAgendar}</p>

      <a href={enlaceWhatsapp} target="_blank" rel="noreferrer">
        Agendar por WhatsApp
      </a>
    </div>
  )
}
