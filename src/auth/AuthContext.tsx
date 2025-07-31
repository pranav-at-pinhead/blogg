import React, { useState, createContext, useContext } from 'react'
// Mock user type to match Clerk's user object structure
interface User {
  id: string
  fullName: string | null
  imageUrl: string
  primaryEmailAddress?: {
    emailAddress: string
  }
  createdAt?: string
}
interface AuthContextType {
  isSignedIn: boolean
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}
// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined)
// Mock user data
const mockUser: User = {
  id: 'user-1',
  fullName: 'Alex Johnson',
  imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  primaryEmailAddress: {
    emailAddress: 'alex.johnson@example.com',
  },
  createdAt: new Date().toISOString(),
}
interface AuthProviderProps {
  children: ReactNode
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const signIn = async () => {
    setUser(mockUser)
    setIsSignedIn(true)
    return Promise.resolve()
  }
  const signOut = async () => {
    setUser(null)
    setIsSignedIn(false)
    return Promise.resolve()
  }
  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
// Hook to use the auth context
export const useUser = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useUser must be used within an AuthProvider')
  }
  return context
}
// Mock components for Clerk's UI components
export const SignInButton: React.FC<{
  mode?: string
  children: ReactNode
}> = ({ children }) => {
  const { signIn } = useUser()
  return <div onClick={() => signIn('', '')}>{children}</div>
}
export const UserButton: React.FC = () => {
  const { user } = useUser()
  return (
    <div className="h-8 w-8 rounded-full overflow-hidden">
      <img
        src={user?.imageUrl || 'https://randomuser.me/api/portraits/lego/1.jpg'}
        alt="User"
        className="h-full w-full object-cover"
      />
    </div>
  )
}
export const SignedIn: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const { isSignedIn } = useUser()
  return isSignedIn ? <>{children}</> : null
}
export const SignedOut: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const { isSignedIn } = useUser()
  return !isSignedIn ? <>{children}</> : null
}
export const ClerkProvider: React.FC<{
  publishableKey?: string
  children: ReactNode
}> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}
export const SignIn: React.FC<{
  signUpUrl?: string
}> = () => {
  const { signIn } = useUser()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signIn('', '')
  }
  return (
    <div className="p-4 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="email@example.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
export const SignUp: React.FC<{
  signInUrl?: string
}> = () => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <form>
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="email@example.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}
