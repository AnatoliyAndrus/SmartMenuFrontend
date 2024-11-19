import apiClient from "../utils/api-client";

export async function getAllWaiters() {
    return apiClient.get('waiters');
}

export async function addWaiter(waiterData) {
    return apiClient.post('waiters', waiterData);
}

export async function editWaiter(waiterData) {
    return apiClient.patch(`waiters/${waiterData.waiterId}`, waiterData);
}

export async function deleteWaiter(waiterId) {
    return apiClient.delete(`waiters/${waiterId}`);
}

