import api from './api';

export const couponService = {
  getAll: async () => {
    const response = await api.get('/coupons');
    return response.data;
  },
  getMine: async () => {
    const response = await api.get('/coupons/me');
    return response.data;
  },
  save: async (id) => {
    const response = await api.post(`/coupons/${id}/save`);
    return response.data;
  },
  redeem: async (id) => {
    const response = await api.post(`/coupons/${id}/redeem`);
    return response.data;
  }
};