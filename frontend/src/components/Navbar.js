import "../styles/Navbar.css";

export default function Navbar({ loggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-left">To-Do List</div>

      <div className="nav-right">
        {loggedIn && (
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
