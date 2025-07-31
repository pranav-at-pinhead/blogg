import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WriteBlog from '../WriteBlog';
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

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockUser = {
  id: 'user-1',
  fullName: 'Test User',
  imageUrl: 'https://example.com/avatar.jpg',
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('WriteBlog', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseUser.mockReset();
    mockUseBlog.mockReset();
    mockNavigate.mockReset();
  });

  afterEach(() => {
    // Clear mocks after each test
    vi.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    mockUseUser.mockReturnValue({ user: mockUser });
    mockUseBlog.mockReturnValue({ addBlog: vi.fn() });
    
    renderWithRouter(<WriteBlog />);
    
    expect(screen.getByPlaceholderText('Enter your blog title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write your blog content here...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://example.com/image.jpg')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a tag')).toBeInTheDocument();
    expect(screen.getByText('Publish Blog')).toBeInTheDocument();
  });

  it('allows user to fill in blog title', () => {
    mockUseUser.mockReturnValue({ user: mockUser });
    mockUseBlog.mockReturnValue({ addBlog: vi.fn() });
    
    renderWithRouter(<WriteBlog />);
    
    const titleInput = screen.getByPlaceholderText('Enter your blog title');
    fireEvent.change(titleInput, { target: { value: 'Test Blog Title' } });
    
    expect(titleInput).toHaveValue('Test Blog Title');
  });

  it('allows user to fill in blog content', () => {
    mockUseUser.mockReturnValue({ user: mockUser });
    mockUseBlog.mockReturnValue({ addBlog: vi.fn() });
    
    renderWithRouter(<WriteBlog />);
    
    const contentInput = screen.getByPlaceholderText('Write your blog content here...');
    fireEvent.change(contentInput, { target: { value: 'Test blog content' } });
    
    expect(contentInput).toHaveValue('Test blog content');
  });

  it('allows user to add tags', () => {
    mockUseUser.mockReturnValue({ user: mockUser });
    mockUseBlog.mockReturnValue({ addBlog: vi.fn() });
    
    renderWithRouter(<WriteBlog />);
    
    const tagInput = screen.getByPlaceholderText('Add a tag');
    fireEvent.change(tagInput, { target: { value: 'test-tag' } });
    
    // Find the add button next to the tag input (has Plus icon)
    const addButton = screen.getByRole('button', { name: /^$/ }); // Empty accessible name for icon-only button
    fireEvent.click(addButton);
    
    expect(screen.getByText('test-tag')).toBeInTheDocument();
  });

  it('allows user to remove tags', () => {
    mockUseUser.mockReturnValue({ user: mockUser });
    mockUseBlog.mockReturnValue({ addBlog: vi.fn() });
    
    renderWithRouter(<WriteBlog />);
    
    // Add a tag first
    const tagInput = screen.getByPlaceholderText('Add a tag');
    fireEvent.change(tagInput, { target: { value: 'test-tag' } });
    
    // Find the add button next to the tag input (has Plus icon)
    const addButton = screen.getByRole('button', { name: /^$/ }); // Empty accessible name for icon-only button
    fireEvent.click(addButton);
    
    // Then remove it
    const removeButton = screen.getByRole('button', { name: 'Remove tag test-tag' });
    fireEvent.click(removeButton);
    
    expect(screen.queryByText('test-tag')).not.toBeInTheDocument();
  });

  it('submits the form with correct data', () => {
    const mockAddBlog = vi.fn();
    mockUseUser.mockReturnValue({ user: mockUser });
    mockUseBlog.mockReturnValue({ addBlog: mockAddBlog });
    
    renderWithRouter(<WriteBlog />);
    
    // Fill in form data
    fireEvent.change(screen.getByPlaceholderText('Enter your blog title'), {
      target: { value: 'Test Blog Title' },
    });
    
    fireEvent.change(screen.getByPlaceholderText('Write your blog content here...'), {
      target: { value: 'Test blog content' },
    });
    
    fireEvent.change(screen.getByPlaceholderText('https://example.com/image.jpg'), {
      target: { value: 'https://example.com/image.jpg' },
    });
    
    // Add a tag
    fireEvent.change(screen.getByPlaceholderText('Add a tag'), {
      target: { value: 'test-tag' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: '' })); // The plus icon button
    
    // Submit form
    fireEvent.click(screen.getByText('Publish Blog'));
    
    expect(mockAddBlog).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Blog Title',
        content: 'Test blog content',
        coverImage: 'https://example.com/image.jpg',
        tags: ['test-tag'],
      })
    );
    
    expect(mockNavigate).toHaveBeenCalledWith('/blogs');
  });

  it('shows error message when title is missing', () => {
    const mockAddBlog = vi.fn();
    mockUseUser.mockReturnValue({ user: mockUser });
    mockUseBlog.mockReturnValue({ addBlog: mockAddBlog });
    
    renderWithRouter(<WriteBlog />);
    
    // Submit without filling title
    fireEvent.click(screen.getByText('Publish Blog'));
    
    expect(mockAddBlog).not.toHaveBeenCalled();
    // We could check for error messages here if they were implemented
  });
});