import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ThirdPage = () => {
  const { jobId } = useParams();
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    axios
      .get(`/api/v1/user/uploads/${jobId}`)
      .then((response) => {
        if (response.status === 200) {
          setVideoUrl(response.data.videoUrl);
        }
      })
      .catch((error) => {
        console.error("Error fetching video:", error);
      });
  }, [jobId]);

  return (
    <div>
      <h2>Video Player</h2>
      {videoUrl ? (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default ThirdPage;
