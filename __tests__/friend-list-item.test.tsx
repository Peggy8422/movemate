import React from 'react';
import { render, screen } from '@testing-library/react';
import FriendListItem from '@/components/friend-list-item';

describe('FriendListItem', () => {
  const defaultProps = {
    name: 'Friend Name',
    status: 'Playing Game',
    avatarSrc: '/friend-avatar.jpg',
    isOnline: true,
  };

  it('renders the friend name', () => {
    render(<FriendListItem {...defaultProps} />);
    expect(screen.getByText('Friend Name')).toBeInTheDocument();
  });

  it('renders the status', () => {
    render(<FriendListItem {...defaultProps} />);
    expect(screen.getByText('正在: Playing Game...')).toBeInTheDocument();
  });

  it('shows online indicator when isOnline is true', () => {
    const { container } = render(<FriendListItem {...defaultProps} isOnline={true} />);
    // Checking for the green dot
    // We can look for the class name
    const indicator = container.querySelector('.bg-green-500');
    expect(indicator).toBeInTheDocument();
  });

  it('shows offline indicator when isOnline is false', () => {
    const { container } = render(<FriendListItem {...defaultProps} isOnline={false} />);
    const indicator = container.querySelector('.bg-gray-500');
    expect(indicator).toBeInTheDocument();
  });
});
