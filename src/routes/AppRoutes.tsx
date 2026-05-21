import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'
import { InicioPage } from '../pages/InicioPage'
import { ProgramaAcademicoPage } from '../pages/ProgramaAcademicoPage'
import { SoyAlumnoPage } from '../pages/SoyAlumnoPage'
import { SoyProfesorPage } from '../pages/SoyProfesorPage'
import { SoyEgresadoPage } from '../pages/SoyEgresadoPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<InicioPage />} />
        <Route path="programa-academico" element={<ProgramaAcademicoPage />} />
        <Route path="soy-alumno" element={<SoyAlumnoPage />} />
        <Route path="soy-profesor" element={<SoyProfesorPage />} />
        <Route path="soy-egresado" element={<SoyEgresadoPage />} />
      </Route>
    </Routes>
  )
}
