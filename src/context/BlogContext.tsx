import React, { useState, createContext, useContext } from 'react'
import { mockBlogs } from '../lib/mockData'
export interface Author {
  id: string
  name: string
  avatar: string
}
export interface Comment {
  id: string
  author: Author
  content: string
  createdAt: string
}
export interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  coverImage: string
  author: Author
  createdAt: string
  updatedAt: string
  tags: string[]
  likes: number
  comments: Comment[]
  readTime: number
}
interface BlogContextType {
  blogs: Blog[]
  featuredBlogs: Blog[]
  addBlog: (
    blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'comments'>,
  ) => void
  likeBlog: (blogId: string) => void
  addComment: (
    blogId: string,
    comment: Omit<Comment, 'id' | 'createdAt'>,
  ) => void
  getBlog: (id: string) => Blog | undefined
}
const BlogContext = createContext<BlogContextType | undefined>(undefined)
export const useBlog = () => {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}
interface BlogProviderProps {
  children: ReactNode
}
export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs)
  const featuredBlogs = blogs.slice(0, 3)
  const addBlog = (
    blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'comments'>,
  ) => {
    const newBlog: Blog = {
      ...blog,
      id: `blog-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    }
    setBlogs([newBlog, ...blogs])
  }
  const likeBlog = (blogId: string) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === blogId
          ? {
              ...blog,
              likes: blog.likes + 1,
            }
          : blog,
      ),
    )
  }
  const addComment = (
    blogId: string,
    comment: Omit<Comment, 'id' | 'createdAt'>,
  ) => {
    setBlogs(
      blogs.map((blog) => {
        if (blog.id === blogId) {
          const newComment: Comment = {
            ...comment,
            id: `comment-${Date.now()}`,
            createdAt: new Date().toISOString(),
          }
          return {
            ...blog,
            comments: [...blog.comments, newComment],
          }
        }
        return blog
      }),
    )
  }
  const getBlog = (id: string) => {
    return blogs.find((blog) => blog.id === id)
  }
  return (
    <BlogContext.Provider
      value={{
        blogs,
        featuredBlogs,
        addBlog,
        likeBlog,
        addComment,
        getBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}
