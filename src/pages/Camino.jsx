import { Link } from 'react-router-dom'
import etapas from '../content/etapas.json'
import { leerRegistro } from '../lib/almacenamiento'
import { calcularEtapaActualId } from '../lib/etapa'

export function Camino() {
  const registro = leerRegistro()

  if (!registro) {
    return (
      <div>
        <h1>Camino por etapas</h1>
        <p>Primero cuéntanos tu situación para mostrarte tu etapa.</p>
        <Link to="/registro">Ir a Registro</Link>
      </div>
    )
  }

  const etapasDelCamino = etapas.filter((e) => e.tipo === registro.tipo)
  const etapaActualId = calcularEtapaActualId(registro, etapas)

  return (
    <div>
      <h1>Camino por etapas</h1>
      <ol>
        {etapasDelCamino.map((etapa) => {
          const esActual = etapa.id === etapaActualId
          return (
            <li key={etapa.id}>
              <details open={esActual}>
                <summary>
                  {esActual ? '📍 Estás aquí — ' : ''}
                  {etapa.titulo}
                </summary>
                <p>{etapa.contenido}</p>
              </details>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
