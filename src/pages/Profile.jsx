import React, { useState, useEffect } from "react";
import { UseUserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function Profile() {
  const { user, setUser } = UseUserContext();
  const [image, setImage] = useState({});
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profileImage: image?.url,
    country: "",
    city: "",
    zipCode: "",
    district: "",
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const handleValueChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    console.log(profile);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post(
        "https://restaurant-backend-seven.vercel.app/api/v1/all/upload-image",
        formData
      );
      setUploading(false);
      if (uploading === false) {
        setImage({
          url: data.url,
          public_id: data.public_id,
        });
        toast.success("Resim Yüklendi");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnSubmit = async () => {
    try {
      const response = await axios.put(
        "https://restaurant-backend-seven.vercel.app/api/v1/user/profileUpdate",
        {
          userId: user._id,
          name: profile?.name,
          email: profile?.email,
          country: profile?.country,
          city: profile?.city,
          zipCode: profile?.zipCode,
          district: profile?.district,
          profileImage: image?.url,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUploading(false);
      if (response.data.success && uploading === false) {
        setUser(response.data.data.user);
        navigate("/profile");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ handleOnSubmit ~ error:", error);
    }
  };
  useEffect(() => {
    handleOnSubmit();
    setProfile(user);
  }, [setProfile, setImage]);

  console.log(user);
  console.log(profile);
  console.log(image);
  return (
    <>
      <div>
        <div className="w-full h-screen mx-auto pt-[16vh]">
          <form
            onSubmit={handleOnSubmit}
            className="ease-in-out duration-300 w-[100%] sm:w-max shadow-sm backdrop-blur-md bg-blue-400/30 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5"
          >
            <label htmlFor="file-upload" className="custom-file-upload">
              <img
                alt="avatar"
                src={user?.profileImage || image?.url}
                width={200}
                height={200}
                className="w-32 h-32 mx-auto bg-contain rounded-full cursor-pointer"
              />
              <input
                type="file"
                name="myFile"
                id="file-upload"
                label="image"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
            <div className="md:grid md:grid-cols-2 gap-x-4 ">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  İsim
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={profile?.name}
                  onChange={(e) => handleValueChange(e)}
                  className="w-full input input-bordered leading-tight border border-blue-400 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={profile?.email}
                  onChange={(e) => handleValueChange(e)}
                  className="w-full input input-bordered leading-tight border border-blue-400 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Ülke
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={profile?.country}
                  onChange={(e) => handleValueChange(e)}
                  className="w-full input input-bordered leading-tight border border-blue-400 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  il
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={profile?.city}
                  onChange={(e) => handleValueChange(e)}
                  className="w-full input input-bordered leading-tight border border-blue-400 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  İlçe
                </label>
                <input
                  type="text"
                  name="district"
                  id="district"
                  value={profile?.district}
                  onChange={(e) => handleValueChange(e)}
                  className="w-full input input-bordered leading-tight border border-blue-400 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Posta Kodu
                </label>
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  value={profile?.zipCode}
                  onChange={(e) => handleValueChange(e)}
                  className="w-full input input-bordered leading-tight border border-blue-400 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                />
              </div>
            </div>
            <button
              onClick={handleOnSubmit}
              className="bg-[#03396c] text-white p-2 rounded-md active:scale-90 transition  duration-300 transform hover:shadow-xl shadow-md w-full px-8 py-2 text-xl font-medium"
            >
              Güncelle
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
}
