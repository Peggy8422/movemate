import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileBottomNavTabs from '@/components/mobile-bottom-nav-tabs';

// Mock UI components
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }: any) => <button onClick={onClick} {...props}>{children}</button>,
}));

jest.mock("@/components/ui/drawer", () => {
  return {
    Drawer: ({ children }: any) => <div data-testid="drawer">{children}</div>,
    DrawerTrigger: ({ children }: any) => <div data-testid="drawer-trigger">{children}</div>,
    DrawerContent: ({ children }: any) => <div data-testid="drawer-content">{children}</div>,
    DrawerHeader: ({ children }: any) => <div>{children}</div>,
    DrawerTitle: ({ children }: any) => <div>{children}</div>,
    DrawerFooter: ({ children }: any) => <div>{children}</div>,
    DrawerClose: ({ children }: any) => <div>{children}</div>,
  };
});

// Mock child components
jest.mock("@/components/friend-list-item", () => () => <div data-testid="friend-item">Friend</div>);
jest.mock("@/components/community-list-item", () => () => <div data-testid="community-item">Community</div>);


describe('MobileBottomNavTabs', () => {
  it('renders triggers', () => {
    render(<MobileBottomNavTabs />);
    expect(screen.getByText('好友')).toBeInTheDocument();
    // '你的社群' appears in both button and title.
    expect(screen.getAllByText('你的社群').length).toBeGreaterThan(0);
  });

  it('defaults to community content visible initially', () => {
    render(<MobileBottomNavTabs />);
    // Initial state is empty string, which renders Community list items in the ELSE block
    expect(screen.getAllByTestId('community-item').length).toBeGreaterThan(0);
  });

  it('switches to friends tab when clicked', () => {
    render(<MobileBottomNavTabs />);

    // Find the button that sets activeTab to 'friends'
    const friendsButton = screen.getByText('好友');
    fireEvent.click(friendsButton);

    // Check content
    expect(screen.getAllByTestId('friend-item').length).toBeGreaterThan(0);
    expect(screen.queryByTestId('community-item')).not.toBeInTheDocument();
  });

  it('switches to communities tab when clicked', () => {
    render(<MobileBottomNavTabs />);

    // First switch to friends
    fireEvent.click(screen.getByText('好友'));
    // Use getAllByTestId for checking existence when multiple are expected
    expect(screen.getAllByTestId('friend-item').length).toBeGreaterThan(0);

    // Then switch back to communities
    // There are multiple "你的社群" texts (button and title).
    // We want the button. The button is a button element.
    const buttons = screen.getAllByText('你的社群');
    // We assume the first one might be the button because buttons come before content in this layout?
    // Actually, in the code: Buttons are in DrawerTriggers which are before DrawerContent.
    // Let's filter by tag if needed, or just click the first one.

    // Better: finding the button specifically.
    const communityButton = buttons.find(el => el.tagName === 'BUTTON');
    if (communityButton) {
        fireEvent.click(communityButton);
    } else {
        // Fallback or fail
        fireEvent.click(buttons[0]);
    }

    expect(screen.getAllByTestId('community-item').length).toBeGreaterThan(0);
    expect(screen.queryByTestId('friend-item')).not.toBeInTheDocument();
  });
});
