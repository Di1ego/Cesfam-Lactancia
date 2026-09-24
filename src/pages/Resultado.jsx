import { Link } from 'react-router-dom'
import { EnlaceInicio } from '../components/EnlaceInicio'
import { IconoChat } from '../components/Iconos'
import config from '../content/config.json'
import { usePageTitle } from '../lib/usePageTitle'

export function Resultado() {
  usePageTitle('Hora prioritaria')
  const mensaje = encodeURIComponent(
    config.whatsapp.mensajePrellenadoPrioritario,
  )
  const enlaceWhatsapp = `https://wa.me/${config.whatsapp.numero}?text=${mensaje}`

  return (
    <div>
      <EnlaceInicio />
      <div className="aviso-alerta">
        <h1>💛 Te recomendamos pedir hora prioritaria</h1>
        <p>
          Por lo que nos contaste, es mejor que converses pronto con la Clínica
          de Lactancia (CLAC).
        </p>
        <p>
          Los síntomas que marcaste son de prioridad para abordar en una
          clínica de lactancia. En este número puedes agendar una hora
          directamente 🩷
        </p>

        <a className="btn btn-acento btn-bloque" href={enlaceWhatsapp} target="_blank" rel="noreferrer">
          <IconoChat />
          Escribir a CLAC por WhatsApp
        </a>
      </div>

      <p style={{ textAlign: 'center', marginTop: 16 }}>
        <Link to="/camino">Ver igual el contenido de mi etapa</Link>
      </p>
    </div>
  )
}
