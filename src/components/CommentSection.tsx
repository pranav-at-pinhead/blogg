import React, { useState } from 'react';
import { useUser, SignInButton } from '../auth/AuthContext';
import { Send } from 'lucide-react';
import { Blog, useBlog } from '../context/BlogContext';
interface CommentSectionProps {
  blog: Blog;
}
const CommentSection: React.FC<CommentSectionProps> = ({
  blog
}) => {
  const {
    isSignedIn,
    user
  } = useUser();
  const {
    addComment
  } = useBlog();
  const [comment, setComment] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !isSignedIn || !user) return;
    addComment(blog.id, {
      author: {
        id: user.id,
        name: user.fullName || 'Anonymous',
        avatar: user.imageUrl || 'https://randomuser.me/api/portraits/lego/1.jpg'
      },
      content: comment.trim()
    });
    setComment('');
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return <div className="mt-8 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Comments ({blog.comments.length})
      </h2>
      {isSignedIn ? <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-start space-x-4">
            <img src={user?.imageUrl || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={user?.fullName || 'Anonymous'} className="h-10 w-10 rounded-full" />
            <div className="min-w-0 flex-1">
              <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <textarea rows={3} name="comment" id="comment" className="block w-full py-3 px-4 border-0 resize-none focus:ring-0 sm:text-sm" placeholder="Add a comment..." value={comment} onChange={e => setComment(e.target.value)}></textarea>
              </div>
              <div className="mt-2 flex justify-end">
                <button type="submit" disabled={!comment.trim()} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className="h-4 w-4 mr-2" />
                  Comment
                </button>
              </div>
            </div>
          </div>
        </form> : <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600 mb-2">Sign in to join the conversation</p>
          <SignInButton mode="modal">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign In to Comment
            </button>
          </SignInButton>
        </div>}
      <div className="space-y-6">
        {blog.comments.length > 0 ? blog.comments.map(comment => <div key={comment.id} className="flex space-x-4">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={comment.author.avatar} alt={comment.author.name} />
              </div>
              <div className="flex-grow">
                <div className="flex items-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    {comment.author.name}
                  </h3>
                  <span className="ml-2 text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  <p>{comment.content}</p>
                </div>
              </div>
            </div>) : <p className="text-gray-500 text-center py-4">
            No comments yet. Be the first to share your thoughts!
          </p>}
      </div>
    </div>;
};
export default CommentSection;