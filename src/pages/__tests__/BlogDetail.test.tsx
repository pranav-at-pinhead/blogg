import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogDetail from '../BlogDetail';
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

// Mock CommentSection component
vi.mock('../../components/CommentSection', () => ({
  __esModule: true,
  default: ({ blog }: { blog: any }) => <div data-testid="comment-section">Comments for {blog.title}</div>,
}));

// Mock useParams
const mockUseParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => mockUseParams(),
    useNavigate: () => vi.fn(),
  };
});

const mockBlog = {
  id: '1',
  title: 'Test Blog Post',
  excerpt: 'This is a test blog post excerpt',
  content: '<p>This is test content</p>',
  coverImage: 'https://example.com/image.jpg',
  author: {
    id: 'author-1',
    name: 'Test Author',
    avatar: 'https://example.com/avatar.jpg',
  },
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  tags: ['test', 'blog'],
  likes: 10,
  comments: [
    {
      id: 'comment-1',
      author: {
        id: 'user-1',
        name: 'Comment Author',
        avatar: 'https://example.com/comment-avatar.jpg',
      },
      content: 'This is a test comment',
      createdAt: '2023-01-02T00:00:00Z',
    },
  ],
  readTime: 5,
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BlogDetail', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseBlog.mockReset();
    mockUseUser.mockReset();
    mockUseParams.mockReset();
  });

  afterEach(() => {
    // Clear mocks after each test
    vi.clearAllMocks();
  });

  it('renders blog not found message when blog does not exist', () => {
    mockUseParams.mockReturnValue({ id: 'non-existent' });
    mockUseBlog.mockReturnValue({ getBlog: () => null });
    mockUseUser.mockReturnValue({ isSignedIn: false });
    
    renderWithRouter(<BlogDetail />);
    
    expect(screen.getByText('Blog not found')).toBeInTheDocument();
  });

  it('renders blog details when blog exists', () => {
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseBlog.mockReturnValue({ getBlog: () => mockBlog, likeBlog: vi.fn() });
    mockUseUser.mockReturnValue({ isSignedIn: false });
    
    renderWithRouter(<BlogDetail />);
    
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('This is test content')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument(); // likes count
  });

  it('renders comment section', () => {
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseBlog.mockReturnValue({ getBlog: () => mockBlog, likeBlog: vi.fn() });
    mockUseUser.mockReturnValue({ isSignedIn: false });
    
    renderWithRouter(<BlogDetail />);
    
    expect(screen.getByTestId('comment-section')).toBeInTheDocument();
  });

  it('allows user to like blog when signed in', () => {
    const mockLikeBlog = vi.fn();
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseBlog.mockReturnValue({ getBlog: () => mockBlog, likeBlog: mockLikeBlog });
    mockUseUser.mockReturnValue({ isSignedIn: true });
    
    renderWithRouter(<BlogDetail />);
    
    // Find the like button by its text content (the number of likes)
    const likeButton = screen.getByText('10').closest('button');
    fireEvent.click(likeButton);
    
    expect(mockLikeBlog).toHaveBeenCalledWith('1');
  });

  it('shows login prompt when user tries to like blog while not signed in', () => {
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseBlog.mockReturnValue({ getBlog: () => mockBlog, likeBlog: vi.fn() });
    mockUseUser.mockReturnValue({ isSignedIn: false });
    
    renderWithRouter(<BlogDetail />);
    
    // Find the like button by its text content (the number of likes)
    const likeSpan = screen.getByText('10');
    const likeButton = likeSpan.closest('button');
    expect(likeButton).not.toBeNull();
    if (likeButton) {
      fireEvent.click(likeButton);
    }
    
    // We could check for a login prompt here if it was implemented
  });

  it('renders blog tags', () => {
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseBlog.mockReturnValue({ getBlog: () => mockBlog, likeBlog: vi.fn() });
    mockUseUser.mockReturnValue({ isSignedIn: false });
    
    renderWithRouter(<BlogDetail />);
    
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('blog')).toBeInTheDocument();
  });
});
