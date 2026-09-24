import { NavLink, useNavigate } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import { clearToken, getUser } from '../auth';

export function Sidebar() {
  const navigate = useNavigate();
  const user = getUser();
  const initials = user?.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() ?? '--';

  const logout = () => {
    clearToken();
    navigate('/login');
  };

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
              {initials}
            </div>
            <span className="font-semibold text-[14px] truncate" title={user?.name}>
              {user?.name ?? 'Usuário'}
            </span>
          </NavLink>

          {/* Logout */}
          <button 
            type="button"
            onClick={logout}
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
