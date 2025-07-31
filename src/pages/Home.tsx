import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Edit } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import { useUser } from '../auth/AuthContext';
const Home = () => {
  const {
    featuredBlogs,
    blogs
  } = useBlog();
  const {
    isSignedIn
  } = useUser();
  const recentBlogs = blogs.slice(0, 6);
  return <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Share Your Ideas With The World
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              BloggIt is a modern platform for writers and readers to connect.
              Write, read, and engage with content that matters to you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/blogs" className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                Start Reading
              </Link>
              <Link to={isSignedIn ? '/write' : '/sign-in'} className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300">
                Start Writing
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{
        clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
      }}></div>
      </section>
      {/* Featured Blogs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Posts</h2>
            <Link to="/blogs" className="text-indigo-600 font-medium flex items-center hover:text-indigo-800">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-8">
            {featuredBlogs.map(blog => <BlogCard key={blog.id} blog={blog} featured={true} />)}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose BloggIt
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A modern blogging platform designed with both writers and readers
              in mind.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <Edit className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy to Write</h3>
              <p className="text-gray-600">
                Our intuitive editor makes it simple to create beautiful,
                engaging content. Focus on your writing, not formatting.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover Content</h3>
              <p className="text-gray-600">
                Find articles on topics you care about with our powerful
                filtering and recommendation system.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Connect with Others
              </h3>
              <p className="text-gray-600">
                Engage with writers and readers through comments, likes, and
                follows. Build your audience.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Recent Blogs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
            <Link to="/blogs" className="text-indigo-600 font-medium flex items-center hover:text-indigo-800">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of writers and readers on BloggIt. Create an account
            today to start writing and connecting.
          </p>
          <Link to={isSignedIn ? '/write' : '/sign-up'} className="inline-block px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {isSignedIn ? 'Start Writing' : 'Get Started'}
          </Link>
        </div>
      </section>
    </div>;
};
export default Home;