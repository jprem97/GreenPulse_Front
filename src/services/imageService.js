import api from './api';

export const imageService = {
  analyze: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/analyzer/analyze', formData);
    return response.data;
  }
};