import { useState } from "react";
import { supabase } from "../supabase";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: "http://localhost:5173/update-password",
      });
      if (error) throw error;
      setSuccess("Лист для відновлення пароля відправлено!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white  p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 ">Відновлення пароля</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 ">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email обов'язковий" })}
            className="w-full p-2 border rounded "
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Відправити
        </button>
      </form>
    </div>
  );
}