export const getToken = () => {
  return localStorage.getItem('smartlofo_token');
};

export const setToken = (token) => {
  localStorage.setItem('smartlofo_token', token);
};

export const removeToken = () => {
  localStorage.removeItem('smartlofo_token');
};

export const getUser = () => {
  const user = localStorage.getItem('smartlofo_user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
  localStorage.setItem('smartlofo_user', JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem('smartlofo_user');
};

export const logout = () => {
  removeToken();
  removeUser();
};

export const isAuthenticated = () => {
  return !!getToken();
};