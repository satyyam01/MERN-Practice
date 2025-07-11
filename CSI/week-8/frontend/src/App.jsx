import { useState, useEffect } from 'react';
import { getPosts, createPost, updatePost, deletePost } from './api/posts';
import { signup, login } from './api/auth';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import PostList from './components/PostList';
import PostEditor from './components/PostEditor';

function getStoredUser() {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return user && token ? { ...JSON.parse(user), token } : null;
}

export default function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [user, setUser] = useState(getStoredUser());
  const [showEditor, setShowEditor] = useState(false);
  const [editorInitial, setEditorInitial] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    getPosts().then(res => setPosts(res.data)).catch(() => setPosts([]));
  }, []);

  const handleAuth = async (form) => {
    try {
      const res = authType === 'signup' ? await signup(form) : await login(form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      setUser({ ...res.data.user, token: res.data.token });
      setShowAuth(false);
      setMessage('Logged in successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Auth failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setMessage('Logged out.');
  };

  const handleCreate = async (data) => {
    try {
      const res = await createPost(data, user.token);
      setPosts([res.data, ...posts]);
      setShowEditor(false);
      setMessage('Post created!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Create failed');
    }
  };

  const handleEdit = async (data) => {
    try {
      const res = await updatePost(selectedPost._id, data, user.token);
      setPosts(posts.map(p => (p._id === selectedPost._id ? res.data : p)));
      setSelectedPost(res.data);
      setShowEditor(false);
      setMessage('Post updated!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(selectedPost._id, user.token);
      setPosts(posts.filter(p => p._id !== selectedPost._id));
      setSelectedPost(null);
      setMessage('Post deleted!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <Navbar
        user={user}
        onLogin={() => { setShowAuth(true); setAuthType('login'); }}
        onSignup={() => { setShowAuth(true); setAuthType('signup'); }}
        onLogout={handleLogout}
      />
      {message && <div>{message}</div>}
      {showAuth && (
        <AuthForm type={authType} onSubmit={handleAuth} />
      )}
      <hr />
      {user && (
        <button onClick={() => { setShowEditor(true); setEditorInitial({}); }}>Create Post</button>
      )}
      <PostList posts={posts} onSelect={setSelectedPost} />
      {selectedPost && (
        <div>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.content}</p>
          <div>Categories: {selectedPost.categories?.join(', ')}</div>
          {user && selectedPost.author?._id === user.id && (
            <>
              <button onClick={() => { setShowEditor(true); setEditorInitial(selectedPost); }}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      )}
      {showEditor && (
        <PostEditor
          initial={editorInitial}
          submitLabel={editorInitial._id ? 'Update' : 'Create'}
          onSubmit={editorInitial._id ? handleEdit : handleCreate}
        />
      )}
    </div>
  );
}
