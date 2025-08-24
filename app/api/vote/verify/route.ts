import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { reference } = body;
        
        if (!reference) {
            return NextResponse.json(
                { 
                    status: "error", 
                    message: "Reference is required" 
                },
                { status: 400 }
            );
        }
        
        const apiUrl = `${BASE_URL}/vote/verify/`;
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reference })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }
        
        return NextResponse.json(data);
        
    } catch (error) {
        console.error('Error verifying vote:', error);
        return NextResponse.json(
            { 
                status: "error", 
                message: "Internal server error" 
            },
            { status: 500 }
        );
    }
}