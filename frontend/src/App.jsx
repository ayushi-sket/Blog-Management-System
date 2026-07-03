import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReaderDashboard from "./pages/ReaderDashboard";
import AuthorDashboard from "./pages/AuthorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

function App() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <h2>Blog Management</h2>

        <div>
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              {user.role === "Reader" && <Link to="/reader">Reader</Link>}
              {user.role === "Author" && <Link to="/author">Author</Link>}
              {user.role === "Admin" && <Link to="/admin">Admin</Link>}
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/reader" element={<ReaderDashboard />} />
        <Route path="/author" element={<AuthorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </>
  );
}

export default App;