import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { AuthContext } from "../context/AuthContext";
import Gallery from "../components/Gallery";
import UploadWindow from "../components/UploadWindow";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <div className="bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">  
          <h2 className="text-2xl font-bold mb-4 text-center textall text-gray-900">
            Інформація про користувача
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500 ">
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500 ">
                  <strong>ID:</strong> {user.id}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500 ">
                  <strong>Дата створення:</strong>{" "}
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg pt-3 pb-3 pr-6 pl-6">
          <div className=" flex items-center">
            <h2 className="text-2xl font-bold flex-grow text-center">Мої фотографії</h2>
            <button onClick={() => setIsWindowOpen(true)} className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Додати фото
            </button>
          </div>
        </div>
        <Gallery userId={user.id} />
          <UploadWindow
            isOpen={isWindowOpen}
            onClose={() => setIsWindowOpen(false)}
            userId={user.id}
          />
      </div>
    </>
  );
}