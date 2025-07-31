import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import { describe, it, expect, vi } from 'vitest';

// Mock the BlogContext
const mockUseBlog = vi.fn();

vi.mock('../../context/BlogContext', () => ({
  useBlog: () => mockUseBlog(),
}));

// Mock the AuthContext
const mockUseUser = vi.fn();

vi.mock('../../auth/AuthContext', () => ({
  useUser: () => mockUseUser(),
}));

// Mock BlogCard component
vi.mock('../../components/BlogCard', () => ({
  __esModule: true,
  default: ({ blog }: { blog: any }) => <div data-testid={`blog-card-${blog.id}`}>{blog.title}</div>,
}));

const mockFeaturedBlogs = [
  {
    id: '1',
    title: 'Featured Blog Post',
    excerpt: 'This is a featured blog post excerpt',
    content: '<p>This is featured content</p>',
    coverImage: 'https://example.com/featured-image.jpg',
    author: {
      id: 'author-1',
      name: 'Featured Author',
      avatar: 'https://example.com/featured-avatar.jpg',
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    tags: ['featured', 'blog'],
    likes: 15,
    comments: [],
    readTime: 7,
  },
];

const mockBlogs = [
  {
    id: '2',
    title: 'Recent Blog Post 1',
    excerpt: 'This is a recent blog post excerpt',
    content: '<p>This is recent content</p>',
    coverImage: 'https://example.com/recent-image1.jpg',
    author: {
      id: 'author-2',
      name: 'Recent Author 1',
      avatar: 'https://example.com/recent-avatar1.jpg',
    },
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    tags: ['recent', 'blog'],
    likes: 8,
    comments: [],
    readTime: 4,
  },
  {
    id: '3',
    title: 'Recent Blog Post 2',
    excerpt: 'This is another recent blog post excerpt',
    content: '<p>This is more recent content</p>',
    coverImage: 'https://example.com/recent-image2.jpg',
    author: {
      id: 'author-3',
      name: 'Recent Author 2',
      avatar: 'https://example.com/recent-avatar2.jpg',
    },
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z',
    tags: ['recent', 'tech'],
    likes: 12,
    comments: [],
    readTime: 6,
  },
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Home', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseBlog.mockReset();
    mockUseUser.mockReset();
  });

  afterEach(() => {
    // Clear mocks after each test
    vi.clearAllMocks();
  });

  it('renders hero section with title and description', () => {
    mockUseBlog.mockReturnValue({ featuredBlogs: [], blogs: [] });
    mockUseUser.mockReturnValue({ isSignedIn: false });
    
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Share Your Ideas With The World')).toBeInTheDocument();
    expect(screen.getByText(/BloggIt is a modern platform for writers and readers to connect/i)).toBeInTheDocument();
  });

  it('renders featured blogs section when there are featured blogs', () => {
    mockUseBlog.mockReturnValue({ featuredBlogs: mockFeaturedBlogs, blogs: [] });
    mockUseUser.mockReturnValue({ isSignedIn: false });
    
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Featured Posts')).toBeInTheDocument();
    expect(screen.getByText('Featured Blog Post')).toBeInTheDocument();
  });

  it('renders recent blogs section with correct number of blogs', () => {
    mockUseBlog.mockReturnValue({ featuredBlogs: [], blogs: mockBlogs });
    mockUseUser.mockReturnValue({ isSignedIn: false });
    
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Recent Posts')).toBeInTheDocument();
    expect(screen.getByText('Recent Blog Post 1')).toBeInTheDocument();
    expect(screen.getByText('Recent Blog Post 2')).toBeInTheDocument();
  });

  it('shows get started button for non-signed in users', () => {
    mockUseBlog.mockReturnValue({ featuredBlogs: [], blogs: [] });
    mockUseUser.mockReturnValue({ isSignedIn: false });
    
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('shows write blog button for signed in users', () => {
    mockUseBlog.mockReturnValue({ featuredBlogs: [], blogs: [] });
    mockUseUser.mockReturnValue({ isSignedIn: true });
    
    renderWithRouter(<Home />);
    
    // Find the specific Start Writing button in the hero section
    const startWritingButtons = screen.getAllByText('Start Writing');
    // The first one is in the hero section
    expect(startWritingButtons[0]).toBeInTheDocument();
  });

  it('renders features section', () => {
    mockUseBlog.mockReturnValue({ featuredBlogs: [], blogs: [] });
    mockUseUser.mockReturnValue({ isSignedIn: false });
    
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Why Choose BloggIt')).toBeInTheDocument();
    expect(screen.getByText('Easy to Write')).toBeInTheDocument();
    expect(screen.getByText('Connect with Others')).toBeInTheDocument();
    expect(screen.getByText('Discover Content')).toBeInTheDocument();
  });
});
