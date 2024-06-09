import axios from "axios";
import Logo from "../../../public/Logo.png";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddFood() {
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    weight: "",
    location: "",
  });
  const navigate = useNavigate();
  const handleValueChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };
  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FormData();
    reader.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post(
        "https://restaurant-backend-seven.vercel.app/api/v1/all/upload-image",
        reader
      );
      setUploading(false);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      if (uploading === false) {
        toast.success("Resim Yüklendi");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnSubmit = async (e) => {
    debugger;
    e.preventDefault();
    setUploading(true);
    try {
      await axios.post(
        "https://restaurant-backend-seven.vercel.app/api/v1/food/admin/addfood",
        {
          name: formData.name,
          price: formData.price,
          description: formData.description,
          category: formData.category,
          weight: formData.weight,
          location: formData.location,
          foodImage: image?.url,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUploading(false);
      if (uploading === false) {
        toast.success("Yemek Eklendi");
      } else {
        toast.error("Yemek Ekleme İslemi Basarısız");
      }
    } catch (error) {
      console.log("🚀 ~ handleOnSubmit ~ error:", error);
    }
  };
  return (
    <>
      {/* add food form */}
      <div className="w-full h-screen mx-auto mt-[16vh] max-sm:mb-[28vh]">
        <form
          onSubmit={handleOnSubmit}
          className="ease-in-out duration-300 w-[100%] sm:w-max shadow-sm backdrop-blur-md bg-blue-400/30 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5"
        >
          {/* Company Profil Resmi */}
          <NavLink to="/">
            <img
              alt="logo"
              src={Logo}
              width={200}
              height={200}
              className="mx-auto bg-contain rounded-full cursor-pointer w-36 h-36"
            />
          </NavLink>
          {/* Yemek Adı && Ucret */}
          <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 ">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Yemek Adı
              </label>
              <input
                type="text"
                name="name"
                placeholder="Yemek Adını Giriniz"
                className="w-full input input-bordered px-3 py-2 leading-tight border  rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                value={formData.name}
                onChange={handleValueChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Ücret (₺)
              </label>
              <input
                type="number"
                name="price"
                placeholder="Yemek Ucretini Giriniz"
                className="w-full input input-bordered px-3 py-2 leading-tight border  rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                value={formData.price}
                onChange={handleValueChange}
              />
            </div>
          </div>
          {/* Picture && Category */}
          <div className="grid items-center grid-cols-1 gap-4 mb-4 sm:grid-cols-2 ">
            <label>
              <input
                type="file"
                accept=" .jpg, .png, .jpeg, .gif, .webp"
                name="foodImage"
                alt="foodImage"
                className="w-full file-input file-input-bordered py-2 px-8 mt-1 bg-[#03396c] text-white file-input-md"
                value={formData.image}
                onChange={handleImage || handleValueChange}
              />
            </label>
            <div>
              <select
                className="w-full max-w-xs select select-ghost input input-bordered"
                name="category"
                value={formData.category}
                onChange={handleValueChange}
              >
                <option disabled selected>
                  Yemek Kategorisi
                </option>
                <option>Kırmızı Et</option>
                <option>Beyaz Et</option>
                <option>Meyveler</option>
                <option>Sebzeler</option>
                <option>Içeçekler</option>
                <option>Yemekler</option>
                <option>Tatlılar</option>
              </select>
            </div>
          </div>
          {/* Weight && Description */}
          <div className="grid items-center w-full grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Agırlık (gram)
              </label>
              <input
                type="number"
                name="weight"
                placeholder="Yemek Ucretini Giriniz"
                className="w-full input input-bordered px-3 py-2 leading-tight border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                value={formData.weight}
                onChange={handleValueChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Lokasyon
              </label>
              <input
                type="text"
                name="location"
                placeholder="Lokasyon Giriniz"
                className="w-full input input-bordered px-3 py-2 leading-tight border rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline sm:w-[20rem]"
                value={formData.location}
                onChange={handleValueChange}
              />
            </div>
          </div>
          {/* Description */}
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Yemek Aciklamasi
          </label>
          <textarea
            name="description"
            className="w-full col-span-2 px-3 py-2 mb-5 leading-tight text-gray-700 border rounded shadow-md appearance-none textarea textarea-ghost focus:outline-none focus:shadow-outline"
            placeholder="Yemek Aciklamasini Giriniz"
            value={formData.description}
            onChange={handleValueChange}
          ></textarea>
          {/* Onayla butonu */}
          <button className="bg-[#03396c] text-white p-2 rounded-md active:scale-90 transition  duration-300 transform hover:shadow-xl shadow-md w-full px-8 py-2 text-xl font-medium">
            Onayla
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
}
