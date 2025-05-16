import { useState } from "react";
import { supabase } from "../supabase";

export default function UploadWindow({ isOpen, onClose, userId }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    console.log("Selected files:", Array.from(e.target.files).map(file => file.name));
  };

  const handleUpload = async () => {
    try {
      console.log("User ID:", userId);
      console.log("Files to upload:", Array.from(files).map(file => file.name));
      for (const file of files) {
        const filePath = `user-${userId}/${Date.now()}-${file.name}`;
        console.log("Uploading to path:", filePath);
        console.log("File object:", file);
        const { error: uploadError, data } = await supabase.storage
          .from("user-photos")
          .upload(filePath, file);
        console.log("Upload response:", data);
        if (uploadError) {
          console.error("Upload error details:", uploadError);
          throw uploadError; // Throw the error to catch it below
        }

        await supabase.from("photos").insert({
          user_id: userId,
          path: filePath,
        });
      }
      setFiles([]);
      onClose();
      window.location.reload();
    } catch (err) {
      setError(err.message);
      console.error("Upload error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-lg font-bold">Додати фото</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="photoUpload" className="block text-sm font-medium mb-2">
              Виберіть фото для завантаження
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors relative"
              id="dropZone"
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="photoUpload"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Перетягніть файли сюди або{" "}
                <span className="text-blue-500">виберіть з комп'ютера</span>
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Підтримуються формати: JPG, PNG, GIF
              </p>
            </div>
          </div>
          {files.length > 0 && (
            <div id="selectedFiles" className="mb-4">
              <h4 className="text-sm font-medium mb-2">Вибрані файли:</h4>
              <ul id="fileList" className="text-sm text-gray-600 space-y-1">
                {Array.from(files).map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>
        <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="btn-secondary px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          >
            Скасувати
          </button>
          <button
            onClick={handleUpload}
            className="btn-primary px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={files.length === 0}
          >
            Завантажити
          </button>
        </div>
      </div>
    </div>
  );
}