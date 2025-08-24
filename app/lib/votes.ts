import { BASE_URL, API_ENDPOINTS } from "@/data/constants";
import { Category, CategoryDetails, Nominee, ApiResponse, VotingResults } from "@/types/general";

// Error class for API errors
class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public statusText: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Generic fetch wrapper with error handling
async function apiFetch<T>(endpoint: string): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Add cache control for server components
            cache: 'no-store', // Use 'force-cache' for static data or 'no-store' for dynamic data
        });

        if (!response.ok) {
            throw new ApiError(
                `API request failed: ${response.statusText}`,
                response.status,
                response.statusText
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        // Handle network errors or JSON parsing errors
        throw new ApiError(
            `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            0,
            'Network Error'
        );
    }
}

/**
 * Get list of all categories
 * @returns Promise<ApiResponse<Category>>
 */
export const getCategories = async (): Promise<ApiResponse<Category>> => {
    try {
        const data = await apiFetch<ApiResponse<Category>>(API_ENDPOINTS.CATEGORIES);
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

/**
 * Get category details by ID
 * @param id - Category ID
 * @returns Promise<CategoryDetails>
 */
export const getCategoryDetails = async (id: number): Promise<CategoryDetails> => {
    try {
        const data = await apiFetch<CategoryDetails>(API_ENDPOINTS.CATEGORY_DETAILS(id));
        return data;
    } catch (error) {
        console.error(`Error fetching category details for ID ${id}:`, error);
        throw error;
    }
};

/**
 * Get nominees by category ID
 * @param categoryId - Category ID
 * @returns Promise<ApiResponse<Nominee>>
 */
export const getNomineesByCategory = async (categoryId: number): Promise<ApiResponse<Nominee>> => {
    try {
        const data = await apiFetch<ApiResponse<Nominee>>(API_ENDPOINTS.CATEGORY_NOMINEES(categoryId));
        return data;
    } catch (error) {
        console.error(`Error fetching nominees for category ${categoryId}:`, error);
        throw error;
    }
};

/**
 * Get voting results for a category
 * @param categoryId - Category ID
 * @returns Promise<VotingResults>
 */
export const getVotingResults = async (categoryId: number): Promise<VotingResults> => {
    try {
        const data = await apiFetch<VotingResults>(API_ENDPOINTS.VOTING_RESULTS(categoryId));
        return data;
    } catch (error) {
        console.error(`Error fetching voting results for category ${categoryId}:`, error);
        throw error;
    }
};

/**
 * Get all nominees across all categories
 * @returns Promise<Nominee[]>
 */
export const getAllNominees = async (): Promise<Nominee[]> => {
    try {
        // First get all categories
        const categoriesResponse = await getCategories();
        const categories = categoriesResponse.results;

        // Then get nominees for each category
        const nomineesPromises = categories.map(category =>
            getNomineesByCategory(category.id)
        );

        const nomineesResponses = await Promise.all(nomineesPromises);

        // Flatten all nominees into a single array
        const allNominees = nomineesResponses.reduce((acc, response) => {
            return [...acc, ...response.results];
        }, [] as Nominee[]);

        return allNominees;
    } catch (error) {
        console.error('Error fetching all nominees:', error);
        throw error;
    }
};

export const getCategoryWithNominees = async (categoryId: number): Promise<CategoryDetails> => {
    try {
        // Get category details and nominees in parallel for better performance
        const [categoryDetails, nomineesResponse] = await Promise.all([
            getCategoryDetails(categoryId),
            getNomineesByCategory(categoryId)
        ]);

        // Combine the data
        return {
            ...categoryDetails,
            nominees: nomineesResponse.results
        };
    } catch (error) {
        console.error(`Error fetching category with nominees for ID ${categoryId}:`, error);
        throw error;
    }
};