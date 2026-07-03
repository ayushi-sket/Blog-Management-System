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

  const user = JSON.parse(localStorage.getItem("blog_user"));

  const logout = () => {
    localStorage.removeItem("blog_token");
    localStorage.removeItem("blog_user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <h2>BlogSphere</h2>

        <div className="nav-links">
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
              <button onClick={logout} className="logout-btn">Logout</button>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/reader"
          element={user ? <ReaderDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/author"
          element={user ? <AuthorDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={user ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        <Route path="/blogs/:id" element={<BlogDetails />} />

        <Route
          path="/create-blog"
          element={user ? <CreateBlog /> : <Navigate to="/login" />}
        />

        <Route
          path="/edit-blog/:id"
          element={user ? <EditBlog /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;