import { NextResponse } from 'next/server';
import { fetchPrices } from '@/lib/googleSheets';

export const dynamic = 'force-dynamic'; // Always fetch fresh data
export const runtime = 'nodejs';
export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
  try {
    const prices = await fetchPrices();
    
    return NextResponse.json(prices, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error in /api/prices:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    );
  }
}
