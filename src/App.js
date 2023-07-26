import React from 'react';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Inicio from './components/Inicio/Inicio';
import RealizarPruebas from './components/RealizarPruebas/RealizarPruebas';
import AgregarPreguntas from './components/AgregarPreguntas/AgregarPreguntas';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        {/* Ruta para la página de inicio */}
        <Route exact path="/" Component={Inicio} />

        {/* Ruta para la página de "Realizar Pruebas" */}
        <Route path="/realizar-pruebas" Component={RealizarPruebas} />

        {/* Ruta para la página de "Agregar Preguntas" */}
        <Route path="/agregar-preguntas" Component={AgregarPreguntas} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
