export const BASE_URL = "https://superapi.freecomx.com/api/v1"

export const API_ENDPOINTS = {
    // GET
    CATEGORIES: '/categories/',
    CATEGORY_DETAILS: (id: number) => `/categories/${id}/`,
    CATEGORY_NOMINEES: (categoryId: number) => `/categories/${categoryId}/nominees/`,
    VOTING_RESULTS: (categoryId: number) => `/categories/${categoryId}/results/`,
} as const;