import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: ""
  });

  const fetchBlog = async () => {
    const res = await API.get(`/blogs/${id}`);

    setForm({
      title: res.data.blog.title,
      content: res.data.blog.content,
      category: res.data.blog.category
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateBlog = async (e) => {
    e.preventDefault();

    await API.put(`/blogs/${id}`, form);
    navigate("/author");
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="container">
      <h2>Edit Blog</h2>

      <form onSubmit={updateBlog} className="form">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
        ></textarea>

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
        />

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
