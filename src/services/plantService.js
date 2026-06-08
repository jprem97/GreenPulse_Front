import api from './api';

export const plantService = {
  create: async (plantName, plantType, durationWeeks) => {
    const response = await api.post('/plants/create', { plantName, plantType, durationWeeks });
    return response.data;
  },

  uploadStage: async (plantId, file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post(`/plants/${plantId}/upload`, formData);
    return response.data;
  },

  getMyPlants: async () => {
    const response = await api.get('/plants/my');
    return response.data;
  },

  getPlantById: async (plantId) => {
    const response = await api.get(`/plants/${plantId}`);
    return response.data;
  },

  deletePlant: async (plantId) => {
    const response = await api.delete(`/plants/${plantId}`);
    return response.data;
  },
};
