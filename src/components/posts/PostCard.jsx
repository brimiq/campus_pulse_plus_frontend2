import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Calendar,
  MessageSquare,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const response = await fetch(`${apiUrl}/api/posts/${post.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      toast.success("Post deleted!", { duration: 2000 });
      window.location.reload(); // Or better, refresh parent list
    } else {
      toast.error("Failed to delete post", { duration: 3000 });
    }
  };
