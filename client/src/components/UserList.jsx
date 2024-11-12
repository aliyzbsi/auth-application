import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Kullanıcıları almak için API'ye istek atın
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/api/auth/users"
        );
        setUsers(response.data);
      } catch (err) {
        setError("Kullanıcıları alırken bir hata oluştu", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Kullanıcı Listesi</h2>
      <button onClick={() => navigate("/product-add")}>Ürün Ekle</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
