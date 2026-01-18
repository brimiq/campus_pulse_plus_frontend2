import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import ReactionButtons from "./ReactionButton";
import { AuthContext } from "../../context/AuthContext";
import { Expand } from "lucide-react";
import Footer from "../layout/Footer";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [imageModal, setImageModal] = useState(null);

  async function fetchPost() {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}/api/posts/${id}`, {
      credentials: "include",
    });
    const data = await res.json();
    setPost(data);
  }

  useEffect(() => {
    fetchPost();
    const interval = setInterval(fetchPost, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [id]);