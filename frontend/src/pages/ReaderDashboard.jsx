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
      <h2>Reader Dashboard</h2>
      <h3>Approved Blogs</h3>

      {blogs.map((blog) => (
        <div className="card" key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content.slice(0, 100)}...</p>
          <p>Category: {blog.category}</p>
          <p>Author: {blog.author?.name}</p>
          <Link to={`/blogs/${blog._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}

export default ReaderDashboard;
