export function TextoFormateado({ texto }) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/g)
  return partes.map((parte, indice) =>
    parte.startsWith('**') && parte.endsWith('**') ? (
      <strong key={indice}>{parte.slice(2, -2)}</strong>
    ) : (
      parte
    ),
  )
}
