import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../auth/AuthContext';
import { toast } from 'sonner';
import { useBlog } from '../context/BlogContext';
import { X, Plus, Image, Save } from 'lucide-react';
const WriteBlog = () => {
  const {
    user
  } = useUser();
  const {
    addBlog
  } = useBlog();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const handleAddTag = () => {
    const trimmedTag = currentTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag]);
      setCurrentTag('');
    }
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !coverImage.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!user) return;
    const excerpt = content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    addBlog({
      title,
      content,
      excerpt,
      coverImage,
      author: {
        id: user.id,
        name: user.fullName || 'Anonymous',
        avatar: user.imageUrl || 'https://randomuser.me/api/portraits/lego/1.jpg'
      },
      tags,
      readTime: Math.max(1, Math.ceil(content.length / 1000))
    });
    toast.success('Blog published successfully!');
    navigate('/blogs');
  };
  return <div className="bg-white min-h-screen w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Write a New Blog
          </h1>
          <p className="text-gray-600">
            Share your thoughts, ideas, and expertise with the world.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cover-image" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL *
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input type="text" name="cover-image" id="cover-image" required className="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full rounded-md sm:text-sm border-gray-300" placeholder="https://example.com/image.jpg" value={coverImage} onChange={e => setCoverImage(e.target.value)} />
            </div>
            {coverImage && <div className="mt-2">
                <img src={coverImage} alt="Cover preview" className="h-40 w-full object-cover rounded-md" onError={() => {
              toast.error('Invalid image URL');
              setCoverImage('');
            }} />
              </div>}
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input type="text" name="title" id="title" required className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300" placeholder="Enter your blog title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea id="content" name="content" rows={15} required className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Write your blog content here..." value={content} onChange={e => setContent(e.target.value)}></textarea>
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (up to 5)
            </label>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {tags.map((tag, index) => <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:text-indigo-600 focus:outline-none">
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove tag {tag}</span>
                  </button>
                </span>)}
            </div>
            <div className="flex rounded-md shadow-sm">
              <input type="text" id="tags" className="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full rounded-l-md sm:text-sm border-gray-300" placeholder="Add a tag" value={currentTag} onChange={e => setCurrentTag(e.target.value)} onKeyDown={handleKeyDown} disabled={tags.length >= 5} />
              <button type="button" onClick={handleAddTag} disabled={!currentTag.trim() || tags.length >= 5} className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm disabled:opacity-50">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Press Enter to add a tag
            </p>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <button type="button" onClick={() => navigate('/blogs')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Save className="h-4 w-4 mr-2" />
                Publish Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>;
};
export default WriteBlog;