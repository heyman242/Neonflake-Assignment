import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Form, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const MainPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

  const handleFileInputChange = (e, fileType) => {
    const file = e.target.files[0];

    if (file && file.size > 10000000000) {
      toast.error("File size too large");
      return;
    }

    if (fileType === "thumbnail") {
      setThumbnailFile(file);
    }
    if (fileType === "video") {
      setVideoFile(file);
    }
  };

  const uploadFiles = async (e) => {
    e.preventDefault();

    if (title && description && thumbnailFile && videoFile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnailFile);
      formData.append("video", videoFile);

      try {
        const response = await axios.post("/api/v1/user/upload", formData);
        if (response.status === 201) {
          toast.success("Upload successful");
          setTitle("");
          setDescription("");
          setThumbnailFile(null);
          setVideoFile(null);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false); 
      }
    } else {
      toast.error("Please fill in all fields and select files");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <Form className="space-y-4" encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2 text-center">
            Title
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2 text-center">
            Description
          </label>
          <input
            className="w-full px-6 py-6 border rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2 text-center">
            Thumbnail (Image)
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) => handleFileInputChange(e, "thumbnail")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2 text-center">
            Video
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            type="file"
            name="video"
            accept="video/*"
            onChange={(e) => handleFileInputChange(e, "video")}
          />
        </div>
        <button
          type="button"
          className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg ${
            isLoading ? "bg-opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={uploadFiles}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <FaSpinner className="animate-spin h-5 w-5 mr-3" />
              Processing...
            </div>
          ) : (
            "Upload"
          )}
        </button>
      </Form>
      <br />
      <Link
        to="upload/list"
        className="w-full bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
      >
        See Uploads
      </Link>
    </div>
  );
};

export default MainPage;
