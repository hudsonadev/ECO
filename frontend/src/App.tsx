import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { RadioAdmin } from './pages/RadioAdmin';
import { PerfilAluno } from './pages/PerfilAluno';
import { AlunoMobile } from './pages/AlunoMobile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<RadioAdmin />} />
        <Route path="/perfil" element={<PerfilAluno />} />
        <Route path="/app" element={<AlunoMobile />} />
      </Routes>
    </Router>
  );
}

export default App;
