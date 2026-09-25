import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlaySquare, LogOut } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-[280px] h-full bg-brand-navy flex flex-col justify-between text-white flex-shrink-0">
      {/* Top Navigation */}
      <div className="pt-8 px-6">
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-colors font-medium text-[15px] ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Home size={20} />
            <span>Menu Principal</span>
          </NavLink>

          <NavLink
            to="/tocadas"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-colors font-medium text-[15px] ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <PlaySquare size={20} />
            <span>Tocadas Hoje</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Profile Area */}
      <div className="pb-8 px-6">
        <div className="border-t border-white/10 pt-6 flex flex-col gap-5">
          {/* User Profile */}
          <NavLink 
            to="/perfil"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center font-semibold text-sm flex-shrink-0">
              AC
            </div>
            <span className="font-semibold text-[14px] truncate" title="João Silva de Souza">
              João Silva de Souza
            </span>
          </NavLink>

          {/* Logout */}
          <button 
            type="button"
            className="flex items-center gap-3 px-2 py-1 text-white/80 hover:text-white transition-colors text-[15px] font-medium w-full text-left"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
