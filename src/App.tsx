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
  const [posts, setPosts] = useState<PostType[]>([
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
  ]);
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
