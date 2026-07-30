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
    const contentLength = res.headers.get('content-length');

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400',
    };

    if (contentLength) {
      headers['Content-Length'] = contentLength;
    }

    return new NextResponse(res.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    return new NextResponse(`Error fetching image: ${(error as Error).message}`, {
      status: 500,
    });
  }
}
