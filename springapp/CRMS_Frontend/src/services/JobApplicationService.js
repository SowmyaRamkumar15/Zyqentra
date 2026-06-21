import api from '../utils/api';

const JobApplicationService = {
    getAll: async () => {
        const response = await api.get('/job-applications');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/job-applications/${id}`);
        return response.data;
    },
    create: async (application) => {
        const response = await api.post('/job-applications', application);
        return response.data;
    },
    update: async (id, application) => {
        const response = await api.put(`/job-applications/${id}`, application);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`/job-applications/${id}`);
    }
};

export default JobApplicationService;
