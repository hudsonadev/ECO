import { useEffect, useState } from 'react';
import { DesktopLayout } from '../layouts/DesktopLayout';
import { User } from 'lucide-react';
import api from '../api';
import { getUser } from '../auth';
import type { AuthUser } from '../auth';

export function PerfilAluno() {
  const [aluno, setAluno] = useState<AuthUser | null>(getUser());
  const [error, setError] = useState('');

  useEffect(() => {
    api.get<AuthUser>('/me')
      .then((response) => setAluno(response.data))
      .catch(() => setError('Não foi possível carregar o perfil.'));
  }, []);

  return (
    <DesktopLayout>
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="flex flex-col items-center max-w-md w-full">
          
          <h1 className="text-[28px] md:text-[32px] font-bold text-brand-navy mb-12 uppercase tracking-tight">
            Perfil do Aluno
          </h1>

          {/* Avatar Container */}
          <div className="w-[280px] h-[280px] bg-brand-navy/5 rounded-[32px] flex items-center justify-center mb-10 shadow-inner">
            <div className="w-[200px] h-[200px] bg-brand-navy/60 rounded-full flex items-center justify-center relative overflow-hidden">
              <User size={120} className="text-white mt-8" strokeWidth={1.5} />
            </div>
          </div>

          {error ? (
            <p role="alert" className="text-center font-semibold text-red-600">{error}</p>
          ) : aluno ? (
            <>
              <h2 className="text-[28px] font-bold text-brand-navy mb-2 uppercase text-center leading-tight">
                {aluno.name}
              </h2>
              <p className="text-[22px] font-semibold text-brand-navy/80 text-center">
                CPF: {aluno.cpf}
              </p>
            </>
          ) : (
            <p className="text-center font-semibold text-brand-navy/70">Carregando perfil...</p>
          )}
          
        </div>
      </div>
    </DesktopLayout>
  );
}
