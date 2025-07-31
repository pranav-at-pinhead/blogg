import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../SignUp';
import { describe, it, expect, vi } from 'vitest';

// Mock the AuthContext
vi.mock('../../auth/AuthContext', () => ({
  SignUp: () => <div data-testid="clerk-sign-up">Clerk Sign Up Component</div>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('SignUp', () => {
  it('renders sign up heading', () => {
    renderWithRouter(<SignUp />);
    
    expect(screen.getByText('Create your account')).toBeInTheDocument();
  });

  it('renders sign in link', () => {
    renderWithRouter(<SignUp />);
    
    const signInLink = screen.getByText('Sign in');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/sign-in');
  });

  it('renders Clerk SignUp component', () => {
    renderWithRouter(<SignUp />);
    
    expect(screen.getByTestId('clerk-sign-up')).toBeInTheDocument();
  });
});
