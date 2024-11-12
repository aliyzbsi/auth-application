import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useUserContext } from "../context/userContext";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5002/api/auth/login",
        data,
        { withCredentials: true }
      );
      // Backend'den gelen başarı mesajını alıp gösterebilirsiniz
      alert(response.data.message || "Giriş başarılı");
      navigate("/users");
      setUser(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Giriş başarısız!";
      alert(errorMessage); // Backend'den gelen hata mesajını göster
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" {...register("email")} required />
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        required
      />
      <button type="submit">Giriş Yap</button>
    </form>
  );
};

export default Login;
