import apiClient from "../utils/api-client";

export function getAllMenuItems() {
    return apiClient.get("menu-items");
}

export function deleteMenuItem(itemId){
    return apiClient.delete(`menu-items/${itemId}`);
}

export function editMenuItem(editItem){
    return apiClient.patch(`menu-items/${editItem.menuItemId}`, editItem);
}

export function addMenuItem(newItem){
    return apiClient.post(`menu-items`, newItem);
}