import React from 'react';
import { DesktopLayout } from '../layouts/DesktopLayout';
import { AlertCircle, Check, X, ChevronLeft, ChevronRight, User } from 'lucide-react';

// Mock data matching the design
const filaPedidos = [
  { id: 1, music: 'Plaqtudum', artist: 'Recayd Mob', explicit: true },
  { id: 2, music: 'Grana Azul', artist: 'Rodrigo Zin', explicit: false },
  { id: 3, music: 'Mistérios do Planeta', artist: 'Novos Baianos', explicit: true },
  { id: 4, music: 'Dedicada a Ela', artist: 'Arthur Verocai', explicit: false },
  { id: 5, music: 'O Trem Azul', artist: 'Lô Borges', explicit: true },
  { id: 6, music: 'Palco', artist: 'Gilberto Gil', explicit: false },
];

export function RadioAdmin() {
  return (
    <DesktopLayout>
      <div className="w-full h-full p-12 flex flex-col items-center">
        
        {/* Header */}
        <h1 className="text-[32px] font-bold text-brand-navy mb-10 uppercase tracking-tight">
          Menu Principal
        </h1>

        {/* Content Container */}
        <div className="w-full max-w-[900px] bg-[#f4f6f8] rounded-[24px] p-8 flex flex-col flex-1 shadow-sm border border-gray-100">
          <h2 className="text-[24px] font-bold text-brand-navy mb-6 text-center uppercase">
            Lista de Pedidos
          </h2>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {filaPedidos.map((pedido) => (
              <div key={pedido.id} className="flex items-center gap-4 w-full">
                
                {/* User Avatar Left */}
                <div className="w-[60px] h-[60px] flex-shrink-0 bg-[#e8eef3] rounded-[16px] border-[1.5px] border-brand-navy/30 flex items-center justify-center">
                  <div className="w-[42px] h-[42px] rounded-full bg-brand-navy/50 flex items-center justify-center overflow-hidden relative">
                    <User size={26} className="text-white mt-2" strokeWidth={2} />
                  </div>
                </div>

                {/* Music Card */}
                <div className="flex-1 bg-[#e8eef3] rounded-[16px] h-[60px] flex items-center px-4 justify-between shadow-sm border border-gray-200/60">
                  <div className="flex items-center gap-4">
                    {/* Placeholder Cover */}
                    <div className="w-10 h-10 rounded-full bg-brand-navy/80 flex-shrink-0" />
                    
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-brand-navy leading-tight">
                        {pedido.music}
                      </span>
                      <span className="text-[13px] font-bold text-brand-navy/80 leading-tight">
                        {pedido.artist}
                      </span>
                    </div>
                  </div>

                  {/* Explicit Badge */}
                  {pedido.explicit && (
                    <div className="w-[42px] h-[42px] rounded-full border-[2.5px] border-[#e68c17] flex items-center justify-center mr-2">
                      <AlertCircle size={26} className="text-[#e68c17]" strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button className="w-[52px] h-[52px] rounded-full bg-brand-green flex items-center justify-center text-white shadow-[0_4px_10px_rgba(22,190,83,0.3)] hover:scale-105 transition-transform">
                    <Check size={30} strokeWidth={3} />
                  </button>
                  <button className="w-[52px] h-[52px] rounded-full bg-red-600 flex items-center justify-center text-white shadow-[0_4px_10px_rgba(220,38,38,0.3)] hover:scale-105 transition-transform border-[4px] border-white ring-2 ring-red-600">
                    <X size={26} strokeWidth={4} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button className="w-9 h-9 rounded-full bg-[#d0dbe5] flex items-center justify-center text-brand-navy hover:bg-[#c0cdd9] transition-colors border border-brand-navy/10">
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-3 font-semibold text-brand-navy text-[15px]">
              <div className="w-8 h-8 rounded-md border-[1.5px] border-brand-navy flex items-center justify-center bg-white">
                1
              </div>
              <span>de</span>
              <div className="w-8 h-8 rounded-md border-[1.5px] border-brand-navy flex items-center justify-center bg-white">
                3
              </div>
            </div>

            <button className="w-9 h-9 rounded-full bg-[#99dce6] flex items-center justify-center text-brand-navy hover:bg-[#88d0da] transition-colors border border-[#77c0ca]">
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </DesktopLayout>
  );
}

