import axios from "axios";
import React, { useState, useEffect } from "react";
import { UseFoodContext } from "../../context/foodContext";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function Special() {
  const [special, setSpecial] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { food, setFood } = UseFoodContext();
  const getSpeacialServices = async () => {
    setUploading(true);
    try {
      const res = await axios.get(
        "https://restaurant-backend-seven.vercel.app/api/v1/food/admin/speacilFoods"
      );
      setUploading(false);
      if (res.data.success && uploading === false) {
        toast.success(res.data.message);
        setSpecial(res.data.data.food);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ getSpeacialServices ~ error:", error);
    }
  };
  useEffect(() => {
    getSpeacialServices();
  }, [setSpecial]);

  console.log(special);
  return (
    <>
      <div className="px-10 py-3 sm:px-4 md:px-6 lg:px-6">
        <div className="container mx-auto py-[2vh]">
          <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
            Has <span className="text-[#03396c]">Yemekler</span>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {special &&
              special.map((item, index) => {
                const foodItem = item[0];
                console.log("🚀 ~ Special ~ foodItem:", foodItem);
                return (
                  <div
                    key={foodItem._id}
                    className="flex flex-col items-center p-5 rounded-lg cursor-pointer bg-slate-300 food-card"
                  >
                    <div className="relative mb-3">
                      <Link to={`/food/${foodItem?._id}`}>
                        <img
                          src={foodItem?.foodImage}
                          alt="food"
                          style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "fill",
                            borderRadius: "10px",
                          }}
                        />
                      </Link>
                      <div className="absolute top-0 left-2">
                        <button className="shadow-sm text-white bg-[#03396c] hover:bg-[#005b96] p-5 relative cursor-pointer rounded-full mt-2">
                          <FaHeart className="absolute text-xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <button className="shadow-sm bottom-4 border-white text-white text-xl  bg-[#03396c] hover:bg-[#005b96] p-6 relative cursor-pointer rounded-full ">
                          <div className="absolute text-xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            {foodItem?.price}₺
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-xl text-center font-bold text-[#2e2e2e]">
                        {foodItem?.name}
                      </p>
                      <div className="flex space-x-2 text-sm cursor-pointer">
                        <span
                          className="font-semibold text-[#2e2e2e] text-[16px]"
                          key={index}
                        >
                          {foodItem?.reviews[0]?.rating}
                        </span>
                        <FaStar className="text-[#f1c40f]" size={16} />
                        <span className="font-semibold text-[#2e2e2e]">
                          5.0
                        </span>
                      </div>
                    </div>
                    <button className="bg-[#005b96] hover:bg-[#03396c] active:scale-90 transition-all duration-200 shadow-md hover:shadow-xl text-white font-medium py-2 px-8 rounded-full mt-3">
                      Siparişe Ver
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
