import apiClient from "../utils/api-client";

export function sendOrderRequest(orderData) {
    return apiClient.post('/orders', orderData)
}

export function getPendingOrders() {
    return apiClient.get('/orders/pending');
}

export function getActiveOrders() {
    return apiClient.get('/orders/active');
}

export function cancelOrder(orderId){
    return apiClient.patch(`/orders/${orderId}/cancel`);
}

export function markOrderItemAsDone(orderItemId){
    return apiClient.patch(`order-items/${orderItemId}/done`)
}

export function pay(orderId){
    return apiClient.patch(`/orders/${orderId}/pay`);
}