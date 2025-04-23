import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing `url` query parameter', { status: 400 });
  }

  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      return new NextResponse(`Failed to fetch image: ${res.statusText}`, {
        status: res.status,
      });
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const imageBuffer = await res.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    return new NextResponse(`Error fetching image: ${(error as Error).message}`, {
      status: 500,
    });
  }
}
