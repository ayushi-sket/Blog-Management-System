import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function AuthorDashboard() {
  const [blogs, setBlogs] = useState([]);

  const fetchMyBlogs = async () => {
    const res = await API.get("/blogs/my-blogs");
    setBlogs(res.data.blogs);
  };

  const deleteBlog = async (id) => {
    await API.delete(`/blogs/${id}`);
    fetchMyBlogs();
  };

  const submitBlog = async (id) => {
    await API.put(`/blogs/${id}/submit`);
    fetchMyBlogs();
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h2>Author Dashboard</h2>
        <p>Create, edit, submit, and manage your own blogs</p>
      </div>

      <Link to="/create-blog" className="create-btn">
        Create New Blog
      </Link>

      <div className="grid">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <span className={`status ${blog.status.toLowerCase()}`}>
              {blog.status}
            </span>

            <h3>{blog.title}</h3>
            <p>{blog.content.slice(0, 120)}...</p>

            <div className="blog-meta">
              <span>Category: {blog.category}</span>
              <span>Likes: {blog.likes?.length || 0}</span>
              <span>Dislikes: {blog.dislikes?.length || 0}</span>
            </div>

            <div className="action-row">
              <Link to={`/edit-blog/${blog._id}`} className="edit-btn">
                Edit
              </Link>

              <button onClick={() => deleteBlog(blog._id)} className="delete-btn">
                Delete
              </button>

              {(blog.status === "Draft" || blog.status === "Rejected") && (
                <button onClick={() => submitBlog(blog._id)} className="submit-btn">
                  Submit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorDashboard;