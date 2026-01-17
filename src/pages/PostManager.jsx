import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";

export default function PostManager() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, statusFilter, categoryFilter]);

  async function fetchPosts() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

      // Get detailed posts for admin view
      const response = await fetch(`${apiUrl}/api/admin/posts/detailed`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        toast.error("Failed to fetch posts");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  function filterPosts() {
    let filtered = posts.filter((post) => {
      const matchesSearch = post.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" ||
        post.category_id === parseInt(categoryFilter);

      let matchesStatus = true;
      if (statusFilter === "pending") {
        matchesStatus = !post.admin_response;
      } else if (statusFilter === "responded") {
        matchesStatus = !!post.admin_response;
      }

      return matchesSearch && matchesCategory && matchesStatus;
    });

    setFilteredPosts(filtered);
  }

  function getStatusBadge(post) {
    if (!post.admin_response) {
      return (
        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Responded
        </span>
      );
    }
  }
