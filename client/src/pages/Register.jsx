import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  // Form submit handler
  const onSubmit = async (data) => {
    try {
      // Kullanıcı verisini API'ye gönder
      const response = await axios.post(
        "http://localhost:5002/api/auth/register",
        data
      );
      console.log(response);
    } catch (err) {
      console.log(err.response?.data?.error || "Bir hata oluştu!"); // Hata mesajını al
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <button onClick={() => navigate("/login")}>Login</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Kullanıcı Adı:</label>
          <input
            id="username"
            type="text"
            {...register("username", { required: "Kullanıcı adı gereklidir" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email gereklidir" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Şifre:</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Şifre gereklidir" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <button type="submit">Kayıt Ol</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
