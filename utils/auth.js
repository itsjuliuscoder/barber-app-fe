import axios from 'axios';

const API_URL = 'http://localhost:5000/';

class AuthService {
  async login(email, password) {

    const endpoint = API_URL + `${api/auth/login}`

    try {
      const response = await axios.post(API_URL + 'api/auth/login', {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;