# The Point of React Query library

React Query is a library that helps you fetch, cache and update data in your React applications. It will save you a lot of time and headaches managing all this state in your components.

## Example

Given a simple async function that fetches some data:

```js
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  return posts;
};
```

The old way of fetching data in React would be to use the `useState` and `useEffect` hook to fetch the data and store it in state together with a loading flag and an error flag:

```js
import { useEffect, useState } from "react";

const [posts, setPosts] = useState([]);
const [error, setError] = useState(null);
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
```

Then use the state in your component:

```js
return (
  <div className="App">
    {isLoading && <p>Loading...</p>}
    {error && <p className="error">{error.message}</p>}
    {posts.map((post) => (
      <div className="post" key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    ))}
  </div>
);
```

With React Query, you can do the same thing with much less code:

```js
import { useQuery } from "react-query";

const { data: posts, error, isLoading } = useQuery("posts", fetchPosts);
```
