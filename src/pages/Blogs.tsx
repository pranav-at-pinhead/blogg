import React, { useState } from 'react';
import { useBlog, Blog } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import BlogFilter from '../components/BlogFilter';
import { BookOpen } from 'lucide-react';
const Blogs = () => {
  const {
    blogs
  } = useBlog();
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogs);
  return <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Blogs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insightful articles from writers around the world. Use the
            filters below to find content that interests you.
          </p>
        </div>
        <BlogFilter blogs={blogs} onFilter={setFilteredBlogs} />
        {filteredBlogs.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
          </div> : <div className="text-center py-16">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mb-6">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any blogs matching your filters. Try adjusting
              your search criteria or check back later for new content.
            </p>
          </div>}
      </div>
    </div>;
};
export default Blogs;