import React from "react";
import Avatar from "../../public/avatar.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
export default function page() {
  // ? image upload state
  const [image, setImage] = useState({});
  // ? image upload state
  const [uploading, setUploading] = useState(false);
  // ? form data state
  const [registerFormData, setRegisterFormData] = useState({
    name: String,
    email: String,
    password: String,
    passwordConfrim: String,
    profileImage: String,
  });
  // ? form data state function
  const handleChangeValue = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: String(e.target.value),
    });
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FormData();
    reader.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/all/upload-image",
        reader
      );
      setUploading(false);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/v1/user/register", {
          name: registerFormData.name,
          email: registerFormData.email,
          password: registerFormData.password,
          passwordConfrim: registerFormData.passwordConfrim,
          profileImage: image?.url,
        })
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          const { name, _id, isVerified } = response.data.data.user;
          const user = {
            name,
            _id,
            isVerified,
          };
          // ? set Local Storage User
          localStorage.setItem("userToken", JSON.stringify(user));
          // ? set local storage
          localStorage.setItem("token", response.data.data.token);
          // ? redirect
          if (response.data.success === true) {
            toast.success("Kayıt Oluşturuldu");
            window.location.href = "/login";
          }
        });
    } catch (error) {
      toast.error("Kayıt Oluşturulamadı");
    }
  };
  return (
    <>
      <div className="register">
        <div className="w-full h-screen mx-auto pt-[16vh]">
          <form
            onSubmit={handleOnSubmit}
            className="ease-in-out duration-300 w-[100%] sm:w-max shadow-sm backdrop-blur-md bg-blue-400/30 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5"
          >
            {/* Profil Resmi */}
            <label htmlFor="file-upload" className="custom-file-upload">
              <img
                alt="avatar"
                src={image?.url || Avatar}
                width={200}
                height={200}
                className="w-32 h-32 mx-auto bg-contain rounded-full cursor-pointer"
              />
            </label>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Profil Resmi
            </label>
            <input
              type="file"
              name="myFile"
              id="file-upload"
              label="Image"
              className="hidden"
              accept=" .jpg, .png, .jpeg, .gif, .webp"
              onChange={handleImage}
            />
            {/* Adınız */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Adınız
              </label>
              <input
                type="text"
                name="name"
                placeholder="Adınızı Giriniz"
                className="w-full px-3 py-2 leading-tight border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                value={registerFormData.name}
                onChange={handleChangeValue}
              />
            </div>
            {/* E-mail */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                id="email"
                placeholder="E-mail Adresinizi Giriniz"
                className="w-full px-3 py-2 leading-tight border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                value={registerFormData.email}
                onChange={handleChangeValue}
              />
            </div>
            {/* Sifre */}
            <div className="flex flex-col md:flex-row md:gap-4">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Şifre
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Şifre"
                  required
                  className="w-full px-3 py-2 leading-tight border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline "
                  value={registerFormData.password}
                  onChange={handleChangeValue}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Şifre Tekrar
                </label>
                <input
                  type="password"
                  name="passwordConfrim"
                  placeholder="Şifre Tekrar Giriniz"
                  required
                  className="w-full px-3 py-2 leading-tight border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline "
                  value={registerFormData.passwordConfrim}
                  onChange={handleChangeValue}
                />
              </div>
            </div>
            {/* Onayla butonu */}
            <button className="bg-[#03396c] text-white p-2 rounded-md active:scale-90 transition  duration-300 transform hover:shadow-xl shadow-md w-full px-8 py-2 text-xl font-medium">
              Kayıt Yap
            </button>
            <Link
              to="/login"
              className="text-[#4e5e69] text-center font-semibold w-full mb-3 py-2 px-4 rounded mt-2"
            >
              Zaten Hesabın Var Mı ?
            </Link>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
}
