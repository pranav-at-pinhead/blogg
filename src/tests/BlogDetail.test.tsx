import { render, screen, fireEvent } from '../test/test-utils';
import BlogDetail from '../pages/BlogDetail';
import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest';
import { mockUseUser, mockUseBlog } from '../test/test-utils';

// Mock CommentSection component
vi.mock('../../components/CommentSection', () => ({
  __esModule: true,
  default: ({ blog }: { blog: any }) => (
    <div data-testid="comment-section">Comments for {blog.title}</div>
  ),
}));

// Mock useParams
const mockUseParams = vi.fn();

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useParams: () => mockUseParams(),
}));

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
  likedBy: [],
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
  
  afterAll(() => {
    // Clean up after all tests
    vi.resetAllMocks();
  });

  it('renders blog not found message when blog does not exist', () => {
    mockUseParams.mockReturnValue({ id: 'non-existent-id' });
    mockUseBlog.mockReturnValue({ 
      ...mockUseBlog(),
      getBlog: vi.fn().mockReturnValue(undefined),
    });
    
    // Ensure user is loaded but not signed in
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null
    });
    
    render(<BlogDetail />);
    
    expect(screen.getByText('Blog not found')).toBeInTheDocument();
    expect(screen.getByText(/The blog you're looking for doesn't exist or has been removed/i)).toBeInTheDocument();
  });

  it('renders blog details when blog exists', async () => {
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseBlog.mockReturnValue({ 
      ...mockUseBlog(),
      getBlog: vi.fn().mockReturnValue(mockBlog), 
      likeBlog: vi.fn()
    });
    mockUseUser.mockReturnValue({ 
      isLoaded: true,
      isSignedIn: false,
      user: null
    });
    
    render(<BlogDetail />);
    
    // Check that blog content is rendered
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('This is test content')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument(); // likes count
    
    // Check that tags are rendered
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('blog')).toBeInTheDocument();
  });

  it('renders comment section', () => {
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseBlog.mockReturnValue({ 
      ...mockUseBlog(),
      getBlog: vi.fn().mockReturnValue(mockBlog),
    });
    
    // Ensure user is loaded but not signed in
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null
    });
    
    render(<BlogDetail />);
    
    expect(screen.getByText('Comments for Test Blog Post')).toBeInTheDocument();
  });

  it('allows user to like blog when signed in', () => {
    const mockLikeBlog = vi.fn();
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseBlog.mockReturnValue({ 
      ...mockUseBlog(),
      getBlog: vi.fn().mockReturnValue(mockBlog),
      likeBlog: mockLikeBlog
    });
    mockUseUser.mockReturnValue({ 
      isLoaded: true,
      isSignedIn: true,
      user: { id: 'user-1' }
    });
    
    render(<BlogDetail />);
    
    // Find the like button by its text content (the number of likes)
    const likeButton = screen.getByText('10').closest('button');
    expect(likeButton).toBeInTheDocument();
    
    fireEvent.click(likeButton!);
    expect(mockLikeBlog).toHaveBeenCalledWith('1');
  });

  it('shows login prompt when user tries to like blog while not signed in', () => {
    const mockLikeBlog = vi.fn();
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseBlog.mockReturnValue({ 
      ...mockUseBlog(),
      getBlog: vi.fn().mockReturnValue(mockBlog),
      likeBlog: mockLikeBlog
    });
    mockUseUser.mockReturnValue({ 
      isLoaded: true,
      isSignedIn: false,
      user: null
    });
    
    render(<BlogDetail />);
    
    // Find the like button by its text content (the number of likes)
    const likeButton = screen.getByText('10').closest('button');
    expect(likeButton).toBeInTheDocument();
    
    fireEvent.click(likeButton!);
    
    // Verify likeBlog was not called when not signed in
    expect(mockLikeBlog).not.toHaveBeenCalled();
    // Note: In a real test, you might want to check if a login prompt appears
  });

  it('renders blog tags', () => {
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseBlog.mockReturnValue({ 
      ...mockUseBlog(),
      getBlog: vi.fn().mockReturnValue({
        ...mockBlog,
        tags: ['test', 'blog']
      }),
    });
    
    // Ensure user is loaded but not signed in
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null
    });
    
    render(<BlogDetail />);
    
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('blog')).toBeInTheDocument();
  });
});