import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EnlaceInicio } from '../components/EnlaceInicio'
import { IconoCheck } from '../components/Iconos'
import sintomas from '../content/sintomas.json'
import { hayAlerta } from '../lib/triage'
import { usePageTitle } from '../lib/usePageTitle'

export function Checklist() {
  usePageTitle('Síntomas')
  const navigate = useNavigate()
  const [seleccionados, setSeleccionados] = useState([])

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

      <button type="button" className="btn btn-primario btn-bloque" onClick={manejarContinuar}>
        Continuar
      </button>
    </div>
  )
}
