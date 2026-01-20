import React from 'react';
import { render, screen } from '@testing-library/react';
import SocialListComp from '@/components/social-list';
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/components/mobile-bottom-nav-tabs", () => () => <div data-testid="mobile-bottom-nav">Mobile Nav</div>);
jest.mock("@/components/friend-list-item", () => () => <div data-testid="friend-item">Friend</div>);
jest.mock("@/components/community-list-item", () => () => <div data-testid="community-item">Community</div>);

describe('SocialListComp', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders correctly on default route', () => {
    render(<SocialListComp />);

    // Check for "好友" and "你的社群" headings in the desktop view
    expect(screen.getByText('好友')).toBeInTheDocument();
    expect(screen.getByText('你的社群')).toBeInTheDocument();

    // Check for chat room footer
    expect(screen.getByText('聊天室')).toBeInTheDocument();

    // Check for mobile nav
    expect(screen.getByTestId('mobile-bottom-nav')).toBeInTheDocument();
  });

  it('does not render on preference flow route', () => {
    (usePathname as jest.Mock).mockReturnValue('/preferance-flow');
    const { container } = render(<SocialListComp />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders friend list items', () => {
    render(<SocialListComp />);
    expect(screen.getAllByTestId('friend-item').length).toBeGreaterThan(0);
  });

  it('renders community list items', () => {
    render(<SocialListComp />);
    expect(screen.getAllByTestId('community-item').length).toBeGreaterThan(0);
  });
});
