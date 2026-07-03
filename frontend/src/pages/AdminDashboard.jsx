import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data.users);
  };

  const fetchBlogs = async () => {
    const res = await API.get("/users/admin/all-blogs");
    setBlogs(res.data.blogs);
  };

  const changeRole = async (id, role) => {
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
      <h2>Admin Dashboard</h2>

      <h3>All Users</h3>

      {users.map((user) => (
        <div className="card" key={user._id}>
          <p>Name: {user.name}</p>
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

      <h3>All Blogs</h3>

      {blogs.map((blog) => (
        <div className="card" key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content.slice(0, 100)}...</p>
          <p>Author: {blog.author?.name}</p>
          <p>Status: {blog.status}</p>

          {blog.status === "Pending" && (
            <>
              <button onClick={() => approveBlog(blog._id)}>Approve</button>
              <button onClick={() => rejectBlog(blog._id)}>Reject</button>
            </>
          )}

          <button onClick={() => deleteBlog(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
