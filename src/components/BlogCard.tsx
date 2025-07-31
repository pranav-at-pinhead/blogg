import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Clock } from 'lucide-react';
import { Blog } from '../context/BlogContext';
interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}
const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  featured = false
}) => {
  const {
    id,
    title,
    excerpt,
    coverImage,
    author,
    createdAt,
    tags,
    likes,
    comments,
    readTime
  } = blog;
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  if (featured) {
    return <div className="relative flex flex-col md:flex-row overflow-hidden rounded-lg shadow-lg bg-white">
        <div className="md:w-2/5 h-60 md:h-auto">
          <img src={coverImage} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.slice(0, 3).map((tag, index) => <span key={index} className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>)}
            </div>
            <Link to={`/blogs/${id}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors duration-200">
                {title}
              </h2>
            </Link>
            <p className="text-gray-600 mb-4">{excerpt}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={author.avatar} alt={author.name} className="h-10 w-10 rounded-full mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {author.name}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{formattedDate}</span>
                  <span className="mx-1">•</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-500">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1" />
                <span className="text-xs">{likes}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">{comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="flex flex-col overflow-hidden rounded-lg shadow-md bg-white h-full">
      <div className="h-48 relative">
        <img src={coverImage} alt={title} className="w-full h-full object-cover" />
        {tags.length > 0 && <div className="absolute top-2 left-2">
            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
              {tags[0]}
            </span>
          </div>}
      </div>
      <div className="p-4 flex-grow">
        <Link to={`/blogs/${id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors duration-200">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={author.avatar} alt={author.name} className="h-8 w-8 rounded-full mr-2" />
            <div>
              <p className="text-xs font-medium text-gray-900">{author.name}</p>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="flex items-center">
              <Heart className="h-3 w-3 mr-1" />
              <span className="text-xs">{likes}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="h-3 w-3 mr-1" />
              <span className="text-xs">{comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default BlogCard;