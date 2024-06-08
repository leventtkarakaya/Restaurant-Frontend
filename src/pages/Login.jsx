import React from "react";
import Logo from "../../public/Logo.png";
import axios from "axios";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleValueChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
    console.log(loginFormData);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://restaurant-backend-seven.vercel.app/api/v1/user/login",
          {
            email: loginFormData.email,
            password: loginFormData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setUploading(false);
          console.log("🚀 ~ .then ~ response:", response);
          if (response.data.success === true) {
            localStorage.setItem("token", response.data.data.token);
            localStorage.getItem("userToken");
            toast.success("Giriş Yapıldı");
            navigate("/");
          } else {
            toast.error("Giriş Yapılamadı");
          }
          if (uploading === false) {
            toast.success("Başarıyla Giriş Yapıldı");
          }
        });
    } catch (error) {
      console.log(error, "Login Error");
    }
  };
  return (
    <>
      <div className="login">
        <div className="h-screen pt-[16vh]">
          <form
            onSubmit={handleOnSubmit}
            className="ease-in-out duration-300 w-[100%] sm:w-max shadow-sm backdrop-blur-md bg-blue-400/30 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5"
          >
            <NavLink to="/">
              <img
                src={Logo}
                alt="logo"
                width={200}
                height={200}
                className="mb-6 cursor-pointer logo"
              />
            </NavLink>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="w-full px-3 py-2 leading-tight border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                value={loginFormData.email}
                onChange={handleValueChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Şifre
              </label>
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                className="w-full px-3 py-2 leading-tight border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                value={loginFormData.password}
                onChange={handleValueChange}
              />
            </div>
            <button className="bg-[#03396c] text-white p-2 rounded-md active:scale-90 transition  duration-300 transform hover:shadow-xl shadow-md w-full px-8 py-2 text-xl font-medium">
              Giriş Yap
            </button>
            <Link
              to={"/register"}
              className="text-[#4e5e69] text-center font-semibold w-full mb-3 py-2 px-4 rounded mt-2"
            >
              Hesabınız yok mu? Hesap oluşturun
            </Link>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
}
