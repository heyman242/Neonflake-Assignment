import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "react-router-dom";

const MainPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleFileInputChange = (e, fileType) => {
    const file = e.target.files[0];

    if (file && file.size > 10000000000) {
      toast.error("File size too large");
      return;
    }

    if (fileType === "thumbnail") {
      setThumbnailFile(file);
    }
  };

  const uploadThumbnail = async (e) => {
    e.preventDefault();

    if (title && description && thumbnailFile) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnailFile);

      try {
        const response = await axios.post("/api/v1/user/upload", formData);
        if (response.status === 201) {
          toast.success("Thumbnail Upload successful");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.error("Please fill in all fields and select a thumbnail file");
    }
  };

  return (
    <div>
      <Form className="form" encType="multipart/form-data">
        <h2>Upload Thumbnail</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => handleFileInputChange(e, "thumbnail")}
        />
        <button onClick={uploadThumbnail}>Upload Thumbnail</button>
      </Form>
    </div>
  );
};

export default MainPage;
