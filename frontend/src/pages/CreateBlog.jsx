import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    status: "Draft"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createBlog = async (e) => {
    e.preventDefault();

    await API.post("/blogs", form);
    navigate("/author");
  };

  return (
    <div className="container">
      <h2>Create Blog</h2>

      <form onSubmit={createBlog} className="form">
        <input
          type="text"
          name="title"
          placeholder="Blog title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="content"
          placeholder="Blog content"
          value={form.content}
          onChange={handleChange}
        ></textarea>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Draft">Draft</option>
          <option value="Pending">Submit for Approval</option>
        </select>

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;
