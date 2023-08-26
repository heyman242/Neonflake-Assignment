import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SecondPage = () => {
  const [uploads, setUploads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/user/uploads")
      .then((response) => {
        if (response.status === 200) {
          setUploads(response.data.uploads);
        }
      })
      .catch((error) => {
        console.error("Error fetching uploads:", error);
      });
  }, []);

  const watchVideo = (jobId) => {
    axios
      .get(`/api/v1/user/uploads/${jobId}`)
      .then((response) => {
        if (response.status === 200) {
          const videoUrl = response.data.videoUrl;
          // Redirect to ThirdPage with the jobId as a route parameter
          navigate(`/dashboard/upload/${jobId}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching video:", error);
      });
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {uploads.map((upload, index) => (
          <li key={index}>
            <strong>Title:</strong> {upload.title}
            <br />
            <strong>Description:</strong> {upload.description}
            <br />
            <strong>Thumbnail URL:</strong>{" "}
            <img src={upload.thumbnailUrl} alt="Thumbnail" />
            <br />
            <button onClick={() => watchVideo(upload._id)}>Watch</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecondPage;
