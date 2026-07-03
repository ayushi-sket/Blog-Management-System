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
      <h2>Author Dashboard</h2>

      <Link to="/create-blog" className="btn-link">
        Create New Blog
      </Link>

      {blogs.map((blog) => (
        <div className="card" key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content.slice(0, 100)}...</p>
          <p>Category: {blog.category}</p>
          <p>Status: {blog.status}</p>

          <Link to={`/edit-blog/${blog._id}`}>Edit</Link>

          <button onClick={() => deleteBlog(blog._id)}>Delete</button>

          {blog.status === "Draft" || blog.status === "Rejected" ? (
            <button onClick={() => submitBlog(blog._id)}>
              Submit for Approval
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default AuthorDashboard;
