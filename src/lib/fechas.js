const MS_POR_DIA = 1000 * 60 * 60 * 24
const DIAS_GESTACION_COMPLETA = 280 // 40 semanas

// new Date('YYYY-MM-DD') se interpreta como medianoche UTC, no como
// medianoche local: en zonas horarias detrás de UTC (como Chile) eso
// corresponde al día anterior en hora local. Para trabajar siempre con
// el día calendario correcto, las fechas en formato string se arman a
// mano con año/mes/día locales en vez de dejar que el motor las parsee.
function aFechaLocal(valor) {
  if (valor instanceof Date) {
    return new Date(valor.getTime())
  }
  const [anio, mes, dia] = String(valor).split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}

function diferenciaEnDias(fechaInicio, fechaFin) {
  const inicio = aFechaLocal(fechaInicio)
  const fin = aFechaLocal(fechaFin)
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

const MAX_DIAS_FPP_FUTURA = 300 // ~43 semanas, con margen sobre las 40 de gestación completa

export function fechaEsFutura(fecha, fechaActual = new Date()) {
  return diferenciaEnDias(fechaActual, fecha) > 0
}

export function fppFueraDeRango(fecha, fechaActual = new Date()) {
  const dias = diferenciaEnDias(fechaActual, fecha)
  return dias < 0 || dias > MAX_DIAS_FPP_FUTURA
}

function formatearFechaISO(fecha) {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}

export function calcularFppDesdeSemanas(semanas, fechaActual = new Date()) {
  const diasFaltantes = DIAS_GESTACION_COMPLETA - semanas * 7
  const fecha = aFechaLocal(fechaActual)
  fecha.setHours(0, 0, 0, 0)
  fecha.setDate(fecha.getDate() + diasFaltantes)
  return formatearFechaISO(fecha)
}

export function calcularEdadBebe(fechaNacimiento, fechaActual = new Date()) {
  const dias = Math.max(0, diferenciaEnDias(fechaNacimiento, fechaActual))
  const nacimiento = aFechaLocal(fechaNacimiento)
  const actual = aFechaLocal(fechaActual)

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
