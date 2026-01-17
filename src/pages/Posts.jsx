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
