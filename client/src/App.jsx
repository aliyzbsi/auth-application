import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useUserContext } from "./context/userContext";
import UserList from "./components/UserList";
import Home from "./pages/Home";
import Product from "./components/Product";

function App() {
  const { user } = useUserContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {user ? (
          <>
            <Route path="/users" element={<UserList />} />
            <Route path="/product-add" element={<Product />} />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </>
  );
}

export default App;
