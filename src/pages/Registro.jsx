import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { borrarRegistro, guardarRegistro, leerRegistro } from '../lib/almacenamiento'

export function Registro() {
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
      <h1>Registro</h1>
      <form onSubmit={manejarEnvio}>
        <div>
          <label htmlFor="nombre">Nombre (opcional)</label>
          <br />
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <fieldset>
          <legend>¿Cuál es tu situación?</legend>
          <label htmlFor="tipo-embarazo">
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
          <br />
          <label htmlFor="tipo-bebe">
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
          <br />
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Guardar</button>
      </form>

      <button type="button" onClick={manejarBorrado}>
        Borrar mis datos
      </button>
    </div>
  )
}
