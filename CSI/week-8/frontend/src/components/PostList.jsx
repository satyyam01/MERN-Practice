export default function PostList({ posts, onSelect }) {
  return (
    <div>
      {posts.map(post => (
        <div key={post._id} onClick={() => onSelect(post)}>
          <h2>{post.title}</h2>
          <p>{post.content.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
} 