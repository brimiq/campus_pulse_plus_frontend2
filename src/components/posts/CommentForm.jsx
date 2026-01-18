import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Image as ImageIcon, X, Upload } from "lucide-react";

export default function CommentForm({ postId, refresh }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageModal, setImageModal] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      setUploadedFile(file);
      setImageUrl(URL.createObjectURL(file));
      toast.success("Image selected!");
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };