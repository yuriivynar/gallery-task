import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useForm } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      setSuccess("Реєстрація успішна! Перевірте пошту для підтвердження.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white  p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 ">Реєстрація</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 ">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email обов'язковий", pattern: { value: /^\S+@\S+$/i, message: "Невірний формат email" } })}
            className="w-full p-2 border rounded "
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 ">Пароль</label>
          <input
            type="password"
            {...register("password", { required: "Пароль обов'язковий", minLength: { value: 6, message: "Мінімум 6 символів" } })}
            className="w-full p-2 border rounded "
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Зареєструватися
        </button>
      </form>
    </div>
  );
}