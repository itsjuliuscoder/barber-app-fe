import axios from 'axios';

const API = axios.create({
    baseURL: 'https://barber-app-be.onrender.com/api',
    headers: { 'Content-Type': 'application/json' },
});

const getToken = () => {
    const token = localStorage.getItem('accessToken');
    return token;
}

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

export const getAllSales = async () => {

    try {
        const response = await API.get('/sales', APIHeaders(getToken()));
        return response.data;
    } catch (error) {
        throw error.response?.data || 'An error occurred';
    }

}

export const getAllInventories = async () => {

    try {
        const response = await API.get('/inventory', APIHeaders(getToken()));
        return response.data;
    } catch (error) {
        throw error.response?.data || 'An error occurred';
    }

}

export const getSalesById = async (id, token) => {

}

export const getAllUsers = async (token) => {
    try {
        const response = await API.get('/users', APIHeaders(getToken()));
        return response.data;
    } catch (error) {
        throw error.response?.data || 'An error occurred';
    }
}

export const addNewUser = async (user) => {
    
    try {
        const response = await API.post('/users/add-user', user);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'An error occurred';
    }

}

export const addSales = async (salesData) => {
    
    try {
        const response = await API.post('/sales', salesData);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'An error occurred';
    }

}

export const updateUser = async (user, token) => {

}

export const addNewInventory = async (itemDetails) => {
    try {

        const response = await API.post('/inventory/add_inventory', itemDetails);
        return response.data;
    } catch(error){
        throw error.response?.data || 'An error occured!';

    }
}

export const updateInventory = async (itemDetails) => {
    try {

        itemDetails = {
            ...itemDetails
        }

        const response = await API.put(`/inventory/${itemDetails.id}`, itemDetails);
        return response.data;
    } catch(error){
        throw error.response?.data || 'An error occured!';
    }
}