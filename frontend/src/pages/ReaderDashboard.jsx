import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function ReaderDashboard() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await API.get("/blogs/approved");
    setBlogs(res.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h2>Reader Dashboard</h2>
        <p>Read approved blogs from different authors</p>
      </div>

      <div className="grid">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <span className="category">{blog.category}</span>
            <h3>{blog.title}</h3>
            <p>{blog.content.slice(0, 120)}...</p>

            <div className="blog-meta">
              <span>Author: {blog.author?.name}</span>
              <span>Likes: {blog.likes?.length || 0}</span>
              <span>Dislikes: {blog.dislikes?.length || 0}</span>
            </div>

            <Link to={`/blogs/${blog._id}`} className="read-btn">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReaderDashboard;