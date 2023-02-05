import { useQuery } from "@tanstack/react-query";
import "./App.css";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  return posts as Post[];
};

function App() {
  const { data: posts, error, isLoading } = useQuery(["posts"], fetchPosts);

  return (
    <div className="App">
      <>
        {isLoading && <p>Loading...</p>}
        {error && <p className="error">{(error as Error).message}</p>}
        {posts &&
          posts.map((post) => (
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
      </>
    </div>
  );
}

export default App;
