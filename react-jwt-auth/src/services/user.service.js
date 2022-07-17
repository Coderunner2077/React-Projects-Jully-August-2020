import axios from 'axios';
import authHeader from './auth-header';

const API_URI = 'http://localhost:8080/api/test/';

class UserService {
    getPublicContent() {
        return axios.get(API_URI + 'all');
    }

    getUserContent() {
        return axios.get(API_URI + 'user', { headers: authHeader() });
    }

    getModeratorContent() {
        return axios.get(API_URI + 'moderator', { headers: authHeader() });
    }

    getAdminContent() {
        return axios.get(API_URI + 'admin', { headers: authHeader() });
    }
}

export default new UserService();