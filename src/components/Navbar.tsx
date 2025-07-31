import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useUser, SignInButton, UserButton } from '../auth/AuthContext'
const Navbar = () => {
  const { isSignedIn, user } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                BloggIt
              </span>
            </Link>
            <Link to='/contact' className='flex-shrink-0 flex items-center'>
               <span className='text-2xl font-bold text-indigo-600'>
                Contact
               </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/blogs"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Blogs
              </Link>
              <Link
                to="/contact"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Contact
              </Link>
              {isSignedIn && (
                <Link
                  to="/write"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Write
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isSignedIn ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Profile
                </Link>
                <UserButton />
              </>
            ) : (
              <div className="flex space-x-4 items-center">
                <SignInButton mode="modal">
                  <button className="text-gray-500 hover:text-gray-700">
                    Sign In
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md">
                    Get Started
                  </button>
                </SignInButton>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
            {isSignedIn && (
              <Link
                to="/write"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Write
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isSignedIn ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <UserButton />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user?.fullName}
                  </div>
                  <Link
                    to="/profile"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ) : (
              <div className="px-4 flex flex-col space-y-2">
                <SignInButton mode="modal">
                  <button
                    className="text-gray-500 hover:text-gray-700 w-full text-left px-3 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </button>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
export default Navbar
