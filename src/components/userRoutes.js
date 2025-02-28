import React from "react";


const API = "";

export const getUsers = async () => {
    const response = await axios.get(`${API}/allUsers`);
    return response.data;
};

export const getUserById = async () => {
    const response = await axios.get(`${API}/:id`);
    return response.data;
};

export const addUser = async () => {
    const response = await axios.post(`${API}/addUser`);
    return response.data;
};

export const updateUser = async (id) => {
    const response = await axios.put(`${API}/:id`);
    return response.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${API}/:id`);
};



