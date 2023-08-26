import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SecondPage = () => {
  const [uploads, setUploads] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
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
          navigate(`/dashboard/upload/${jobId}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching video:", error);
      });
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-center underline">
        Uploaded Files
      </h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Thumbnail</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploads.map((upload, index) => (
            <tr key={index} className="border-t border-gray-300">
              <td className="p-2 text-lg font-semibold">{upload.title}</td>
              <td className="p-2 text-lg font-semibold">
                {upload.description}
              </td>
              <td
                className="p-2 cursor-pointer"
                onClick={() => openImageModal(upload.thumbnailUrl)}
              >
                <img
                  src={upload.thumbnailUrl}
                  alt="Thumbnail"
                  className="w-30 h-20 object-cover"
                />
              </td>
              <td className="p-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => watchVideo(upload._id)}
                >
                  Watch
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="relative p-6 flex-auto">
                <img src={selectedImage} alt="Selected" />
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeImageModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondPage;
