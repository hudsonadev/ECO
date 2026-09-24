// src/auth.ts
/**
 * Simple token storage helper (localStorage). In production you may want a more secure approach.
 */
export const setToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export interface AuthUser {
  id: number;
  name: string;
  cpf: string;
}

export const setUser = (user: AuthUser) => {
  localStorage.setItem('authUser', JSON.stringify(user));
};

export const getUser = (): AuthUser | null => {
  const stored = localStorage.getItem('authUser');
  if (!stored) return null;

  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
};

export const clearToken = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
};

export const isAuthenticated = (): boolean => !!getToken();
