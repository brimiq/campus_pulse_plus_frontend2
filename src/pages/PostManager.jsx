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
