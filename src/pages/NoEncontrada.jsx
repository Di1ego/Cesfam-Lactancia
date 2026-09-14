import { EnlaceInicio } from '../components/EnlaceInicio'
import { IconoGota } from '../components/Iconos'
import { usePageTitle } from '../lib/usePageTitle'

export function NoEncontrada() {
  usePageTitle('Página no encontrada')

  return (
    <div>
      <EnlaceInicio />
      <h1>Esta página no existe</h1>
      <div className="tarjeta tarjeta-vacia">
        <div className="tarjeta-vacia__icono">
          <IconoGota />
        </div>
        <p>Puede que el enlace esté mal escrito. Vuelve al inicio para seguir navegando.</p>
      </div>
    </div>
  )
}
