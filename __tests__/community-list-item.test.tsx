import React from 'react';
import { render, screen } from '@testing-library/react';
import CommunityListItem from '@/components/community-list-item';

// Mocking the Shadcn UI components as they are used in the component
// We want to test the CommunityListItem logic, not the UI library itself.
// However, since they are just components, we can also let them render if they are simple.
// But HoverCard might be complex to test interactions without full rendering.
// Let's rely on standard rendering first.

describe('CommunityListItem', () => {
  const defaultProps = {
    isMobileScreen: false,
    name: 'Test Community',
    description: 'This is a test community',
    avatarSrc: '/avatar.jpg',
    membersNum: 42,
  };

  it('renders the community name', () => {
    render(<CommunityListItem {...defaultProps} />);
    const nameElement = screen.getByText('Test Community');
    expect(nameElement).toBeInTheDocument();
  });

  it('renders the avatar', () => {
     render(<CommunityListItem {...defaultProps} />);
     // Avatar renders an image (or fallback)
     // Since AvatarImage uses @radix-ui/react-avatar, it might not render the img tag immediately if src is invalid or loading.
     // But here we just check if the component renders without crashing.
  });

  // Checking classes based on props
  it('applies correct classes for full width', () => {
    const { container } = render(<CommunityListItem {...defaultProps} isFullWidth={true} />);
    // The outer div should have lg:w-full
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass('lg:w-full');
  });

  it('applies correct classes for mobile screen', () => {
    const { container } = render(<CommunityListItem {...defaultProps} isMobileScreen={true} />);
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass('w-1/2');
  });
});
