import { describe, expect, it } from 'vitest'
import {
  calcularEdadBebe,
  calcularEdadGestacional,
  calcularFppDesdeSemanas,
  fechaEsFutura,
  fppFueraDeRango,
} from './fechas'

describe('calcularEdadGestacional', () => {
  it('da 0 semanas y 0 días cuando la FPP es hoy', () => {
    const hoy = new Date(2026, 8, 10)
    expect(calcularEdadGestacional('2026-09-10', hoy)).toEqual({
      semanas: 40,
      dias: 0,
    })
  })

  it('calcula semanas y días cuando faltan varias semanas para la FPP', () => {
    // Faltan 70 días para la FPP -> gestación = 280 - 70 = 210 días = 30 semanas 0 días
    const hoy = new Date(2026, 8, 10)
    const fpp = new Date(2026, 10, 19)
    expect(calcularEdadGestacional(fpp, hoy)).toEqual({ semanas: 30, dias: 0 })
  })

  it('no entrega valores negativos si la FPP ya pasó', () => {
    const hoy = new Date(2026, 8, 10)
    const fpp = new Date(2026, 0, 1)
    const resultado = calcularEdadGestacional(fpp, hoy)
    expect(resultado.semanas).toBeGreaterThanOrEqual(0)
    expect(resultado.dias).toBeGreaterThanOrEqual(0)
  })
})

describe('calcularEdadBebe', () => {
  it('da 0 meses y 0 días cuando nace hoy', () => {
    const hoy = new Date(2026, 8, 10)
    expect(calcularEdadBebe('2026-09-10', hoy)).toEqual({ meses: 0, dias: 0 })
  })

  it('calcula meses completos y días restantes', () => {
    const nacimiento = new Date(2026, 5, 1)
    const hoy = new Date(2026, 8, 10)
    expect(calcularEdadBebe(nacimiento, hoy)).toEqual({ meses: 3, dias: 9 })
  })

  it('no entrega valores negativos si la fecha de nacimiento es futura', () => {
    const nacimiento = new Date(2026, 11, 1)
    const hoy = new Date(2026, 8, 10)
    const resultado = calcularEdadBebe(nacimiento, hoy)
    expect(resultado.meses).toBe(0)
    expect(resultado.dias).toBe(0)
  })
})

describe('calcularFppDesdeSemanas', () => {
  const hoy = new Date(2026, 8, 10)

  it('da la fecha de hoy cuando la gestación ya está en 40 semanas', () => {
    expect(calcularFppDesdeSemanas(40, hoy)).toBe('2026-09-10')
  })

  it('el resultado es consistente con calcularEdadGestacional (ida y vuelta)', () => {
    const fpp = calcularFppDesdeSemanas(20, hoy)
    expect(calcularEdadGestacional(fpp, hoy)).toEqual({ semanas: 20, dias: 0 })
  })

  it('funciona para semana 0 (recién embarazada)', () => {
    const fpp = calcularFppDesdeSemanas(0, hoy)
    expect(calcularEdadGestacional(fpp, hoy)).toEqual({ semanas: 0, dias: 0 })
  })
})

describe('fechaEsFutura', () => {
  const hoy = new Date(2026, 8, 10)

  it('devuelve false para hoy', () => {
    expect(fechaEsFutura('2026-09-10', hoy)).toBe(false)
  })

  it('devuelve false para una fecha pasada', () => {
    expect(fechaEsFutura('2026-01-01', hoy)).toBe(false)
  })

  it('devuelve true para una fecha futura', () => {
    expect(fechaEsFutura('2026-09-11', hoy)).toBe(true)
  })
})

describe('fppFueraDeRango', () => {
  const hoy = new Date(2026, 8, 10)

  it('devuelve false para una FPP razonable en el futuro', () => {
    expect(fppFueraDeRango('2026-12-01', hoy)).toBe(false)
  })

  it('devuelve false para una FPP de hoy', () => {
    expect(fppFueraDeRango('2026-09-10', hoy)).toBe(false)
  })

  it('devuelve true para una FPP en el pasado', () => {
    expect(fppFueraDeRango('2026-09-09', hoy)).toBe(true)
  })

  it('devuelve true para una FPP demasiado lejana en el futuro', () => {
    expect(fppFueraDeRango('2027-12-01', hoy)).toBe(true)
  })
})
