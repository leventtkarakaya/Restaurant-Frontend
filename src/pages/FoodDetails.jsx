import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import PageNavigation from "../components/PageNavigation";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
export default function FoodDetails() {
  const params = useParams();
  const [foodDetails, setFoodDetails] = useState({});
  const [uploading, setUploading] = useState(false);
  const getFoodDetails = async () => {
    setUploading(true);
    try {
      const res = await axios.get(
        `https://restaurant-backend-drab.vercel.app/api/v1/food/admin/getFood/${params.id}`
      );
      setUploading(false);
      if (res.data.success && uploading === false) {
        setFoodDetails(res.data.data);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ getFoodDetails ~ error:", error);
    }
  };
  useEffect(() => {
    getFoodDetails();
  }, []);
  console.log(foodDetails?.food?.name);
  return (
    <>
      <div style={{ paddingTop: "16vh" }}>
        <div className="px-10 py-3 sm:px-4 md:px-6 lg:px-6">
          <div className="container mx-auto">
            <PageNavigation title={foodDetails?.food?.name} />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pb-14">
              <div className="bg-[#f5f5f5] border rounded-md mb-5 p-4">
                <img
                  src={foodDetails?.food?.foodImage}
                  alt={foodDetails?.food?.name}
                  style={{
                    width: "100%",
                    height: "20rem",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div className="bg-[#f5f5f5] border rounded-md mb-5 p-8 text-black">
                <div className="text-2xl mb-2 font-bold text-[#2e2e2e]">
                  {foodDetails?.food?.name}
                </div>
                <div className="text-2xl mb-2 font-bold text-[#2e2e2e]">
                  Ücret : {`${foodDetails?.food?.price} ₺`}
                </div>
                <div className="text-lg text-justify text-[#2e2e2e] mb-6 ">
                  {foodDetails?.food?.description}
                </div>
                <div className="flex items-center justify-between mb-6 max-md:flex max-md:flex-col">
                  <div className="text-2xl font-bold text-[#2e2e2e]">
                    Miktar
                  </div>
                  <div className="flex items-center space-x-5 max-md:space-x-0 max-md:gap-x-4 max-md:grid max-md:grid-cols-3">
                    <div className="bg-[#03396c] cursor-pointer relative  p-6 rounded-full text-[#f5f5f5]">
                      <AiOutlineMinus
                        className="absolute text-2xl font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        width={20}
                        height={20}
                      />
                    </div>
                    <span className="text-[#f5f5f5] relative px-5 py-3 cursor-pointer rounded-full bg-[#03396c]">
                      1
                    </span>
                    <div className="bg-[#03396c] cursor-pointer relative p-6 rounded-full text-[#f5f5f5]">
                      <AiOutlinePlus
                        className="absolute text-2xl font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center sm:flex-row sm:gap-5 sm:mx-auto sm:justify-center max-md:gap-x-3">
                  <button className="bg-[#005b96] active:scale-90 transition-all duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2  text-white">
                    Sepete
                  </button>
                  <button className="bg-[#005b96] active:scale-90 transition-all duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2  text-white">
                    Favoriler
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-3 pb-14 md:grid-cols-2 max-md:flex max-md:flex-col">
              <div className="bg-[#005b96] py-4 text-center text-white font-semibold">
                Kategori : {foodDetails?.food?.category}
              </div>
              <div className="bg-[#005b96] py-4 text-center text-white font-semibold">
                Agırlık : {foodDetails?.food?.weight} gr
              </div>
              <div className="bg-[#005b96] py-4 text-center text-white font-semibold">
                Konum : {foodDetails?.food?.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
