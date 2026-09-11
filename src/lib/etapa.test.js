import { describe, expect, it } from 'vitest'
import { calcularEtapaActualId } from './etapa'

const etapas = [
  { id: 'embarazo-t1', tipo: 'embarazo', semanaInicio: 0, semanaFin: 13 },
  { id: 'embarazo-t2', tipo: 'embarazo', semanaInicio: 14, semanaFin: 27 },
  { id: 'embarazo-t3', tipo: 'embarazo', semanaInicio: 28, semanaFin: 42 },
  { id: 'bebe-0', tipo: 'bebe', mesInicio: 0, mesFin: 0 },
  { id: 'bebe-1-2', tipo: 'bebe', mesInicio: 1, mesFin: 2 },
]

describe('calcularEtapaActualId', () => {
  it('devuelve null si no hay registro', () => {
    expect(calcularEtapaActualId(null, etapas)).toBeNull()
  })

  it('identifica el trimestre de embarazo correcto', () => {
    // FPP en 140 días más -> gestación = 280-140 = 140 días = 20 semanas -> segundo trimestre
    const hoy = new Date('2026-09-10')
    const fpp = new Date('2027-01-28')
    const registro = { tipo: 'embarazo', fecha: fpp }
    expect(calcularEtapaActualId(registro, etapas, hoy)).toBe('embarazo-t2')
  })

  it('respeta el límite exacto entre dos trimestres', () => {
    const hoy = new Date('2026-09-10')
    // Gestación de exactamente 13 semanas (91 días) -> aún primer trimestre
    const fppSemana13 = new Date(hoy.getTime())
    fppSemana13.setDate(fppSemana13.getDate() + (280 - 91))
    const registro13 = { tipo: 'embarazo', fecha: fppSemana13 }
    expect(calcularEtapaActualId(registro13, etapas, hoy)).toBe('embarazo-t1')

    // Gestación de exactamente 14 semanas (98 días) -> ya segundo trimestre
    const fppSemana14 = new Date(hoy.getTime())
    fppSemana14.setDate(fppSemana14.getDate() + (280 - 98))
    const registro14 = { tipo: 'embarazo', fecha: fppSemana14 }
    expect(calcularEtapaActualId(registro14, etapas, hoy)).toBe('embarazo-t2')
  })

  it('identifica la etapa del bebé correcta', () => {
    const hoy = new Date('2026-09-10')
    const nacimiento = new Date('2026-08-01') // ~1 mes cumplido
    const registro = { tipo: 'bebe', fecha: nacimiento }
    expect(calcularEtapaActualId(registro, etapas, hoy)).toBe('bebe-1-2')
  })

  it('devuelve null si la edad no calza en ninguna etapa definida', () => {
    const hoy = new Date('2026-09-10')
    const nacimiento = new Date('2026-01-01') // varios meses, fuera de las etapas de ejemplo
    const registro = { tipo: 'bebe', fecha: nacimiento }
    expect(calcularEtapaActualId(registro, etapas, hoy)).toBeNull()
  })
})
