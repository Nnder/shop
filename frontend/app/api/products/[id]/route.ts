import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productData = await request.json();
    const id = params.id;

    console.log('Updating product:', id, 'with data:', JSON.stringify(productData, null, 2));

    const apiToken = process.env.STRAPI_API_TOKEN;

    if (!apiToken) {
      console.error('STRAPI_API_TOKEN is not defined in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Missing API Token' },
        { status: 500 }
      );
    }

    // Update product in Strapi using API token
    const strapiResponse = await fetch(`${process.env.BACK_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ data: productData }),
    });

    console.log('Strapi product update response status:', strapiResponse.status);

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      console.error('Strapi product update error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || errorData.message || 'Product update failed' },
        { status: strapiResponse.status }
      );
    }

    const result = await strapiResponse.json();
    console.log('Strapi product update result:', JSON.stringify(result, null, 2));

    // Handle both transformed and untransformed responses
    const finalData = result.data || result;

    return NextResponse.json({
      success: true,
      data: finalData,
    });
  } catch (error) {
    console.error('Product update error:', error);
    return NextResponse.json(
      { error: 'Product update failed' },
      { status: 500 }
    );
  }
}
