import apiClient from "../utils/api-client";

export function getAllUsers(){
    return apiClient.get('/users');
}

export function addUser(userData) {
    return apiClient.post('/users', userData);
}

export function editUser(editedUserData) {
    return apiClient.patch(`/users/${editedUserData.userId}`, editedUserData);
}

export function deleteUser(userId) {
    return apiClient.delete(`/users/${userId}`);
}