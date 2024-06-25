import React, { useState, useEffect } from "react";
import AdanaDürüm from "../../public/Yemekler/Adana.webp";
import { FaHeart } from "react-icons/fa";
import { UseFoodContext } from "../../context/foodContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UseCardContext } from "../../context/cardContext";
export default function RecommendationFood() {
  const [ratingFood, setRatingFood] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { food, setFood } = UseFoodContext();

  const getRatingFood = async () => {
    setUploading(true);
    try {
      const res = await axios.get(
        "https://restaurant-backend-drab.vercel.app/api/v1/food/admin/getTopRating"
      );
      setUploading(false);
      if (res.data.success && uploading === false) {
        setRatingFood(res.data.data.food);

      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ getRatingFood ~ error:", error);
    }
  };
  useEffect(() => {
    getRatingFood();
  }, [setRatingFood]);
  console.log(ratingFood);
  const { addToCart } = UseCardContext();
  return (
    <>
      <div className="px-10 py-3 sm:px-4 md:px-6 lg:px-6">
        <div className="container mx-auto py-[2vh]">
          <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
            Tavsiye Edilen <span className="text-[#03396c]">Yemekler</span>
          </div>
          <div className="grid grid-cols-1 gap-8 py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ratingFood &&
              ratingFood.map((item) => {
                return (
                  <>
                    <div
                      className="flex flex-col items-center p-5 cursor-pointer rounded-3xl bg-slate-300 food-card"
                      key={item._id}
                    >
                      <div className="relative mb-3">
                        <Link to={`/food-details/${item?._id}`}>
                        <img
                          src={item?.foodImage}
                          alt="food"
                          key={item._id}
                          style={{
                            objectFit: "fill",
                            borderRadius: "20px",
                            width: "200px",
                            height: "200px",
                          }}
                        />
                           </Link>
                        <div className="absolute top-0 left-2">
                          <button
                            key={item._id}
                            className="shadow-sm text-white bg-[#03396c] hover:bg-[#005b96] p-5 relative cursor-pointer rounded-full mt-2"
                          >
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
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-[#005b96] hover:bg-[#03396c] active:scale-90 transition-all duration-200 shadow-md hover:shadow-xl text-white font-medium py-2 px-8 rounded-full mt-3"
                      >
                        Siparişe Ver
                      </button>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
