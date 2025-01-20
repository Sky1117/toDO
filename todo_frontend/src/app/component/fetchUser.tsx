import { useEffect, useState } from "react";
import api from "../utils/api";

interface User {
  _id: string;
  name: string;
  email: string;
}

const FetchUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      try {
        const response = await api.get<User>("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching user.");
      }
    };

    fetchUser();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Loading user data...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default FetchUser;
