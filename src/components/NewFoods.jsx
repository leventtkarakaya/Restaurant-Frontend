import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { UseFoodContext } from "../../context/foodContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { UseCardContext } from "../../context/cardContext";
import loading from "../../public/loading.gif";
export default function NewFood() {
  const [newFood, setNewFood] = useState([]);
  const { food, setFood } = UseFoodContext();
  const [uploading, setUploading] = useState(false);
  const getNewFood = async () => {
    setUploading(true);
    try {
      const response = await axios.get(
        "https://restaurant-backend-drab.vercel.app/api/v1/food/admin/getNewFoods"
      );
      setUploading(false);
      if (response.data.success && uploading === false) {
        
        setNewFood(response.data.data.food);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ getNewFood ~ error:", error);
    }
  };
  useEffect(() => {
    getNewFood();
  }, [setNewFood]);
  console.log(newFood);
  const { addToCart } = UseCardContext();
  return (
 <>
      {uploading === false ? (
        <div className="px-10 py-3 sm:px-4 md:px-6 lg:px-6">
          <div className="container mx-auto py-[2vh]">
            <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
              Günün <span className="text-[#405be5]">Yemekleri</span>
            </div>
            {/* newFood map */}
            <div className="grid grid-cols-1 gap-8 py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {newFood &&
                newFood.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="flex flex-col items-center p-5 cursor-pointer rounded-3xl bg-slate-300 food-card"
                      >
                        <div className="relative mb-3">
                          <Link to={`/food-details/${item?._id}`}>
                            <img
                              src={item?.foodImage}
                              alt="food"
                              className="rounded-2xl"
                              style={{ width: "200px", height: "200px" }}
                            />
                          </Link>
                          <div className="absolute top-0 left-2">
                            <button className="shadow-sm text-white bg-[#03396c] hover:bg-[#005b96] p-5 relative cursor-pointer rounded-full mt-2">
                              <FaHeart className="absolute text-xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                            </button>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <button className="shadow-sm bottom-4 -top-1 border-white text-white text-xl  bg-[#03396c] hover:bg-[#005b96] p-6 relative cursor-pointer rounded-full ">
                              <div className="absolute text-xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                {item?.price}₺
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-xl text-center font-bold text-[#2e2e2e]">
                            {item?.name}
                          </p>
                        </div>
                        <button className="bg-[#005b96] hover:bg-[#03396c] active:scale-90 transition-all duration-200 shadow-md hover:shadow-xl text-white font-medium py-2 px-8 rounded-full mt-3">
                          Siparişe Ver
                        </button>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center font-bold text-3xl">
          <img src={loading} alt="loading" />
        </div>
      )}
    </>
  );
}
