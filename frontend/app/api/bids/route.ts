import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/src/6_shared/auth/config';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    const bidData = await request.json();

    // Securely set the user email from session if authenticated
    if (session?.user?.email) {
      bidData.users_permissions_user = session.user.email;
    }

    console.log('Bid data being sent to Strapi:', JSON.stringify(bidData, null, 2));

    const apiToken = process.env.STRAPI_API_TOKEN;

    if (!apiToken) {
      console.error('STRAPI_API_TOKEN is not defined in environment variables');
      // If token is missing, we can't proceed with authenticated Strapi call
      return NextResponse.json(
        { error: 'Server configuration error: Missing API Token' },
        { status: 500 }
      );
    }

    // Create bid in Strapi using API token
    const strapiResponse = await fetch(`${process.env.BACK_URL}/api/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ data: bidData }),
    });

    console.log('Strapi bid creation response status:', strapiResponse.status);

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      console.error('Strapi bid creation error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || errorData.message || 'Bid creation failed' },
        { status: strapiResponse.status }
      );
    }

    const result = await strapiResponse.json();
    console.log('Strapi bid creation result:', JSON.stringify(result, null, 2));

    // Handle both transformed and untransformed responses
    const finalData = result.data || result;

    return NextResponse.json({
      success: true,
      data: finalData,
    });
  } catch (error) {
    console.error('Bid creation error:', error);
    return NextResponse.json(
      { error: 'Bid creation failed' },
      { status: 500 }
    );
  }
}
