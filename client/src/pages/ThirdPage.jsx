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
    <div >
      <h1 className="text-2xl font-bold mb-4 text-center">Video Player</h1>
      <div className=" flex items-center justify-center p-1">
        {videoUrl ? (
          <video
            controls
            style={{
              width: "600px",
              height: "600px",
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </div>
  );
};

export default ThirdPage;
