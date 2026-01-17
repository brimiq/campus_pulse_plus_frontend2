import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchPosts from "../hooks/useFetchPosts";
import PostCard from "../components/posts/PostCard";
import Footer from "../components/layout/Footer";

const Posts = () => {
  const { posts, loading, error } = useFetchPosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (posts) {
      let filtered = posts.filter((post) =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Sort posts
      filtered.sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.created_at) - new Date(a.created_at);
        } else if (sortBy === "oldest") {
          return new Date(a.created_at) - new Date(b.created_at);
        }
        return 0;
      });

      setFilteredPosts(filtered);
    }
  }, [posts, searchTerm, sortBy]);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">Error loading posts</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }
