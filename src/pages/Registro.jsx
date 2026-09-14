import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EnlaceInicio } from '../components/EnlaceInicio'
import { borrarRegistro, guardarRegistro, leerRegistro } from '../lib/almacenamiento'
import { fechaEsFutura, fppFueraDeRango } from '../lib/fechas'
import { usePageTitle } from '../lib/usePageTitle'

export function Registro() {
  usePageTitle('Registro')
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('embarazo')
  const [fecha, setFecha] = useState('')
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

    setError('')
    guardarRegistro({ nombre, tipo, fecha })
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
