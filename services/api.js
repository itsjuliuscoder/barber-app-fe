import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
});

const APIHeaders = (token) => ({
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

// Auth APIs
export const login = async (email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'An error occurred';
    }
};

export const logout = async (token) => {
    try {
        const response = await API.post('/auth/logout', { token });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'An error occurred';
    }
};

export const getAllSales = async (token) => {

}

export const getSalesById = async (id, token) => {

}

export const getAllUsers = async (token) => {

}

export const addUser = async (user, token) => {
    
    try {
        const response = await API.post('/user/add-user', user);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'An error occurred';
    }

}

export const updateUser = async (user, token) => {

}

export const addNewInventory = async (itemDetails, token) => {
    try {

        const response = await APIHeaders.post('/user/add-inventory', body);
        return response.data;
    } catch(error){
        throw error.response?.data || 'An error occured!';

    }
}
