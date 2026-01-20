import React from 'react';
import { render, screen } from '@testing-library/react';
import SidebarComp from '@/components/sidebar.tsx';
import { usePathname } from "next/navigation";

// Mock dependencies
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/public/movemate_logo.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg {...props} data-testid="brand-logo" />,
}));

// Mock Sidebar components from shadcn/ui
// Since they are complex, we mock them to render children or simple elements
jest.mock("@/components/ui/sidebar", () => ({
  Sidebar: ({ children, ...props }: any) => <div data-testid="sidebar" {...props}>{children}</div>,
  SidebarContent: ({ children }: any) => <div>{children}</div>,
  SidebarGroup: ({ children }: any) => <div>{children}</div>,
  SidebarGroupContent: ({ children }: any) => <div>{children}</div>,
  SidebarGroupLabel: ({ children }: any) => <div>{children}</div>,
  SidebarMenu: ({ children }: any) => <ul>{children}</ul>,
  SidebarMenuItem: ({ children }: any) => <li>{children}</li>,
  SidebarMenuButton: ({ children, asChild }: any) => {
    return asChild ? children : <button>{children}</button>;
  },
}));

describe('SidebarComp', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders sidebar when not on preference flow', () => {
    render(<SidebarComp />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('does not render sidebar when on preference flow', () => {
    (usePathname as jest.Mock).mockReturnValue('/preferance-flow');
    render(<SidebarComp />);
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
  });

  it('renders sidebar items correctly', () => {
    render(<SidebarComp />);
    expect(screen.getByText('首頁')).toBeInTheDocument();
    expect(screen.getByText('個人資料')).toBeInTheDocument();
    expect(screen.getByText('熱門社群')).toBeInTheDocument();
    expect(screen.getByText('我的收藏')).toBeInTheDocument();
  });

  it('renders correct links for items', () => {
    render(<SidebarComp />);
    expect(screen.getByText('首頁').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('個人資料').closest('a')).toHaveAttribute('href', '/profile');
  });
});
