import type { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';

interface DesktopLayoutProps {
  children: ReactNode;
}

export function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6 bg-brand-bg bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/assets/background.png')" }}
    >
      <div className="w-full max-w-[1280px] h-[800px] bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex overflow-hidden max-lg:h-[90vh]">
        
        {/* Sidebar Lateral */}
        <Sidebar />

        {/* Área de Conteúdo Principal */}
        <main className="flex-1 bg-white relative overflow-y-auto overflow-x-hidden">
          {children}
        </main>
        
      </div>
    </div>
  );
}
