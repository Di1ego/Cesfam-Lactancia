import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EnlaceInicio } from '../components/EnlaceInicio'
import { IconoCheck, IconoChevron } from '../components/Iconos'
import todosLosSintomas from '../content/sintomas.json'
import { leerRegistro } from '../lib/almacenamiento'
import { hayAlerta } from '../lib/triage'
import { usePageTitle } from '../lib/usePageTitle'

export function Checklist() {
  usePageTitle('Síntomas')
  const navigate = useNavigate()
  const registro = leerRegistro()
  const [seleccionados, setSeleccionados] = useState([])

  if (!registro) {
    return (
      <div>
        <EnlaceInicio />
        <h1>Síntomas</h1>
        <div className="tarjeta tarjeta-vacia">
          <p>Primero cuéntanos tu situación para mostrarte el checklist adecuado.</p>
          <Link className="btn btn-primario btn-bloque" to="/registro">
            Ir a Registro
          </Link>
        </div>
      </div>
    )
  }

  const sintomas = todosLosSintomas.filter((s) => s.tipo === registro.tipo)

  function alternarSintoma(id) {
    setSeleccionados((actuales) =>
      actuales.includes(id)
        ? actuales.filter((s) => s !== id)
        : [...actuales, id],
    )
  }

  function manejarContinuar() {
    if (hayAlerta(seleccionados, sintomas)) {
      navigate('/resultado')
    } else {
      navigate('/camino')
    }
  }

  return (
    <div>
      <EnlaceInicio />
      <div className="encabezado">
        <h1 className="encabezado__titulo">¿Has tenido alguno de estos síntomas?</h1>
        <p className="encabezado__subtitulo">
          Marca todo lo que te esté pasando. Puedes elegir más de una opción.
        </p>
      </div>

      <div role="group" aria-label="Síntomas" className="lista-chips">
        {sintomas.map((sintoma) => {
          const marcado = seleccionados.includes(sintoma.id)
          return (
            <button
              key={sintoma.id}
              type="button"
              className="chip"
              aria-pressed={marcado}
              onClick={() => alternarSintoma(sintoma.id)}
            >
              {marcado && <IconoCheck width="16" height="16" />}
              {sintoma.texto}
            </button>
          )
        })}
      </div>

      {seleccionados.length > 0 && (
        <div className="pila" style={{ marginBottom: 24 }}>
          {sintomas
            .filter((s) => seleccionados.includes(s.id) && s.porQuePasa)
            .map((sintoma) => (
              <details
                key={sintoma.id}
                className={'info-sintoma' + (sintoma.alerta ? ' info-sintoma--alerta' : '')}
              >
                <summary className="info-sintoma__resumen">
                  <span>{sintoma.texto}</span>
                  <IconoChevron className="info-sintoma__chevron" />
                </summary>
                <div className="info-sintoma__cuerpo">
                  <p>
                    <strong>Por qué pasa:</strong> {sintoma.porQuePasa}
                  </p>
                  <p>
                    <strong>Qué puedes hacer:</strong> {sintoma.queHacer}
                  </p>
                </div>
              </details>
            ))}
        </div>
      )}

      <button type="button" className="btn btn-primario btn-bloque" onClick={manejarContinuar}>
        Continuar
      </button>
    </div>
  )
}
