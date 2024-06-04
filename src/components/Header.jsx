import React from "react";
import HeaderLogo from "../../public/HeaderLogo.jpg";
import { FaPlay, FaSearch } from "react-icons/fa";
export default function Header() {
  return (
    <>
      <div className="px-10 py-3 sm:px-4 md:px6 lg:px-6">
        <div className="container mx-auto py-[11vh]">
          <div className="relative grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="lg:w-[32rem] w-full flex flex-col space-y-6 ">
              <div className="text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl">
                Hızlı <span className="text-[#03396c]">Teslimat</span> ve{" "}
                <span className="text-[#03396c]">Lezzet</span> Bizim
                Vizyonumuzdur !!
              </div>
              <div className="lg:text-xl text-[#191919] md:text-lg text-base">
                {`
                Restoranımız, lezzetli ve taze yemekler sunarak tüm damak zevklerine hitap eder. Hızlı servisimizle, siparişleriniz masanıza dakikalar içinde ulaşır. İster günlük öğle yemekleri ister özel kutlamalar arıyor olun, geniş menümüzden memnun kalacaksınız. En iyi kaliteyi uygun fiyatlarla sunarak, yemek deneyiminizi keyifli ve rahat hale getiriyoruz. Restoranımızla lezzetin ve rahatlığın tadını çıkarın! Rezervasyon yaparak veya doğrudan gelerek, lezzetli bir yolculuğa çıkın.
                `}
              </div>
              <div className="flex items-center justify-between px-4 py-2 bg-white rounded-full shadow-md">
                <div className="flex items-center">
                  <FaSearch size={22} className="cursor-pointer" />
                  <input
                    type="text"
                    className="text-[#191919] w-full border-none outline-none py-2 px-4"
                    placeholder="Urunler ara..."
                  />
                </div>
                <div className="h-10 w-10 relative bg-[#005b96] rounded-full">
                  <FaSearch
                    size={15}
                    className="absolute text-white -translate-x-1/2 -translate-y-1/2 cursor-pointer top-1/2 left-1/2"
                  />
                </div>
              </div>
              <div className="flex items-center gap-8">
                <button className="bg-[#005b96] active:scale-90 transition-all duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl text-white">
                  Alışveriş
                </button>
                <div className="items-center hidden gap-4 md:flex">
                  <div className="relative w-10 h-10 bg-white rounded-full shadow-md cursor-pointer">
                    <FaPlay
                      size={18}
                      className="absolute text-[#005b96] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  </div>
                  <div className="lg:text-xl text-[#191919] md:text-lg text-base cursor-pointer ">
                    {`Video'da bilgi edin`}
                  </div>
                </div>
              </div>
            </div>
            <img
              src={HeaderLogo}
              alt="HeaderLogo"
              width={700}
              height={700}
              className="hidden lg:block"
            />
          </div>
        </div>
      </div>
    </>
  );
}
