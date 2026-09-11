import { Link } from 'react-router-dom'
import config from '../content/config.json'

export function Inicio() {
  return (
    <div>
      <h1>Clínica de Lactancia Materna (CLAC)</h1>
      <p>{config.avisoInicio}</p>
      <nav>
        <ul>
          <li>
            <Link to="/agendar">Cómo agendar hora en CLAC</Link>
          </li>
          <li>
            <Link to="/registro">Registro</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
