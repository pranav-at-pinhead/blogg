import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import { Clock, Heart, ArrowLeft } from 'lucide-react'
import CommentSection from '../components/CommentSection'
import { useUser } from '../auth/AuthContext'
const BlogDetail = () => {
  const { id } = useParams<{
    id: string
  }>()
  const navigate = useNavigate()
  const { getBlog, likeBlog } = useBlog()
  const { isSignedIn } = useUser()
  const blog = getBlog(id || '')
  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Blog not found
        </h2>
        <p className="text-gray-600 mb-6">
          The blog you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Blogs
        </Link>
      </div>
    )
  }
  const {
    title,
    content,
    coverImage,
    author,
    createdAt,
    tags,
    likes,
    readTime,
  } = blog
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const handleLike = () => {
    if (isSignedIn) {
      likeBlog(blog.id)
    }
  }
  return (
    <div className="bg-white min-h-screen w-full">
      <div className="relative h-96 bg-black">
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button
              onClick={() => navigate(-1)}
              className="mb-8 inline-flex items-center px-3 py-1 rounded-md bg-black bg-opacity-50 text-white hover:bg-opacity-60 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-12 w-12 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {author.name}
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <span>{formattedDate}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${isSignedIn ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-100 text-gray-500 cursor-not-allowed'}`}
            disabled={!isSignedIn}
            title={isSignedIn ? 'Like this article' : 'Sign in to like'}
          >
            <Heart
              className={`h-4 w-4 ${isSignedIn ? 'text-red-500' : 'text-gray-400'}`}
            />
            <span>{likes}</span>
          </button>
        </div>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        <CommentSection blog={blog} />
      </div>
    </div>
  )
}
export default BlogDetail
