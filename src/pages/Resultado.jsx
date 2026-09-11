import { Link } from 'react-router-dom'
import config from '../content/config.json'

export function Resultado() {
  const mensaje = encodeURIComponent(
    config.whatsapp.mensajePrellenadoPrioritario,
  )
  const enlaceWhatsapp = `https://wa.me/${config.whatsapp.numero}?text=${mensaje}`

  return (
    <div>
      <h1>Te recomendamos pedir hora prioritaria</h1>
      <p>
        Por lo que nos contaste, es mejor que converses pronto con la Clínica
        de Lactancia (CLAC).
      </p>
      <p>[CONTENIDO PENDIENTE DE VALIDACIÓN]</p>

      <a href={enlaceWhatsapp} target="_blank" rel="noreferrer">
        Escribir a CLAC por WhatsApp
      </a>

      <p>
        <Link to="/camino">Ver igual el contenido de mi etapa</Link>
      </p>
    </div>
  )
}
