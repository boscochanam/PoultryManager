import { NextResponse } from 'next/server';
import { financeData } from "@/lib/financeData";

async function fetchFinanceData() {
    return financeData; 
}

export async function GET(request: Request) {
    try {
        const financeData = await fetchFinanceData();
        return NextResponse.json(financeData);
    } catch (error) {
        console.error('Failed to fetch finance data:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}