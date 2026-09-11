const MS_POR_DIA = 1000 * 60 * 60 * 24
const DIAS_GESTACION_COMPLETA = 280 // 40 semanas

function diferenciaEnDias(fechaInicio, fechaFin) {
  const inicio = new Date(fechaInicio)
  const fin = new Date(fechaFin)
  inicio.setHours(0, 0, 0, 0)
  fin.setHours(0, 0, 0, 0)
  return Math.round((fin.getTime() - inicio.getTime()) / MS_POR_DIA)
}

export function calcularEdadGestacional(fpp, fechaActual = new Date()) {
  const diasHastaFpp = diferenciaEnDias(fechaActual, fpp)
  const diasGestacion = DIAS_GESTACION_COMPLETA - diasHastaFpp
  const dias = Math.max(0, diasGestacion)

  return {
    semanas: Math.floor(dias / 7),
    dias: dias % 7,
  }
}

export function calcularEdadBebe(fechaNacimiento, fechaActual = new Date()) {
  const dias = Math.max(0, diferenciaEnDias(fechaNacimiento, fechaActual))
  const nacimiento = new Date(fechaNacimiento)
  const actual = new Date(fechaActual)

  let meses =
    (actual.getFullYear() - nacimiento.getFullYear()) * 12 +
    (actual.getMonth() - nacimiento.getMonth())

  let diaReferencia = new Date(nacimiento)
  diaReferencia.setMonth(diaReferencia.getMonth() + meses)

  if (diaReferencia.getTime() > actual.getTime()) {
    meses -= 1
    diaReferencia = new Date(nacimiento)
    diaReferencia.setMonth(diaReferencia.getMonth() + meses)
  }

  const diasRestantes = Math.max(0, diferenciaEnDias(diaReferencia, actual))

  return {
    meses: Math.max(0, meses),
    dias: dias === 0 ? 0 : diasRestantes,
  }
}
