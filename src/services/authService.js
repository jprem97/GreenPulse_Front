import api from './api';

export const authService = {
  register: async (formData) => {
    // Form data used because of image upload
    const response = await api.post('/users/register', formData);
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/users/logout');
    return response.data;
  }
};