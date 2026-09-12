import { Link } from 'react-router-dom'
import './Camino.css'
import etapas from '../content/etapas.json'
import { IconoActual, IconoCheck, IconoChevron } from '../components/Iconos'
import { leerRegistro } from '../lib/almacenamiento'
import { calcularEtapaActualId } from '../lib/etapa'

export function Camino() {
  const registro = leerRegistro()

  if (!registro) {
    return (
      <div>
        <h1>Camino por etapas</h1>
        <div className="tarjeta" style={{ textAlign: 'center' }}>
          <p>Primero cuéntanos tu situación para mostrarte tu etapa.</p>
          <Link className="btn btn-primario btn-bloque" to="/registro">
            Ir a Registro
          </Link>
        </div>
      </div>
    )
  }

  const etapasDelCamino = etapas.filter((e) => e.tipo === registro.tipo)
  const etapaActualId = calcularEtapaActualId(registro, etapas)
  const indiceActual = etapasDelCamino.findIndex((e) => e.id === etapaActualId)

  return (
    <div>
      <div className="encabezado">
        <h1 className="encabezado__titulo">Tu camino</h1>
        <p className="encabezado__subtitulo">
          {registro.tipo === 'embarazo'
            ? 'Etapa a etapa, según tu semana de embarazo.'
            : 'Etapa a etapa, según la edad de tu bebé.'}
        </p>
      </div>

      <ol className="camino-lista">
        {etapasDelCamino.map((etapa, indice) => {
          const esActual = indice === indiceActual
          const esPasada = indiceActual >= 0 && indice < indiceActual
          const alLado = indice % 2 === 0 ? 'izquierda' : 'derecha'

          return (
            <li key={etapa.id} className={'camino-fila camino-fila--' + alLado}>
              <details
                className={
                  'camino-burbuja ' + (esActual ? 'camino-burbuja--actual' : '')
                }
                open={esActual}
              >
                <summary className="camino-tarjeta__resumen">
                  <div
                    className={
                      'camino-tarjeta__icono ' +
                      (esActual
                        ? 'camino-tarjeta__icono--actual'
                        : esPasada
                          ? 'camino-tarjeta__icono--pasada'
                          : 'camino-tarjeta__icono--futura')
                    }
                  >
                    {esActual ? <IconoActual /> : esPasada ? <IconoCheck /> : indice + 1}
                  </div>
                  <div className="camino-tarjeta__texto">
                    {esActual && <span className="camino-tarjeta__badge">Estás aquí</span>}
                    <p className="camino-tarjeta__titulo">{etapa.titulo}</p>
                    {!esActual && <p className="camino-tarjeta__ayuda">Toca para ver el contenido</p>}
                  </div>
                  <IconoChevron className="camino-tarjeta__chevron" />
                </summary>
                <p className="camino-tarjeta__contenido">{etapa.contenido}</p>
              </details>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
