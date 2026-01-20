import React from 'react';
import { render, screen } from '@testing-library/react';
import RankingCardItem from '@/components/ranking-card-item';

describe('RankingCardItem', () => {
  // Since the component currently has hardcoded values, we just test that they render.
  // In a real app, we would expect props, but for now we follow the existing code.

  // The component has an Image with an empty src, which causes an error in jsdom/next/image.
  // We can suppress the error or mock next/image, but suppression is better if we want to test default behavior.
  // However, next/image with empty src is technically invalid.
  // Let's mock next/image for this test file specifically to avoid the error logging, or just ignore it.

  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = (...args) => {
      if (/Image is missing required "src" property/.test(args[0])) {
        return;
      }
      originalConsoleError(...args);
    };
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('renders the hardcoded gym name', () => {
    render(<RankingCardItem />);
    expect(screen.getByText('健身房名稱')).toBeInTheDocument();
  });

  it('renders the ranking', () => {
    render(<RankingCardItem />);
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('renders the phone number', () => {
    render(<RankingCardItem />);
    expect(screen.getByText(/0912345678/)).toBeInTheDocument();
  });

  it('renders the address', () => {
    render(<RankingCardItem />);
    expect(screen.getByText(/台北市中山區.../)).toBeInTheDocument();
  });
});
