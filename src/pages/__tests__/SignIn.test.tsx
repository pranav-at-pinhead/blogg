import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from '../SignIn';
import { describe, it, expect, vi } from 'vitest';

// Mock the AuthContext
vi.mock('../../auth/AuthContext', () => ({
  SignIn: () => <div data-testid="clerk-sign-in">Clerk Sign In Component</div>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('SignIn', () => {
  it('renders sign in heading', () => {
    renderWithRouter(<SignIn />);
    
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
  });

  it('renders sign up link', () => {
    renderWithRouter(<SignIn />);
    
    const signUpLink = screen.getByText('create a new account');
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/sign-up');
  });

  it('renders Clerk SignIn component', () => {
    renderWithRouter(<SignIn />);
    
    expect(screen.getByTestId('clerk-sign-in')).toBeInTheDocument();
  });
});
