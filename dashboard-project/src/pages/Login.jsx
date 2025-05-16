import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      navigate("/dashboard");
    } catch (err) {
      setError("Неправильний email або пароль");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white  p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 ">Вхід</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 ">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email обов'язковий" })}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 ">Пароль</label>
          <input
            type="password"
            {...register("password", { required: "Пароль обов'язковий" })}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Увійти
        </button>
        <p className="mt-4 text-center">
          <Link to="/reset-password" className="text-blue-500 hover:underline">
            Забули пароль?
          </Link>
        </p>
      </form>
    </div>
  );
}