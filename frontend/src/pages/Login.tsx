
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../api';
import { setToken } from '../auth';

export function Login() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Máscara dinâmica para o CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Apenas números
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }

    setCpf(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpf || !password) return;
    console.log('Tentativa de login:', { cpf, password });
    // TODO: Integração com o backend
  };

  return (
    <main 
      className="min-h-screen w-full flex items-center justify-center p-6 bg-brand-bg bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/assets/background.png')" }}
    >
      <div className="bg-white w-full max-w-[476px] rounded-[20px] px-12 pt-10 pb-9 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col items-center max-sm:px-6 max-sm:py-8">
        
        {/* Logo ECO */}
        <div className="flex justify-center items-center mb-[22px] w-full">
          <img 
            src="/assets/eco_logo.png" 
            alt="Logo ECO" 
            className="max-w-[165px] h-auto block select-none"
          />
        </div>

        {/* Subtítulo */}
        <p className="text-[14.5px] font-semibold text-brand-navyLight text-center mb-[26px] tracking-[-0.1px]">
          Preencha os dados abaixo para continuar
        </p>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          
          {/* Campo: CPF */}
          <div className="mb-4 w-full">
            <label htmlFor="cpf" className="block text-[13.5px] font-semibold text-brand-navyLight mb-1.5 text-left">
              Digite o seu CPF
            </label>
            <div className="relative flex items-center w-full border-[1.5px] border-brand-border rounded-[10px] bg-white transition-colors duration-200 focus-within:border-brand-green focus-within:ring-[3px] focus-within:ring-brand-green/20">
              <span className="absolute left-[14px] text-brand-border pointer-events-none flex items-center justify-center">
                <User size={18} strokeWidth={2} />
              </span>
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={handleCpfChange}
                placeholder="CPF"
                maxLength={14}
                inputMode="numeric"
                required
                className="w-full h-11 border-none outline-none bg-transparent pl-[42px] pr-[14px] text-[14px] text-gray-800 font-medium placeholder:text-brand-border placeholder:font-medium"
              />
            </div>
          </div>

          {/* Campo: Senha */}
          <div className="mb-4 w-full">
            <label htmlFor="password" className="block text-[13.5px] font-semibold text-brand-navyLight mb-1.5 text-left">
              Digite a sua senha
            </label>
            <div className="relative flex items-center w-full border-[1.5px] border-brand-border rounded-[10px] bg-white transition-colors duration-200 focus-within:border-brand-green focus-within:ring-[3px] focus-within:ring-brand-green/20">
              <span className="absolute left-[14px] text-brand-border pointer-events-none flex items-center justify-center">
                <Lock size={18} strokeWidth={2} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                className="w-full h-11 border-none outline-none bg-transparent pl-[42px] pr-[42px] text-[14px] text-gray-800 font-medium placeholder:text-brand-border placeholder:font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 p-1.5 text-brand-border hover:text-brand-navyLight hover:bg-black/5 rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green flex items-center justify-center"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
              </button>
            </div>
          </div>

          {/* Link: Esqueci minha senha */}
          <div className="mt-1 mb-[26px] text-left">
            <a 
              href="#" 
              className="text-[12.5px] font-semibold text-brand-navyLight underline transition-colors duration-150 hover:text-brand-green inline-block"
            >
              Esqueci minha senha
            </a>
          </div>

          {/* Botão: Entrar */}
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="bg-brand-green text-white border-none rounded-[10px] text-[16.5px] font-bold py-2.5 px-12 cursor-pointer shadow-[0_4px_14px_rgba(22,190,83,0.38)] transition-all duration-200 hover:bg-brand-greenHover hover:shadow-[0_6px_18px_rgba(22,190,83,0.45)] active:scale-[0.98] min-w-[172px] tracking-[0.2px] max-sm:w-full"
            >
              Entrar
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
