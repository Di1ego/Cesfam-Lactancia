export function hayAlerta(idsSeleccionados, listaSintomas) {
  if (!idsSeleccionados || idsSeleccionados.length === 0) {
    return false
  }

  return idsSeleccionados.some((id) => {
    const sintoma = listaSintomas.find((s) => s.id === id)
    return sintoma?.alerta === true
  })
}
