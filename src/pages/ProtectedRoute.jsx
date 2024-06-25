import axios from "axios";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UseUserContext } from "../../context/userContext";
export default function ProtectedRoute({ children }) {
  const { user, setUser } = UseUserContext();
  console.log("🚀 ~ ProtectedRoute ~ user:", user);
  const getUser = async () => {
    try {
      const res = await axios.post(
        "https://restaurant-backend-drab.vercel.app/api/v1/user/get-user",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setUser(res.data.data.user);
      } else {
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      console.log("🚀 ~ getUser ~ error:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return null;
  }
}
