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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b-4 border-black shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors mb-4"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-black text-gray-900">
                POST MANAGER
              </h1>
              <p className="text-gray-600 mt-1">
                Review and moderate student content
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {filteredPosts.length}
              </p>
              <p className="text-sm text-gray-600">Total Posts</p>
            </div>
          </div>
        </div>
      </div>
