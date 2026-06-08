import api from './api';

export const historyService = {
  getHistory: async () => {
    const response = await api.get('/analyzer/history');
    return response.data;
  },
};
