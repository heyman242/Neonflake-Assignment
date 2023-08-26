import { useState, useEffect } from "react";
import axios from "axios";
const SecondPage = () => {
  const [uploads, setUploads] = useState([]);

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
            <strong>Thumbnail URL:</strong> <img src={upload.thumbnailUrl}/>
            <br />
           
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SecondPage