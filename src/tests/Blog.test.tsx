import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BlogProvider } from '../context/BlogContext';
import Blogs from '../pages/Blogs';

// Mock the BlogContext
const mockUseBlog = vi.fn().mockReturnValue({
  blogs: [],
  featuredBlogs: [],
  getBlog: vi.fn(),
  addBlog: vi.fn(),
  likeBlog: vi.fn(),
  addComment: vi.fn(),
});

vi.mock('../context/BlogContext', () => ({
  useBlog: () => mockUseBlog(),
}));

// Mock the BlogProvider to wrap components
const MockBlogProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

// Mock BlogCard component
vi.mock('../components/BlogCard', () => ({
  __esModule: true,
  default: ({ blog }: { blog: any }) => <div data-testid={`blog-card-${blog.id}`}>{blog.title}</div>,
}));

// Mock BlogFilter component
vi.mock('../components/BlogFilter', () => ({
  __esModule: true,
  default: ({ blogs, onFilter }: { blogs: any[]; onFilter: any }) => (
    <div data-testid="blog-filter">
      <input 
        type="text" 
        placeholder="Search blogs..." 
        onChange={(e) => {
          const filtered = blogs.filter(blog => 
            blog.title.toLowerCase().includes(e.target.value.toLowerCase())
          );
          onFilter(filtered);
        }} 
      />
    </div>
  ),
}));

const mockBlogs = [
  {
    id: '1',
    title: 'Test Blog Post 1',
    excerpt: 'This is a test blog post excerpt',
    content: '<p>This is test content</p>',
    coverImage: 'https://example.com/image1.jpg',
    author: {
      id: 'author-1',
      name: 'Test Author 1',
      avatar: 'https://example.com/avatar1.jpg',
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    tags: ['test', 'blog'],
    likes: 10,
    comments: [],
    readTime: 5,
  },
  {
    id: '2',
    title: 'Test Blog Post 2',
    excerpt: 'This is another test blog post excerpt',
    content: '<p>This is more test content</p>',
    coverImage: 'https://example.com/image2.jpg',
    author: {
      id: 'author-2',
      name: 'Test Author 2',
      avatar: 'https://example.com/avatar2.jpg',
    },
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    tags: ['tech', 'blog'],
    likes: 5,
    comments: [],
    readTime: 3,
  },
];

describe('Blogs', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseBlog.mockReset();
  });

  afterEach(() => {
    // Clear mocks after each test
    vi.clearAllMocks();
  });

  it('renders page title and description', () => {
    mockUseBlog.mockReturnValue({ blogs: [] });
    
    render(<Blogs />);
    
    expect(screen.getByText('Explore Blogs')).toBeInTheDocument();
    expect(screen.getByText(/Discover insightful articles from writers around the world/i)).toBeInTheDocument();
  });

  it('renders blog filter component', () => {
    mockUseBlog.mockReturnValue({ blogs: mockBlogs });
    
    render(<Blogs />);
    
    expect(screen.getByTestId('blog-filter')).toBeInTheDocument();
  });

  it('renders blog cards for all blogs initially', () => {
    mockUseBlog.mockReturnValue({ blogs: mockBlogs });
    
    render(<Blogs />);
    
    expect(screen.getByText('Test Blog Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Blog Post 2')).toBeInTheDocument();
  });

  it('renders correct number of blog cards', () => {
    mockUseBlog.mockReturnValue({ blogs: mockBlogs });
    
    render(<Blogs />);
    
    const blogCards = screen.getAllByTestId(/blog-card-/);
    expect(blogCards).toHaveLength(2);
  });
});