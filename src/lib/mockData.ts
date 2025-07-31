import { Blog } from '../context/BlogContext'
export const mockBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'The Future of Web Development',
    excerpt:
      'Exploring the latest trends and technologies shaping the future of web development.',
    content: `
      <p>Web development has come a long way since the early days of static HTML pages. Today, we're witnessing a revolution in how websites and web applications are built, deployed, and maintained.</p>
      <h2>The Rise of JAMstack</h2>
      <p>JAMstack (JavaScript, APIs, and Markup) has gained significant traction in recent years. This architecture separates the frontend from the backend, allowing developers to build faster, more secure websites.</p>
      <h2>AI-Powered Development</h2>
      <p>Artificial intelligence is transforming web development through code generation, automated testing, and intelligent debugging tools. These technologies are making developers more productive than ever before.</p>
      <h2>Web Assembly</h2>
      <p>WebAssembly (Wasm) is enabling high-performance code to run in the browser, opening up possibilities for complex applications that were previously impossible on the web platform.</p>
      <h2>Conclusion</h2>
      <p>The future of web development is bright, with new technologies emerging constantly. Staying up-to-date with these trends is essential for any developer looking to remain competitive in this rapidly evolving field.</p>
    `,
    coverImage:
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    author: {
      id: 'user-1',
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-05-15T10:30:00Z',
    tags: ['Web Development', 'JavaScript', 'Future Tech'],
    likes: 156,
    comments: [
      {
        id: 'comment-1',
        author: {
          id: 'user-2',
          name: 'Sarah Miller',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        content:
          'Great insights! I particularly agree with your points about JAMstack.',
        createdAt: '2023-05-16T08:22:00Z',
      },
      {
        id: 'comment-2',
        author: {
          id: 'user-3',
          name: 'Michael Chen',
          avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
        },
        content:
          "WebAssembly is definitely a game-changer. I've been experimenting with it in my recent projects.",
        createdAt: '2023-05-16T14:05:00Z',
      },
    ],
    readTime: 5,
  },
  {
    id: 'blog-2',
    title: 'Mastering React Hooks',
    excerpt:
      'A comprehensive guide to using React Hooks effectively in your applications.',
    content: `
      <p>React Hooks have revolutionized how we write React components, allowing us to use state and other React features without writing classes.</p>
      <h2>useState</h2>
      <p>The useState hook is the most basic hook, allowing you to add state to functional components. It returns a stateful value and a function to update it.</p>
      <pre><code>const [count, setCount] = useState(0);</code></pre>
      <h2>useEffect</h2>
      <p>useEffect lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.</p>
      <h2>useContext</h2>
      <p>useContext accepts a context object and returns the current context value. It's a great way to share values like themes or user data across your component tree.</p>
      <h2>Custom Hooks</h2>
      <p>One of the most powerful features of hooks is the ability to create custom hooks, allowing you to extract component logic into reusable functions.</p>
      <h2>Best Practices</h2>
      <p>Always follow the rules of hooks: only call hooks at the top level and only call hooks from React functions. This ensures that hooks maintain their state between renders.</p>
    `,
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    author: {
      id: 'user-4',
      name: 'Emily Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    createdAt: '2023-06-02T14:45:00Z',
    updatedAt: '2023-06-03T09:15:00Z',
    tags: ['React', 'JavaScript', 'Web Development'],
    likes: 243,
    comments: [
      {
        id: 'comment-3',
        author: {
          id: 'user-5',
          name: 'David Kim',
          avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        },
        content: 'This helped me understand useContext much better. Thanks!',
        createdAt: '2023-06-03T10:12:00Z',
      },
    ],
    readTime: 7,
  },
  {
    id: 'blog-3',
    title: 'Building Accessible Web Applications',
    excerpt:
      'Learn how to make your web applications more accessible to all users.',
    content: `
      <p>Web accessibility is about making websites and applications usable by everyone, including people with disabilities. It's not just a nice-to-have feature—it's a necessity.</p>
      <h2>Semantic HTML</h2>
      <p>Using proper semantic HTML elements is the foundation of accessibility. Elements like <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, and <code>&lt;article&gt;</code> provide meaning to your content.</p>
      <h2>ARIA Attributes</h2>
      <p>Accessible Rich Internet Applications (ARIA) attributes can enhance accessibility when HTML alone isn't enough. However, use them sparingly and only when necessary.</p>
      <h2>Keyboard Navigation</h2>
      <p>Ensure your application can be fully navigated using only a keyboard. This is essential for users who can't use a mouse or touch screen.</p>
      <h2>Color Contrast</h2>
      <p>Sufficient color contrast between text and background is crucial for users with visual impairments. Use tools like the WebAIM Contrast Checker to verify your color choices.</p>
      <h2>Testing</h2>
      <p>Regular testing with screen readers and other assistive technologies is vital. Involve users with disabilities in your testing process whenever possible.</p>
    `,
    coverImage:
      'https://images.unsplash.com/photo-1617695103177-dd81de85ccd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    author: {
      id: 'user-6',
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    createdAt: '2023-06-18T09:20:00Z',
    updatedAt: '2023-06-18T09:20:00Z',
    tags: ['Accessibility', 'Web Development', 'HTML'],
    likes: 189,
    comments: [
      {
        id: 'comment-4',
        author: {
          id: 'user-7',
          name: 'Sophia Garcia',
          avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
        },
        content:
          'As someone who works with visually impaired users, I appreciate this focus on accessibility!',
        createdAt: '2023-06-19T11:35:00Z',
      },
      {
        id: 'comment-5',
        author: {
          id: 'user-8',
          name: 'Robert Taylor',
          avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
        },
        content:
          "I've been implementing these practices in my recent project. It takes extra effort but is definitely worth it.",
        createdAt: '2023-06-20T15:42:00Z',
      },
    ],
    readTime: 6,
  },
  {
    id: 'blog-4',
    title: 'Introduction to TypeScript',
    excerpt:
      'Why TypeScript is becoming the preferred language for modern web development.',
    content: `
      <p>TypeScript has been gaining massive popularity in recent years, and for good reason. It adds static typing to JavaScript, helping catch errors early in the development process.</p>
      <h2>What is TypeScript?</h2>
      <p>TypeScript is a superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and other features that make large-scale JavaScript applications more manageable.</p>
      <h2>Benefits of TypeScript</h2>
      <p>TypeScript offers several advantages over plain JavaScript:</p>
      <ul>
        <li>Static typing</li>
        <li>Better IDE support with intelligent code completion</li>
        <li>Easier refactoring</li>
        <li>More explicit code that's easier to understand</li>
      </ul>
      <h2>Getting Started</h2>
      <p>To start using TypeScript, you'll need to install it via npm:</p>
      <pre><code>npm install -g typescript</code></pre>
      <h2>Basic Types</h2>
      <p>TypeScript includes several basic types like string, number, boolean, array, and more. Here's a simple example:</p>
      <pre><code>let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let hobbies: string[] = ["reading", "coding", "hiking"];</code></pre>
      <h2>Interfaces</h2>
      <p>Interfaces are one of TypeScript's most powerful features, allowing you to define the shape of objects:</p>
      <pre><code>interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;  // Optional property
}</code></pre>
    `,
    coverImage:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    author: {
      id: 'user-9',
      name: 'Olivia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
    createdAt: '2023-07-05T16:30:00Z',
    updatedAt: '2023-07-06T10:15:00Z',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    likes: 214,
    comments: [
      {
        id: 'comment-6',
        author: {
          id: 'user-10',
          name: 'William Brown',
          avatar: 'https://randomuser.me/api/portraits/men/83.jpg',
        },
        content:
          "I switched to TypeScript last year and haven't looked back. The type safety alone has saved me countless hours of debugging.",
        createdAt: '2023-07-06T14:22:00Z',
      },
    ],
    readTime: 8,
  },
  {
    id: 'blog-5',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt:
      'Understanding the strengths and use cases of CSS Grid and Flexbox for modern layouts.',
    content: `
      <p>CSS Grid and Flexbox are powerful layout systems that have transformed how we design web pages. But when should you use each one?</p>
      <h2>Flexbox: One-Dimensional Layout</h2>
      <p>Flexbox is designed for one-dimensional layouts—either a row or a column. It's perfect for:</p>
      <ul>
        <li>Navigation menus</li>
        <li>Form elements</li>
        <li>Card layouts with variable content</li>
        <li>Centering elements</li>
      </ul>
      <h2>CSS Grid: Two-Dimensional Layout</h2>
      <p>CSS Grid is designed for two-dimensional layouts—rows and columns together. It excels at:</p>
      <ul>
        <li>Page layouts</li>
        <li>Complex grid systems</li>
        <li>Overlapping elements</li>
        <li>Responsive designs without media queries</li>
      </ul>
      <h2>Using Them Together</h2>
      <p>CSS Grid and Flexbox are not competing technologies—they're complementary. A common approach is to use Grid for the overall page layout and Flexbox for the components within that layout.</p>
      <h2>Example: Grid for Page Layout</h2>
      <pre><code>.container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
header { grid-column: 1 / -1; }
main { grid-column: 2 / 3; }
aside { grid-column: 3 / 4; }
footer { grid-column: 1 / -1; }</code></pre>
      <h2>Example: Flexbox for Component Layout</h2>
      <pre><code>.card {
  display: flex;
  flex-direction: column;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>
    `,
    coverImage:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    author: {
      id: 'user-11',
      name: 'Daniel Lee',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    },
    createdAt: '2023-07-22T11:10:00Z',
    updatedAt: '2023-07-22T11:10:00Z',
    tags: ['CSS', 'Web Design', 'Frontend'],
    likes: 178,
    comments: [
      {
        id: 'comment-7',
        author: {
          id: 'user-12',
          name: 'Emma Thompson',
          avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
        },
        content:
          "This cleared up my confusion about when to use each! I've been overusing Flexbox for everything.",
        createdAt: '2023-07-23T09:45:00Z',
      },
      {
        id: 'comment-8',
        author: {
          id: 'user-13',
          name: 'Noah Wilson',
          avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
        },
        content:
          "Great explanation of how they can work together. I've been using this approach in my projects with great results.",
        createdAt: '2023-07-24T13:17:00Z',
      },
    ],
    readTime: 6,
  },
]
