import './Lesson07Styles.css';
import { useState } from 'react';
import { getSinglePost } from './api';

export default function FetchOnClick() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetPost = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getSinglePost(1);
      setPost(data);
    } catch (err) {
      setError('Failed to load post. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Single Post</h1>

      <button onClick={handleGetPost} disabled={loading}>
        {loading ? 'Loading...' : 'Get Post'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
}
