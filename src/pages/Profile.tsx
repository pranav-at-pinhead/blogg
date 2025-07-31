import React from 'react';
import { useUser } from '../auth/AuthContext';
import { useBlog, Blog } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import { Edit, Settings, User } from 'lucide-react';
const Profile = () => {
  const {
    user
  } = useUser();
  const {
    blogs
  } = useBlog();
  // Filter blogs by the current user
  const userBlogs = blogs.filter(blog => user && blog.author.id === user.id);
  if (!user) {
    return <div>Loading...</div>;
  }
  return <div className="bg-gray-50 min-h-screen w-full">
      <div className="bg-indigo-600 h-48"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-12 sm:-mt-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-end sm:justify-between">
              <div className="flex items-end">
                <img className="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-white bg-white" src={user.imageUrl || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={user.fullName || 'User'} />
                <div className="ml-4 mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.fullName || 'Anonymous User'}
                  </h1>
                  <p className="text-gray-600">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Profile Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Personal details and account information.
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.fullName || 'Not provided'}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.primaryEmailAddress?.emailAddress || 'Not provided'}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Member since
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Not available'}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Blogs published
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {userBlogs.length}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Blogs</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                <Edit className="h-4 w-4 mr-2" />
                Write New Blog
              </button>
            </div>
            {userBlogs.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
              </div> : <div className="text-center py-16 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <User className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No blogs yet
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  You haven't published any blogs yet. Start writing your first
                  blog post to share your thoughts with the world.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                  <Edit className="h-4 w-4 mr-2" />
                  Write Your First Blog
                </button>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default Profile;