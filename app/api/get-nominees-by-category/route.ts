import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('category_id');
        
        if (!categoryId) {
            return NextResponse.json(
                { error: 'Category ID is required' },
                { status: 400 }
            );
        }
        
        const apiUrl = `${BASE_URL}/categories/${categoryId}/nominees/`;
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            console.log("failed to fetch nominees for category id in route:", categoryId);
            return NextResponse.json(
                { error: `Failed to fetch nominees: ${response.statusText}` },
                { status: response.status }
            );
        }
        
        const data = await response.json();
        return NextResponse.json(data);
        
    } catch (error) {
        console.error('Error fetching nominees:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}