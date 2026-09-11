import { beforeEach, describe, expect, it } from 'vitest'
import { borrarRegistro, guardarRegistro, leerRegistro } from './almacenamiento'

beforeEach(() => {
  localStorage.clear()
})

describe('almacenamiento', () => {
  it('devuelve null si no hay registro guardado', () => {
    expect(leerRegistro()).toBeNull()
  })

  it('guarda y luego lee el mismo registro', () => {
    const registro = { nombre: 'Camila', tipo: 'embarazo', fecha: '2026-12-01' }
    guardarRegistro(registro)
    expect(leerRegistro()).toEqual(registro)
  })

  it('borra el registro guardado', () => {
    guardarRegistro({ nombre: '', tipo: 'bebe', fecha: '2026-01-01' })
    borrarRegistro()
    expect(leerRegistro()).toBeNull()
  })

  it('devuelve null si el valor guardado no es JSON válido', () => {
    localStorage.setItem('clac-registro', '{no-es-json')
    expect(leerRegistro()).toBeNull()
  })
})
