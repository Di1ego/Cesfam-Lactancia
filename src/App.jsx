import { Route, Routes } from 'react-router-dom'
import { PieDePagina } from './components/PieDePagina'
import { Agendar } from './pages/Agendar'
import { Camino } from './pages/Camino'
import { Checklist } from './pages/Checklist'
import { Inicio } from './pages/Inicio'
import { NoEncontrada } from './pages/NoEncontrada'
import { Registro } from './pages/Registro'
import { Resultado } from './pages/Resultado'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/camino" element={<Camino />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
      <PieDePagina />
    </>
  )
}

export default App
