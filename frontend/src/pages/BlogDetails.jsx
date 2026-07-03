import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchBlog = async () => {
    const res = await API.get(`/blogs/${id}`);
    setBlog(res.data.blog);
    setComments(res.data.comments);
  };

  const addComment = async (e) => {
    e.preventDefault();

    await API.post(`/comments/${id}`, { text });
    setText("");
    fetchBlog();
  };

  const deleteComment = async (commentId) => {
    await API.delete(`/comments/${commentId}`);
    fetchBlog();
  };

  const likeBlog = async () => {
    await API.put(`/blogs/${id}/like`);
    fetchBlog();
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (!blog) {
    return <h2 className="container">Loading...</h2>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
        <p>Category: {blog.category}</p>
        <p>Author: {blog.author?.name}</p>
        <p>Likes: {blog.likes?.length}</p>

        <button onClick={likeBlog}>Like / Unlike</button>
      </div>

      <h3>Comments</h3>

      <form onSubmit={addComment} className="form">
        <input
          type="text"
          placeholder="Write comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">Add Comment</button>
      </form>

      {comments.map((comment) => (
        <div className="card" key={comment._id}>
          <p>{comment.text}</p>
          <p>By: {comment.user?.name}</p>
          <button onClick={() => deleteComment(comment._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default BlogDetails;
