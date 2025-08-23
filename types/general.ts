export interface NavLink {
    label: string;
    href: string;
    ariaLabel?: string;
}
export interface NavLink {
    label: string;
    href: string;
    ariaLabel?: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    voting_price: string;
    is_voting_open: boolean;
    nominee_count: number;
}

export interface Nominee {
    id: number;
    name: string;
    description: string;
    photo: string | null;
    vote_count: number;
    total_amount_raised: string;
    category_id: number;
}

export interface CategoryDetails extends Category {
    voting_starts: string;
    voting_ends: string;
    nominees: Nominee[];
}

export interface ApiResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface VotingStats {
    totalVotes: number;
    totalAmount: string;
    activeCategories: number;
}