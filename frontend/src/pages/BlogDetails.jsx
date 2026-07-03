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

  const dislikeBlog = async () => {
    await API.put(`/blogs/${id}/dislike`);
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
      <div className="details-card">
        <h2>{blog.title}</h2>
        <p className="blog-content">{blog.content}</p>

        <div className="blog-meta">
          <span>Category: {blog.category}</span>
          <span>Author: {blog.author?.name}</span>
          <span>Status: {blog.status}</span>
        </div>

        <div className="reaction-box">
          <button className="like-btn" onClick={likeBlog}>
            Like ({blog.likes?.length || 0})
          </button>

          <button className="dislike-btn" onClick={dislikeBlog}>
            Dislike ({blog.dislikes?.length || 0})
          </button>
        </div>
      </div>

      <div className="comment-section">
        <h3>Comments</h3>

        <form onSubmit={addComment} className="form comment-form">
          <input
            type="text"
            placeholder="Write your comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit">Add Comment</button>
        </form>

        {comments.map((comment) => (
          <div className="comment-card" key={comment._id}>
            <p>{comment.text}</p>
            <small>By: {comment.user?.name}</small>
            <br />
            <button onClick={() => deleteComment(comment._id)}>
              Delete Comment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogDetails;