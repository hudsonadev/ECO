document.addEventListener('DOMContentLoaded', () => {
  const cpfInput = document.getElementById('cpf');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const eyeIcon = document.getElementById('eyeIcon');
  const loginForm = document.getElementById('loginForm');

  // Máscara e formatação automática de CPF (000.000.000-00)
  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, ''); // remove não dígitos
      if (value.length > 11) value = value.slice(0, 11);

      // Aplica formatação
      if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
      } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
      } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
      }

      e.target.value = value;
    });
  }

  // Alternar visualização da senha
  if (togglePasswordBtn && passwordInput && eyeIcon) {
    let isPasswordVisible = false;

    togglePasswordBtn.addEventListener('click', () => {
      isPasswordVisible = !isPasswordVisible;

      if (isPasswordVisible) {
        passwordInput.type = 'text';
        // Ícone olho aberto com risco (ocultar)
        eyeIcon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
      } else {
        passwordInput.type = 'password';
        // Ícone olho normal
        eyeIcon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        `;
      }
    });
  }

  // Tratamento do envio do formulário
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const cpf = cpfInput ? cpfInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (!cpf || !password) {
        alert('Por favor, preencha o seu CPF e senha.');
        return;
      }

      console.log('Login submetido:', { cpf });
      // Aqui você pode integrar com o backend ou API de autenticação
    });
  }
});
