import React, { useState } from "react";
import axios from "axios";

function CloudinaryUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", 1); // Replace with real userId

    setUploading(true);
    try {
      const res = await axios.post("http://https://hospital-management-backend-mqyh.onrender.com/api/upload", formData);
      alert("Uploaded: " + res.data.imageUrl);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">{uploading ? "Uploading..." : "Upload"}</button>
    </form>
  );
}

export default CloudinaryUpload;
