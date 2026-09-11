import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sintomas from '../content/sintomas.json'
import { hayAlerta } from '../lib/triage'

export function Checklist() {
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
      <h1>¿Cómo te has sentido?</h1>
      <p>Marca todo lo que te esté pasando. Puedes elegir más de una opción.</p>

      <div role="group" aria-label="Síntomas">
        {sintomas.map((sintoma) => {
          const marcado = seleccionados.includes(sintoma.id)
          return (
            <button
              key={sintoma.id}
              type="button"
              aria-pressed={marcado}
              onClick={() => alternarSintoma(sintoma.id)}
            >
              {marcado ? '✓ ' : ''}
              {sintoma.texto}
            </button>
          )
        })}
      </div>

      <button type="button" onClick={manejarContinuar}>
        Continuar
      </button>
    </div>
  )
}
