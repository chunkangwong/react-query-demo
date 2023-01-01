import { useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";

interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  return posts as PostType[];
};

function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchPosts()
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {isLoading && (
        <img src={reactLogo} className="logo react" alt="React logo" />
      )}
      {error && <p className="error">{error.message}</p>}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default App;

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => (
  <div className="post">
    <h2>{post.title}</h2>
    <p>{post.body}</p>
  </div>
);
