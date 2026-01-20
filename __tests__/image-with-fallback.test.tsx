import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageWithFallback from '@/components/image-with-fallback';

describe('ImageWithFallback', () => {
  it('renders the image with the src initially', () => {
    const src = '/test-image.jpg';
    const fallbackSrc = '/fallback-image.jpg';
    const alt = 'Test Image';

    // Added width and height as they are required by next/image
    render(<ImageWithFallback src={src} fallbackSrc={fallbackSrc} alt={alt} width={100} height={100} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('test-image.jpg'));
    expect(image).toHaveAttribute('alt', alt);
  });

  it('switches to fallback source on error', () => {
    const src = '/broken-image.jpg';
    const fallbackSrc = '/fallback-image.jpg';
    const alt = 'Test Image';

    // Added width and height as they are required by next/image
    render(<ImageWithFallback src={src} fallbackSrc={fallbackSrc} alt={alt} width={100} height={100} />);

    const image = screen.getByRole('img');
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', expect.stringContaining('fallback-image.jpg'));
  });
});
