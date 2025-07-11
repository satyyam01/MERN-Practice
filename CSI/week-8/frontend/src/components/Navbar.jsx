export default function Navbar({ user, onLogin, onSignup, onLogout }) {
  return (
    <nav>
      <h2>MERN Blog</h2>
      {user ? (
        <>
          <span>Welcome, {user.username || user.email}!</span>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={onLogin}>Login</button>
          <button onClick={onSignup}>Sign Up</button>
        </>
      )}
    </nav>
  );
} 