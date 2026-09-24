import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import api from '../api';

interface Pedido {
  id: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PLAYED';
  musica: { id: number; title: string; artist: string };
}

export function AlunoMobile() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get<Pedido[]>('/pedidos')
      .then((response) => setPedidos(
        response.data.filter((pedido) => ['PENDING', 'APPROVED'].includes(pedido.status)),
      ))
      .catch(() => setError('Não foi possível carregar a fila.'));
  }, []);

  const filaMusicas = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('pt-BR');
    if (!term) return pedidos;
    return pedidos.filter(({ musica }) =>
      musica.title.toLocaleLowerCase('pt-BR').includes(term)
      || musica.artist.toLocaleLowerCase('pt-BR').includes(term));
  }, [pedidos, search]);

  return (
    <div 
      className="min-h-screen w-full flex justify-center bg-brand-bg bg-cover bg-center bg-fixed pt-10 px-4 sm:p-6"
      style={{ backgroundImage: "url('/assets/background.png')" }}
    >
      {/* Mobile Container constraint */}
      <main className="w-full max-w-[414px] bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl flex flex-col h-full min-h-[85vh] overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center gap-4 px-6 pt-8 pb-6">
          <h1 className="text-[20px] font-bold text-brand-navy uppercase tracking-tight mt-0.5">
            Menu Principal
          </h1>
        </header>

        <div className="px-6 flex flex-col flex-1 pb-8">
          
          {/* Search Section */}
          <div className="mb-8">
            <label className="block text-[14px] font-bold text-brand-navy mb-2">
              Pesquise no catálogo
            </label>
            <div className="relative flex items-center w-full border-[1.5px] border-brand-navy/30 rounded-full bg-white focus-within:border-brand-navy focus-within:ring-[3px] focus-within:ring-brand-navy/10 transition-all">
              <input 
                type="text" 
                placeholder="Buscar" 
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full h-[46px] border-none outline-none bg-transparent pl-5 pr-[42px] text-[15px] text-brand-navy font-semibold placeholder:text-brand-navy/50"
              />
              <span className="absolute right-4 text-brand-navy/60">
                <Search size={20} strokeWidth={2.5} />
              </span>
            </div>
          </div>

          {/* Queue Section */}
          <h2 className="text-[20px] font-bold text-brand-navy mb-5 text-center uppercase tracking-wide">
            Na Fila:
          </h2>

          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            {error && <p role="alert" className="text-center font-semibold text-red-600">{error}</p>}
            {!error && filaMusicas.length === 0 && (
              <p className="text-center font-semibold text-brand-navy/70">Nenhuma música na fila.</p>
            )}
            {filaMusicas.map((item, index) => (
              <div 
                key={item.id} 
                className="flex items-center w-full bg-[#f4f6f8] rounded-[20px] p-2.5 shadow-sm border border-black/5"
              >
                {/* Ranking Number */}
                <span className="w-8 flex justify-center text-[20px] font-black text-black/90 mr-1">
                  {index + 1}
                </span>

                {/* Album Cover Placeholder */}
                <div className="w-[52px] h-[52px] rounded-full bg-brand-navy flex-shrink-0 shadow-md" />

                {/* Info */}
                <div className="flex flex-col ml-4">
                  <span className="text-[15px] font-bold text-brand-navy leading-tight">
                    {item.musica.title}
                  </span>
                  <span className="text-[14px] font-bold text-brand-navy/80 leading-tight">
                    {item.musica.artist}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
