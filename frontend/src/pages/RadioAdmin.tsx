import { useEffect, useState } from 'react';
import { DesktopLayout } from '../layouts/DesktopLayout';
import { AlertCircle, Check, X, User } from 'lucide-react';
import api from '../api';

interface Pedido {
  id: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PLAYED';
  aluno: { id: number; name: string };
  musica: { id: number; title: string; artist: string; explicit: boolean };
}

export function RadioAdmin() {
  const [filaPedidos, setFilaPedidos] = useState<Pedido[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    api.get<Pedido[]>('/pedidos')
      .then((response) => {
        if (active) {
          setFilaPedidos(response.data.filter((pedido) => pedido.status === 'PENDING'));
          setError('');
        }
      })
      .catch(() => {
        if (active) setError('Não foi possível carregar os pedidos.');
      });

    return () => {
      active = false;
    };
  }, []);

  const updateStatus = async (id: number, status: 'APPROVED' | 'REJECTED') => {
    try {
      await api.patch(`/pedidos/${id}/status`, { status });
      setFilaPedidos((pedidos) => pedidos.filter((pedido) => pedido.id !== id));
    } catch {
      setError('Não foi possível atualizar o pedido.');
    }
  };

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
            {error && <p role="alert" className="text-center font-semibold text-red-600">{error}</p>}
            {!error && filaPedidos.length === 0 && (
              <p className="text-center font-semibold text-brand-navy/70">Nenhum pedido pendente.</p>
            )}
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
                        {pedido.musica.title}
                      </span>
                      <span className="text-[13px] font-bold text-brand-navy/80 leading-tight">
                        {pedido.musica.artist}
                      </span>
                    </div>
                  </div>

                  {/* Explicit Badge */}
                  {pedido.musica.explicit && (
                    <div className="w-[42px] h-[42px] rounded-full border-[2.5px] border-[#e68c17] flex items-center justify-center mr-2">
                      <AlertCircle size={26} className="text-[#e68c17]" strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button onClick={() => void updateStatus(pedido.id, 'APPROVED')} className="w-[52px] h-[52px] rounded-full bg-brand-green flex items-center justify-center text-white shadow-[0_4px_10px_rgba(22,190,83,0.3)] hover:scale-105 transition-transform">
                    <Check size={30} strokeWidth={3} />
                  </button>
                  <button onClick={() => void updateStatus(pedido.id, 'REJECTED')} className="w-[52px] h-[52px] rounded-full bg-red-600 flex items-center justify-center text-white shadow-[0_4px_10px_rgba(220,38,38,0.3)] hover:scale-105 transition-transform border-[4px] border-white ring-2 ring-red-600">
                    <X size={26} strokeWidth={4} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </DesktopLayout>
  );
}

