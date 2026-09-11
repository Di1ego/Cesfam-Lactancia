const CLAVE_REGISTRO = 'clac-registro'

export function guardarRegistro(registro) {
  localStorage.setItem(CLAVE_REGISTRO, JSON.stringify(registro))
}

export function leerRegistro() {
  const guardado = localStorage.getItem(CLAVE_REGISTRO)
  if (!guardado) {
    return null
  }

  try {
    return JSON.parse(guardado)
  } catch {
    return null
  }
}

export function borrarRegistro() {
  localStorage.removeItem(CLAVE_REGISTRO)
}
