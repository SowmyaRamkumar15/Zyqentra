import axios from 'axios';

const API_URL = 'http://localhost:8080/api/interview-feedbacks';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

const FeedbackService = {
  getAll: async () => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getHeaders());
    return response.data;
  },

  getByApplicationId: async (appId) => {
    const response = await axios.get(`${API_URL}/application/${appId}`, getHeaders());
    return response.data;
  },

  create: async (feedback) => {
    const response = await axios.post(API_URL, feedback, getHeaders());
    return response.data;
  },

  update: async (id, feedback) => {
    const response = await axios.put(`${API_URL}/${id}`, feedback, getHeaders());
    return response.data;
  }
};

export default FeedbackService;
