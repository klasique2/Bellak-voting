import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nominee_id, number_of_votes, voter_name } = body;
        
        // Validate required fields
        if (!nominee_id) {
            return NextResponse.json(
                { 
                    status: "error", 
                    errors: { nominee_id: ["Nominee ID is required"] }
                },
                { status: 400 }
            );
        }

        // Validate number_of_votes
        if (!number_of_votes || typeof number_of_votes !== 'number' || number_of_votes < 1) {
            return NextResponse.json(
                { 
                    status: "error", 
                    errors: { number_of_votes: ["Number of votes must be a positive number"] }
                },
                { status: 400 }
            );
        }

        // Additional validation for reasonable vote limits
        if (number_of_votes > 999) {
            return NextResponse.json(
                { 
                    status: "error", 
                    errors: { number_of_votes: ["Number of votes cannot exceed 999"] }
                },
                { status: 400 }
            );
        }
        
        const apiUrl = `${BASE_URL}/vote/initiate/`;
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nominee_id,
                number_of_votes, // Pass the dynamic number of votes
                voter_name: voter_name || "Anonymous Voter"
            })
        });

        const contentType = response.headers.get("content-type");
        
        if (contentType?.includes("application/json")) {
            // ✅ Backend returned JSON
            const data = await response.json();
            
            if (!response.ok) {
                console.error('Backend API error:', data);
                return NextResponse.json(data, { status: response.status });
            }
            
            console.log('Vote initiation successful:', data);
            return NextResponse.json(data);
        } else {
            // ❌ Backend returned HTML or something else
            const errorHtml = await response.text();
            console.error("Backend returned non-JSON response:", {
                status: response.status,
                statusText: response.statusText,
                contentType,
                body: errorHtml.substring(0, 500) // Log first 500 chars
            });
            
            // Don't return the HTML to the client
            return NextResponse.json(
                { 
                    status: "error", 
                    message: `Backend returned ${response.status} error. Check server logs for details.`,
                    errors: {
                        backend: [`Backend API returned ${response.status}: ${response.statusText}`]
                    }
                },
                { status: 500 }
            );
        }
        
    } catch (error) {
        console.error('Error initiating vote:', error);
        
        // Handle different types of errors
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { 
                    status: "error", 
                    message: "Invalid JSON in request body",
                    errors: { body: ["Request body must be valid JSON"] }
                },
                { status: 400 }
            );
        }
        
        if (error instanceof TypeError && error.message.includes('fetch')) {
            return NextResponse.json(
                { 
                    status: "error", 
                    message: "Failed to connect to backend API",
                    errors: { backend: ["Unable to reach the voting service"] }
                },
                { status: 503 }
            );
        }
        
        return NextResponse.json(
            { 
                status: "error", 
                message: "Internal server error",
                errors: { server: ["An unexpected error occurred"] }
            },
            { status: 500 }
        );
    }
}