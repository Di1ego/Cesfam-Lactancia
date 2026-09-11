import { calcularEdadBebe, calcularEdadGestacional } from './fechas'

export function calcularEtapaActualId(registro, etapas, fechaActual = new Date()) {
  if (!registro) {
    return null
  }

  const etapasTipo = etapas.filter((e) => e.tipo === registro.tipo)

  if (registro.tipo === 'embarazo') {
    const { semanas } = calcularEdadGestacional(registro.fecha, fechaActual)
    const etapa = etapasTipo.find(
      (e) => semanas >= e.semanaInicio && semanas <= e.semanaFin,
    )
    return etapa?.id ?? null
  }

  if (registro.tipo === 'bebe') {
    const { meses } = calcularEdadBebe(registro.fecha, fechaActual)
    const etapa = etapasTipo.find(
      (e) => meses >= e.mesInicio && meses <= e.mesFin,
    )
    return etapa?.id ?? null
  }

  return null
}
