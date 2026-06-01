import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/src/6_shared/auth/config';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized: No session found' },
        { status: 401 }
      );
    }

    const email = session.user.email;
    console.log('Fetching bids for authenticated user:', email);

    const apiToken = process.env.STRAPI_API_TOKEN;

    if (!apiToken) {
      console.error('STRAPI_API_TOKEN is not defined in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Missing API Token' },
        { status: 500 }
      );
    }

    // Fetch bids from Strapi using API token
    const strapiResponse = await fetch(
      `${process.env.BACK_URL}/api/bids?sort=createdAt:desc&populate=*&filters[users_permissions_user][$eq]=${email}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`,
        },
        cache: 'no-store'
      }
    );

    console.log('Strapi bids fetch response status:', strapiResponse.status);

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      console.error('Strapi bids fetch error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || errorData.message || 'Bids fetch failed' },
        { status: strapiResponse.status }
      );
    }

    const result = await strapiResponse.json();
    
    // Handle both transformed and untransformed responses
    const finalData = result.data || result;

    return NextResponse.json({
      success: true,
      data: finalData,
    });
  } catch (error) {
    console.error('Bids fetch error:', error);
    return NextResponse.json(
      { error: 'Bids fetch failed' },
      { status: 500 }
    );
  }
}
