import React from 'react';
import { DesktopLayout } from '../layouts/DesktopLayout';
import { User } from 'lucide-react';

export function PerfilAluno() {
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

          <h2 className="text-[28px] font-bold text-brand-navy mb-2 uppercase text-center leading-tight">
            NOME DO USUÁRIO
          </h2>
          <p className="text-[22px] font-semibold text-brand-navy/80 text-center">
            CPF: 000.000.000-00
          </p>
          
        </div>
      </div>
    </DesktopLayout>
  );
}
