import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";


import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [page, setPage] = useState("login");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      setPage("login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setPage("login");
  };

  return (
    <div className="app-root">
      <Navbar loggedIn={loggedIn} onLogout={logout} />

      {!loggedIn && page === "login" && (
        <Login
          setLoggedIn={setLoggedIn}
          goRegister={() => setPage("register")}
        />
      )}

      {!loggedIn && page === "register" && (
        <Register
          setLoggedIn={setLoggedIn}
          goLogin={() => setPage("login")}
        />
      )}

      {loggedIn && <Dashboard />}
    </div>
  );
}

export default App;
