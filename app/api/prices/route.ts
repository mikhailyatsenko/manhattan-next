import { NextResponse } from 'next/server';
import { fetchPrices } from '@/lib/googleSheets';

// Use Edge Runtime for faster cold starts on Vercel
export const runtime = 'nodejs';

// Enable caching with revalidation
export const revalidate = 300; // Revalidate every 5 minutes (300 seconds)

export async function GET() {
  try {
    const prices = await fetchPrices();
    
    // Set cache headers for Vercel Edge Network
    // s-maxage: cache on Vercel's edge for 5 minutes
    // stale-while-revalidate: serve stale content while revalidating for up to 1 hour
    return NextResponse.json(prices, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
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
