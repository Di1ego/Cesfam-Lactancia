import { useEffect } from 'react'

export function usePageTitle(titulo) {
  useEffect(() => {
    const anterior = document.title
    document.title = `${titulo} · CLAC CESFAM Arauco`
    return () => {
      document.title = anterior
    }
  }, [titulo])
}
