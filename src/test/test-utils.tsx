import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
import { BlogProvider } from '../context/BlogContext';
import { vi } from 'vitest';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <AuthProvider>
        <BlogProvider>{children}</BlogProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };


// Mock the useUser hook
export const mockUseUser = vi.fn().mockImplementation((overrides = {}) => {
  // Default values
  const defaults = {
    isLoaded: true,
    isSignedIn: false,
    user: {
      id: 'user-1',
      fullName: 'Test User',
      imageUrl: 'https://example.com/avatar.jpg',
      primaryEmailAddress: {
        emailAddress: 'test@example.com',
      },
      createdAt: '2023-01-01T00:00:00Z',
    },
  };

  // Merge with overrides
  return {
    ...defaults,
    ...overrides,
    // Ensure user object is properly merged if provided
    ...(overrides.user && { user: { ...defaults.user, ...overrides.user } })
  };
});

// Mock the AuthContext
vi.mock('../auth/AuthContext', () => ({
  useUser: mockUseUser,
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the useBlog hook
export const mockUseBlog = vi.fn().mockImplementation((overrides = {}) => ({
  blogs: [],
  loading: false,
  error: null,
  getBlogs: vi.fn(),
  getBlog: vi.fn().mockImplementation((id) => ({
    id,
    title: 'Test Blog Post',
    content: '<p>Test content</p>',
    excerpt: 'Test excerpt',
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
    readTime: 5,
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
  })),
  likeBlog: vi.fn().mockResolvedValue({ success: true }),
  createBlog: vi.fn(),
  updateBlog: vi.fn(),
  deleteBlog: vi.fn(),
  ...overrides,
}));

// Mock the AuthContext
vi.mock('../auth/AuthContext', () => ({
  useUser: () => mockUseUser(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the BlogContext
vi.mock('../context/BlogContext', () => ({
  useBlog: () => mockUseBlog(),
  BlogProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the CommentSection component
vi.mock('../components/CommentSection', () => ({
  __esModule: true,
  default: ({ blog }: { blog: any }) => (
    <div data-testid="comment-section">Comments for {blog.title}</div>
  ),
}));
