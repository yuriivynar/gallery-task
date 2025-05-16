import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../supabase";
// import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 shadow-md dark:bg-blue-800 p-4 flex justify-between items-center">
      <Link to={user ? "/dashboard" : "/"} className="text-white text-xl font-bold flex items-center p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        Your Gallery App
      </Link>
      <div className="flex items-center space-x-4">
        {/* <ThemeToggle /> */}
        {user ? (
          <>
            <Link to="/dashboard" className="text-white p-2 rounded hover:bg-blue-600">
              Головна
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white transition-colors">
              Вийти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white p-2 rounded hover:bg-blue-600">
              Вхід
            </Link>
            <Link to="/register" className="text-white p-2 rounded hover:bg-blue-600">
              Реєстрація
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}