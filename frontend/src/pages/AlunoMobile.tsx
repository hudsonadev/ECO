import React from 'react';
import { AlignLeft, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const filaMusicas = [
  { id: 1, music: 'Alucinação', artist: 'Belchior' },
  { id: 2, music: 'Sobrevivendo ao Inferno', artist: "Racionais Mc's" },
  { id: 3, music: 'Ruas Vazias', artist: 'Shawlin' },
  { id: 4, music: 'Grana Azul', artist: 'Rodrigo Zin' },
  { id: 5, music: 'God Is', artist: 'Kanye West' },
];

export function AlunoMobile() {
  return (
    <div 
      className="min-h-screen w-full flex justify-center bg-brand-bg bg-cover bg-center bg-fixed pt-10 px-4 sm:p-6"
      style={{ backgroundImage: "url('/assets/background.png')" }}
    >
      {/* Mobile Container constraint */}
      <main className="w-full max-w-[414px] bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl flex flex-col h-full min-h-[85vh] overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center gap-4 px-6 pt-8 pb-6">
          <button className="text-brand-navy p-1 -ml-1 hover:bg-gray-100 rounded-lg transition-colors">
            <AlignLeft size={28} strokeWidth={2.5} />
          </button>
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
                className="w-full h-[46px] border-none outline-none bg-transparent pl-5 pr-[42px] text-[15px] text-brand-navy font-semibold placeholder:text-brand-navy/50"
              />
              <button className="absolute right-4 text-brand-navy/60 hover:text-brand-navy">
                <Search size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Queue Section */}
          <h2 className="text-[20px] font-bold text-brand-navy mb-5 text-center uppercase tracking-wide">
            Na Fila:
          </h2>

          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
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
                    {item.music}
                  </span>
                  <span className="text-[14px] font-bold text-brand-navy/80 leading-tight">
                    {item.artist}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-4">
            <button className="w-9 h-9 rounded-full bg-[#e8eef3] flex items-center justify-center text-brand-navy hover:bg-[#d0dbe5] transition-colors border border-brand-navy/10">
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
      </main>
    </div>
  );
}
