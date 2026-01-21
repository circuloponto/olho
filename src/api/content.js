import axios from 'axios';

const API_URL = '/api';

export const getContentByType = async (type) => {
  const response = await axios.get(`${API_URL}/content/${type}`);
  return response.data;
};

export const getContentById = async (id) => {
  const response = await axios.get(`${API_URL}/content/item/${id}`);
  return response.data;
};

export const createContent = async (formData) => {
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateContent = async (id, formData) => {
  // Convert FormData to JSON for update
  const data = {};
  formData.forEach((value, key) => {
    if (!(value instanceof File)) {
      data[key] = value;
    }
  });
  const response = await axios.put(`${API_URL}/content/item/${id}`, data);
  return response.data;
};

export const deleteContent = async (id) => {
  const response = await axios.delete(`${API_URL}/content/item/${id}`);
  return response.data;
};
