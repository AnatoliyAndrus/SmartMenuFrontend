import apiClient from "../utils/api-client";

export function getAllReviews(){
    return apiClient.get('/reviews');
}

export function addReview(review) {
    return apiClient.post('/reviews', review);
}