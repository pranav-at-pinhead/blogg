import React, { useState } from 'react'
import { Search, Filter, ChevronDown, X } from 'lucide-react'
import { Blog } from '../context/BlogContext'
interface BlogFilterProps {
  blogs: Blog[]
  onFilter: (filteredBlogs: Blog[]) => void
}
const BlogFilter: React.FC<BlogFilterProps> = ({ blogs, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  // Extract all unique tags from blogs
  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)))
  // Extract all unique authors from blogs
  const allAuthors = Array.from(new Set(blogs.map((blog) => blog.author.name)))
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    applyFilters(e.target.value, selectedTags, selectedAuthors)
  }
  const toggleTag = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(newSelectedTags)
    applyFilters(searchTerm, newSelectedTags, selectedAuthors)
  }
  const toggleAuthor = (author: string) => {
    const newSelectedAuthors = selectedAuthors.includes(author)
      ? selectedAuthors.filter((a) => a !== author)
      : [...selectedAuthors, author]
    setSelectedAuthors(newSelectedAuthors)
    applyFilters(searchTerm, selectedTags, newSelectedAuthors)
  }
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTags([])
    setSelectedAuthors([])
    onFilter(blogs)
  }
  const applyFilters = (search: string, tags: string[], authors: string[]) => {
    let filteredBlogs = blogs
    // Filter by search term
    if (search) {
      const lowerSearch = search.toLowerCase()
      filteredBlogs = filteredBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(lowerSearch) ||
          blog.excerpt.toLowerCase().includes(lowerSearch) ||
          blog.content.toLowerCase().includes(lowerSearch),
      )
    }
    // Filter by tags
    if (tags.length > 0) {
      filteredBlogs = filteredBlogs.filter((blog) =>
        blog.tags.some((tag) => tags.includes(tag)),
      )
    }
    // Filter by authors
    if (authors.length > 0) {
      filteredBlogs = filteredBlogs.filter((blog) =>
        authors.includes(blog.author.name),
      )
    }
    onFilter(filteredBlogs)
  }
  const hasActiveFilters =
    searchTerm || selectedTags.length > 0 || selectedAuthors.length > 0
  return (
    <div className="mb-8 bg-white rounded-lg shadow p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search blogs..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`}
            />
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </button>
          )}
        </div>
      </div>
      {isFilterOpen && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Filter by Topic
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${selectedTags.includes(tag) ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Filter by Author
              </h3>
              <div className="flex flex-wrap gap-2">
                {allAuthors.map((author) => (
                  <button
                    key={author}
                    onClick={() => toggleAuthor(author)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${selectedAuthors.includes(author) ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {author}
                    {selectedAuthors.includes(author) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {hasActiveFilters
                ? `Active filters: ${selectedTags.length > 0 ? `${selectedTags.length} topics` : ''} ${selectedTags.length > 0 && selectedAuthors.length > 0 ? ',' : ''} ${selectedAuthors.length > 0 ? `${selectedAuthors.length} authors` : ''}`
                : 'No filters applied'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
export default BlogFilter
