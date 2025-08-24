import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nominee_id, voter_name } = body;
        
        if (!nominee_id) {
            return NextResponse.json(
                { 
                    status: "error", 
                    errors: { nominee_id: ["Nominee ID is required"] }
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
                voter_name: voter_name || "Anonymous Voter"
            })
        });

        const contentType = response.headers.get("content-type");

        if (contentType?.includes("application/json")) {
            // ✅ Backend returned JSON
            const data = await response.json();

            if (!response.ok) {
                return NextResponse.json(data, { status: response.status });
            }

            return NextResponse.json(data);
        } else {
            // ❌ Backend returned HTML or something else
            const errorHtml = await response.text();
            console.error("Backend returned HTML error:\n", errorHtml);

            // Don’t return the HTML to the client
            return NextResponse.json(
                { 
                    status: "error", 
                    message: "Unexpected response from backend. Full HTML logged to server console." 
                },
                { status: 500 }
            );
        }
        
    } catch (error) {
        console.error('Error initiating vote:', error);
        return NextResponse.json(
            { 
                status: "error", 
                message: "Internal server error" 
            },
            { status: 500 }
        );
    }
}
