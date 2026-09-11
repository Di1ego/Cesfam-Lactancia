import { describe, expect, it } from 'vitest'
import { hayAlerta } from './triage'

const sintomas = [
  { id: 'sin-alerta-1', texto: 'Sin alerta 1', alerta: false },
  { id: 'sin-alerta-2', texto: 'Sin alerta 2', alerta: false },
  { id: 'con-alerta-1', texto: 'Con alerta 1', alerta: true },
]

describe('hayAlerta', () => {
  it('devuelve false si no hay síntomas seleccionados', () => {
    expect(hayAlerta([], sintomas)).toBe(false)
  })

  it('devuelve false si todos los síntomas seleccionados son sin alerta', () => {
    expect(hayAlerta(['sin-alerta-1', 'sin-alerta-2'], sintomas)).toBe(false)
  })

  it('devuelve true si al menos un síntoma seleccionado tiene alerta', () => {
    expect(hayAlerta(['sin-alerta-1', 'con-alerta-1'], sintomas)).toBe(true)
  })

  it('ignora ids que no existen en la lista de síntomas', () => {
    expect(hayAlerta(['id-inexistente'], sintomas)).toBe(false)
  })

  it('funciona con una lista de síntomas vacía', () => {
    expect(hayAlerta(['cualquier-id'], [])).toBe(false)
  })
})
