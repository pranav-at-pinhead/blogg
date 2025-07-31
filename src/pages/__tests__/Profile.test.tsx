import { render, screen } from '@testing-library/react';
import Profile from '../Profile';
import { describe, it, expect, vi } from 'vitest';

// Mock the AuthContext
const mockUseUser = vi.fn();

vi.mock('../../auth/AuthContext', () => ({
  useUser: () => mockUseUser(),
}));

// Mock the BlogContext
const mockUseBlog = vi.fn();

vi.mock('../../context/BlogContext', () => ({
  useBlog: () => mockUseBlog(),
}));

// Mock BlogCard component
vi.mock('../../components/BlogCard', () => ({
  __esModule: true,
  default: ({ blog }: { blog: any }) => <div data-testid={`blog-card-${blog.id}`}>{blog.title}</div>,
}));

const mockUser = {
  id: 'user-1',
  fullName: 'Test User',
  imageUrl: 'https://example.com/avatar.jpg',
  primaryEmailAddress: {
    emailAddress: 'test@example.com',
  },
  createdAt: '2023-01-01T00:00:00Z',
};

const mockBlogs = [
  {
    id: '1',
    title: 'User Blog Post 1',
    excerpt: 'This is a user blog post excerpt',
    content: '<p>This is user content</p>',
    coverImage: 'https://example.com/user-image1.jpg',
    author: {
      id: 'user-1',
      name: 'Test User',
      avatar: 'https://example.com/avatar.jpg',
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    tags: ['user', 'blog'],
    likes: 10,
    comments: [],
    readTime: 5,
  },
  {
    id: '2',
    title: 'User Blog Post 2',
    excerpt: 'This is another user blog post excerpt',
    content: '<p>This is more user content</p>',
    coverImage: 'https://example.com/user-image2.jpg',
    author: {
      id: 'user-1',
      name: 'Test User',
      avatar: 'https://example.com/avatar.jpg',
    },
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    tags: ['user', 'tech'],
    likes: 5,
    comments: [],
    readTime: 3,
  },
  {
    id: '3',
    title: 'Other User Blog Post',
    excerpt: 'This is another user blog post excerpt',
    content: '<p>This is other user content</p>',
    coverImage: 'https://example.com/other-image.jpg',
    author: {
      id: 'user-2',
      name: 'Other User',
      avatar: 'https://example.com/other-avatar.jpg',
    },
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z',
    tags: ['other', 'blog'],
    likes: 8,
    comments: [],
    readTime: 4,
  },
];

describe('Profile', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseUser.mockReset();
    mockUseBlog.mockReset();
  });

  afterEach(() => {
    // Clear mocks after each test
    vi.clearAllMocks();
  });

  it('shows loading state when user is not available', () => {
    mockUseUser.mockReturnValue({ user: null });
    mockUseBlog.mockReturnValue({ blogs: [] });
    
    render(<Profile />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders user profile information', () => {
    mockUseUser.mockReturnValue({ user: mockUser });
    mockUseBlog.mockReturnValue({ blogs: mockBlogs });
    
    render(<Profile />);
    
    expect(screen.getAllByText('Test User')).toHaveLength(2); // Header and profile info
    expect(screen.getAllByText('test@example.com')).toHaveLength(2); // Header and profile info
    expect(screen.getByText(/January 1, 2023/i)).toBeInTheDocument();
  });

  it('renders user blogs', () => {
    mockUseUser.mockReturnValue({ user: mockUser });
    mockUseBlog.mockReturnValue({ blogs: mockBlogs });
    
    render(<Profile />);
    
    expect(screen.getByText('User Blog Post 1')).toBeInTheDocument();
    expect(screen.getByText('User Blog Post 2')).toBeInTheDocument();
    // Should not show blogs by other users
    expect(screen.queryByText('Other User Blog Post')).not.toBeInTheDocument();
  });

  it('shows correct blog count', () => {
    mockUseUser.mockReturnValue({ user: mockUser });
    mockUseBlog.mockReturnValue({ blogs: mockBlogs });
    
    render(<Profile />);
    
    // Should show 2 blogs (only user's blogs)
    const blogCards = screen.getAllByTestId(/blog-card-/);
    expect(blogCards).toHaveLength(2);
  });

  it('shows message when user has no blogs', () => {
    mockUseUser.mockReturnValue({ user: mockUser });
    mockUseBlog.mockReturnValue({ blogs: [] });
    
    render(<Profile />);
    
    expect(screen.getByText('No blogs yet')).toBeInTheDocument();
    expect(screen.getByText('You haven\'t published any blogs yet. Start writing your first blog post to share your thoughts with the world.')).toBeInTheDocument();
  });
});
