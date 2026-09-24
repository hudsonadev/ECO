import type { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { RadioAdmin } from './pages/RadioAdmin';
import { PerfilAluno } from './pages/PerfilAluno';
import { AlunoMobile } from './pages/AlunoMobile';
import { isAuthenticated } from './auth';

function ProtectedRoute({ children }: { children: ReactNode }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><RadioAdmin /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><PerfilAluno /></ProtectedRoute>} />
        <Route path="/app" element={<ProtectedRoute><AlunoMobile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
