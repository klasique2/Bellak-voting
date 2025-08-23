import { Category, Nominee, CategoryDetails, ApiResponse, VotingStats } from '@/types/general';

export const categories: Category[] = [
    {
        id: 1,
        name: "Most Influential Student of the Year",
        description: "Award for the most influential student who has made a significant impact on campus life",
        voting_price: "5.00",
        is_voting_open: true,
        nominee_count: 8
    },
    {
        id: 2,
        name: "Most Eloquent Student of the Year",
        description: "Award for eloquence and public speaking excellence",
        voting_price: "3.00",
        is_voting_open: true,
        nominee_count: 6
    },
    {
        id: 3,
        name: "Best Academic Performance",
        description: "Recognizing outstanding academic achievement and dedication to studies",
        voting_price: "4.00",
        is_voting_open: true,
        nominee_count: 7
    },
    {
        id: 4,
        name: "Sports Personality of the Year",
        description: "Celebrating athletic excellence and sportsmanship",
        voting_price: "3.50",
        is_voting_open: true,
        nominee_count: 5
    },
    {
        id: 5,
        name: "Most Creative Student",
        description: "Honoring innovation, creativity, and artistic expression",
        voting_price: "4.50",
        is_voting_open: false,
        nominee_count: 9
    },
    {
        id: 6,
        name: "Community Service Champion",
        description: "Recognizing outstanding community service and volunteer work",
        voting_price: "5.50",
        is_voting_open: true,
        nominee_count: 4
    }
];

export const nominees: Nominee[] = [
    // Most Influential Student nominees (category 1)
    {
        id: 1,
        name: "Sarah Johnson",
        description: "Computer Science student, Student Union President, Tech Club Founder",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b0e6400c?w=400&h=400&fit=crop&crop=face",
        vote_count: 45,
        total_amount_raised: "225.00",
        category_id: 1
    },
    {
        id: 2,
        name: "Michael Chen",
        description: "Business Administration student, Entrepreneur Club Leader",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        vote_count: 38,
        total_amount_raised: "190.00",
        category_id: 1
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        description: "Environmental Science major, Climate Action Committee Chair",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        vote_count: 52,
        total_amount_raised: "260.00",
        category_id: 1
    },
    {
        id: 4,
        name: "David Kim",
        description: "Political Science student, Model UN Secretary General",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        vote_count: 29,
        total_amount_raised: "145.00",
        category_id: 1
    },
    {
        id: 5,
        name: "Jessica Taylor",
        description: "Psychology major, Peer Counseling Program Director",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        vote_count: 41,
        total_amount_raised: "205.00",
        category_id: 1
    },
    {
        id: 6,
        name: "Alex Thompson",
        description: "Engineering student, Innovation Lab Coordinator",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        vote_count: 33,
        total_amount_raised: "165.00",
        category_id: 1
    },

    // Most Eloquent Student nominees (category 2)
    {
        id: 7,
        name: "Olivia Martinez",
        description: "Law student, Debate Club Captain, Moot Court Champion",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        vote_count: 67,
        total_amount_raised: "201.00",
        category_id: 2
    },
    {
        id: 8,
        name: "James Wilson",
        description: "Literature major, Poetry Society President",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
        vote_count: 54,
        total_amount_raised: "162.00",
        category_id: 2
    },
    {
        id: 9,
        name: "Sophia Brown",
        description: "Communications student, Campus Radio Host",
        photo: "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=400&h=400&fit=crop&crop=face",
        vote_count: 42,
        total_amount_raised: "126.00",
        category_id: 2
    },
    {
        id: 10,
        name: "Marcus Davis",
        description: "Philosophy major, Ethics Club Founder",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
        vote_count: 36,
        total_amount_raised: "108.00",
        category_id: 2
    },

    // Best Academic Performance nominees (category 3)
    {
        id: 11,
        name: "Isabella Lee",
        description: "Mathematics major, Research Assistant, Dean's List",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
        vote_count: 58,
        total_amount_raised: "232.00",
        category_id: 3
    },
    {
        id: 12,
        name: "Ryan O'Connor",
        description: "Physics student, Published Researcher, Honors Program",
        photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
        vote_count: 47,
        total_amount_raised: "188.00",
        category_id: 3
    },
    {
        id: 13,
        name: "Chloe Anderson",
        description: "Chemistry major, Lab Teaching Assistant, Summa Cum Laude",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
        vote_count: 51,
        total_amount_raised: "204.00",
        category_id: 3
    },

    // Sports Personality nominees (category 4)
    {
        id: 14,
        name: "Tyler Jackson",
        description: "Varsity Basketball Captain, Athletic Scholarship Recipient",
        photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face",
        vote_count: 73,
        total_amount_raised: "255.50",
        category_id: 4
    },
    {
        id: 15,
        name: "Maya Patel",
        description: "Track and Field Star, Olympic Trials Qualifier",
        photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
        vote_count: 65,
        total_amount_raised: "227.50",
        category_id: 4
    },

    // Community Service Champion nominees (category 6)
    {
        id: 16,
        name: "Grace Williams",
        description: "Social Work major, Local Shelter Volunteer Coordinator",
        photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
        vote_count: 89,
        total_amount_raised: "489.50",
        category_id: 6
    },
    {
        id: 17,
        name: "Nathan Brooks",
        description: "Education student, Literacy Program Director",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
        vote_count: 76,
        total_amount_raised: "418.00",
        category_id: 6
    },
];

export const votingStats: VotingStats = {
    totalVotes: nominees.reduce((sum, nominee) => sum + nominee.vote_count, 0),
    totalAmount: nominees.reduce((sum, nominee) => sum + parseFloat(nominee.total_amount_raised), 0).toFixed(2),
    activeCategories: categories.filter(cat => cat.is_voting_open).length
};

// API Response examples using the ApiResponse type
export const categoriesApiResponse: ApiResponse<Category> = {
    count: categories.length,
    next: null,
    previous: null,
    results: categories
};

export const nomineesApiResponse: ApiResponse<Nominee> = {
    count: nominees.length,
    next: null,
    previous: null,
    results: nominees
};

// Category Details examples using CategoryDetails type
export const categoryDetails: CategoryDetails[] = [
    {
        id: 1,
        name: "Most Influential Student of the Year",
        description: "Award for the most influential student who has made a significant impact on campus life",
        voting_price: "5.00",
        is_voting_open: true,
        nominee_count: 6,
        voting_starts: "2025-01-01T00:00:00Z",
        voting_ends: "2025-03-01T23:59:59Z",
        nominees: nominees.filter(n => n.category_id === 1)
    },
    {
        id: 2,
        name: "Most Eloquent Student of the Year",
        description: "Award for eloquence and public speaking excellence",
        voting_price: "3.00",
        is_voting_open: true,
        nominee_count: 4,
        voting_starts: "2025-01-01T00:00:00Z",
        voting_ends: "2025-03-01T23:59:59Z",
        nominees: nominees.filter(n => n.category_id === 2)
    },
    {
        id: 3,
        name: "Best Academic Performance",
        description: "Recognizing outstanding academic achievement and dedication to studies",
        voting_price: "4.00",
        is_voting_open: true,
        nominee_count: 3,
        voting_starts: "2025-01-01T00:00:00Z",
        voting_ends: "2025-03-01T23:59:59Z",
        nominees: nominees.filter(n => n.category_id === 3)
    }
];

// Helper function to get nominees by category (simulating API call)
export const getNomineesByCategory = (categoryId: number | null): Nominee[] => {
    if (categoryId === null) return nominees;
    return nominees.filter(nominee => nominee.category_id === categoryId);
};

// Helper function to get nominees by category with API response format
export const getNomineesByCategoryApi = (categoryId: number): ApiResponse<Nominee> => {
    const filteredNominees = nominees.filter(nominee => nominee.category_id === categoryId);
    return {
        count: filteredNominees.length,
        next: null,
        previous: null,
        results: filteredNominees
    };
};

// Helper function to get category by id
export const getCategoryById = (id: number): Category | undefined => {
    return categories.find(category => category.id === id);
};

// Helper function to get category details by id
export const getCategoryDetailsById = (id: number): CategoryDetails | undefined => {
    return categoryDetails.find(category => category.id === id);
};