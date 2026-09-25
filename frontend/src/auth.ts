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

export const clearToken = () => {
  localStorage.removeItem('authToken');
};

export const isAuthenticated = (): boolean => !!getToken();
