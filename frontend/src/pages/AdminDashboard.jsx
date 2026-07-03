import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("blog_user"));

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data.users);
  };

  const fetchBlogs = async () => {
    const res = await API.get("/users/admin/all-blogs");
    setBlogs(res.data.blogs);
  };

  const changeRole = async (id, role) => {
    if (currentUser && currentUser.id === id) {
      alert("You cannot change your own Admin role from here");
      return;
    }

    await API.put(`/users/${id}/role`, { role });
    fetchUsers();
  };

  const approveBlog = async (id) => {
    await API.put(`/blogs/${id}/approve`);
    fetchBlogs();
  };

  const rejectBlog = async (id) => {
    await API.put(`/blogs/${id}/reject`);
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    await API.delete(`/blogs/${id}`);
    fetchBlogs();
  };

  useEffect(() => {
    fetchUsers();
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <div className="page-header admin-header">
        <h2>Admin Dashboard</h2>
        <p>Manage users, roles, blogs, and approval workflow</p>
      </div>

      <h3 className="section-title">All Users</h3>

      <div className="grid">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>

            <select
              value={user.role}
              onChange={(e) => changeRole(user._id, e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Author">Author</option>
              <option value="Reader">Reader</option>
            </select>
          </div>
        ))}
      </div>

      <h3 className="section-title">All Blogs</h3>

      <div className="grid">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <span className={`status ${blog.status.toLowerCase()}`}>
              {blog.status}
            </span>

            <h3>{blog.title}</h3>
            <p>{blog.content.slice(0, 120)}...</p>

            <div className="blog-meta">
              <span>Author: {blog.author?.name}</span>
              <span>Likes: {blog.likes?.length || 0}</span>
              <span>Dislikes: {blog.dislikes?.length || 0}</span>
            </div>

            <div className="action-row">
              {blog.status === "Pending" && (
                <>
                  <button onClick={() => approveBlog(blog._id)} className="approve-btn">
                    Approve
                  </button>

                  <button onClick={() => rejectBlog(blog._id)} className="reject-btn">
                    Reject
                  </button>
                </>
              )}

              <button onClick={() => deleteBlog(blog._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;