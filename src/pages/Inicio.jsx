import { Link } from 'react-router-dom'
import config from '../content/config.json'
import { usePageTitle } from '../lib/usePageTitle'

export function Inicio() {
  usePageTitle('Inicio')

  return (
    <div>
      <div className="encabezado">
        <h1 className="encabezado__titulo">🤱 Clínica de Lactancia Materna (CLAC)</h1>
        <p className="encabezado__subtitulo">{config.avisoInicio}</p>
      </div>

      <div className="pila">
        <Link className="btn btn-primario btn-bloque" to="/agendar">
          Cómo agendar hora en CLAC
        </Link>
        <Link className="btn btn-secundario btn-bloque" to="/registro">
          Comenzar mi registro
        </Link>
      </div>
    </div>
  )
}
