import api from '../utils/api';

const JobService = {
    getAll: async () => {
        const response = await api.get('/job-positions');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/job-positions/${id}`);
        return response.data;
    },
    create: async (job) => {
        const response = await api.post('/job-positions', job);
        return response.data;
    },
    update: async (id, job) => {
        const response = await api.put(`/job-positions/${id}`, job);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`/job-positions/${id}`);
    },
    search: async (keyword) => {
        const response = await api.get(`/job-positions/search/${keyword}`);
        return response.data;
    }
};

export default JobService;
