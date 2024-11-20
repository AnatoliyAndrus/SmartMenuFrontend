import apiClient from "../utils/api-client"

export async function hasActiveOrder(tableId) {
    return apiClient.get(`tables/${tableId}/has-active-order`)
}

export async function getTableAmount(){
    return apiClient.get('tables').then(response => response.data.length )
}

export function addTable(){
    return apiClient.post('tables')   
}

export function removeTable(){
    return apiClient.delete('tables')
}

export function getActiveOrder(tableId){
    return apiClient.get(`tables/${tableId}/get-active-order`);
}