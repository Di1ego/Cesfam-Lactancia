import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EnlaceInicio } from '../components/EnlaceInicio'
import { borrarRegistro, guardarRegistro, leerRegistro } from '../lib/almacenamiento'
import { calcularFppDesdeSemanas, fechaEsFutura, fppFueraDeRango } from '../lib/fechas'
import { usePageTitle } from '../lib/usePageTitle'

export function Registro() {
  usePageTitle('Registro')
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('embarazo')
  const [modoFecha, setModoFecha] = useState('fpp')
  const [fecha, setFecha] = useState('')
  const [semanas, setSemanas] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const registro = leerRegistro()
    if (registro) {
      setNombre(registro.nombre ?? '')
      setTipo(registro.tipo ?? 'embarazo')
      setFecha(registro.fecha ?? '')
    }
  }, [])

  function manejarEnvio(evento) {
    evento.preventDefault()

    let fechaFinal = fecha

    if (tipo === 'embarazo' && modoFecha === 'semanas') {
      const semanasNum = Number(semanas)
      if (semanas === '' || Number.isNaN(semanasNum)) {
        setError('Por favor ingresa cuántas semanas de embarazo tienes.')
        return
      }
      if (semanasNum < 0 || semanasNum > 42) {
        setError('Ingresa un número de semanas entre 0 y 42.')
        return
      }
      fechaFinal = calcularFppDesdeSemanas(semanasNum)
    } else {
      if (!fecha) {
        setError(
          tipo === 'embarazo'
            ? 'Por favor ingresa tu fecha probable de parto.'
            : 'Por favor ingresa la fecha de nacimiento de tu bebé.',
        )
        return
      }

      if (tipo === 'bebe' && fechaEsFutura(fecha)) {
        setError('La fecha de nacimiento no puede ser en el futuro.')
        return
      }

      if (tipo === 'embarazo' && fppFueraDeRango(fecha)) {
        setError('Revisa la fecha probable de parto: no puede ser en el pasado ni demasiado lejana.')
        return
      }
    }

    setError('')
    guardarRegistro({ nombre, tipo, fecha: fechaFinal })
    navigate('/checklist')
  }

  function manejarBorrado() {
    borrarRegistro()
    setNombre('')
    setTipo('embarazo')
    setFecha('')
    setError('')
  }

  return (
    <div>
      <EnlaceInicio />
      <div className="encabezado">
        <h1 className="encabezado__titulo">Cuéntanos tu situación</h1>
        <p className="encabezado__subtitulo">Así podemos mostrarte contenido para tu etapa.</p>
      </div>

      <form onSubmit={manejarEnvio} className="pila">
        <div>
          <label htmlFor="nombre">Nombre (opcional)</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <fieldset>
          <legend>¿Cuál es tu situación?</legend>
          <label className="opcion-radio" htmlFor="tipo-embarazo">
            <input
              id="tipo-embarazo"
              type="radio"
              name="tipo"
              value="embarazo"
              checked={tipo === 'embarazo'}
              onChange={() => setTipo('embarazo')}
            />
            Estoy embarazada
          </label>
          <label className="opcion-radio" htmlFor="tipo-bebe">
            <input
              id="tipo-bebe"
              type="radio"
              name="tipo"
              value="bebe"
              checked={tipo === 'bebe'}
              onChange={() => setTipo('bebe')}
            />
            Tengo un bebé
          </label>
        </fieldset>

        {tipo === 'embarazo' && (
          <fieldset>
            <legend>¿Cómo quieres darnos tu información?</legend>
            <label className="opcion-radio" htmlFor="modo-fpp">
              <input
                id="modo-fpp"
                type="radio"
                name="modoFecha"
                value="fpp"
                checked={modoFecha === 'fpp'}
                onChange={() => setModoFecha('fpp')}
              />
              Sé mi fecha probable de parto
            </label>
            <label className="opcion-radio" htmlFor="modo-semanas">
              <input
                id="modo-semanas"
                type="radio"
                name="modoFecha"
                value="semanas"
                checked={modoFecha === 'semanas'}
                onChange={() => setModoFecha('semanas')}
              />
              Sé cuántas semanas de embarazo tengo
            </label>
          </fieldset>
        )}

        {tipo === 'embarazo' && modoFecha === 'semanas' ? (
          <div>
            <label htmlFor="semanas">Semanas de embarazo</label>
            <input
              id="semanas"
              type="number"
              inputMode="numeric"
              min="0"
              max="42"
              value={semanas}
              onChange={(e) => setSemanas(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="fecha">
              {tipo === 'embarazo'
                ? 'Fecha probable de parto'
                : 'Fecha de nacimiento del bebé'}
            </label>
            <input
              id="fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
        )}

        {error && (
          <p role="alert" className="texto-error">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primario btn-bloque">
          Guardar
        </button>
      </form>

      <button type="button" className="btn-texto" onClick={manejarBorrado}>
        Borrar mis datos
      </button>
    </div>
  )
}
