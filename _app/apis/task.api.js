import axios from "axios";

const API_URL = 'http://10.0.2.2:3000/tasks/';

export const fetchTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response;
    } catch (error) {
        throw new Error('Failed to fetch');
    }
};

export const addTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response;
    } catch (error) {
        throw new Error('Failed to add task.');
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}${id}`);
        return response;
    } catch (error) {
        throw new Error('Failed to delete task')
    }
}
