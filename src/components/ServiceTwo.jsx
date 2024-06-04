import Cheff from "../../public/Cheff_2.png";
export default function ServiceTwo() {
  return (
    <>
      <div className="px-10 py-3 sm:px-4 md:px-6 lg:px-6">
        <div className="container mx-auto py-[2vh] ">
          <div className="relative flex flex-row items-center justify-between max-lg:flex-col max-lg:flex max-xl:flex max-xl:flex-row gap-x-5">
            <div className="w-full md:w-[32rem] flex flex-col space-y-12 mb-5">
              <div className="text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl mb-2">
                Bir <span className="text-[#03396c]">Hizmetten </span>
                <span className="text-[#03396c]">Daha</span> Fazlazıyız...
              </div>
              <div className="lg:text-lg text-[#191919] md:text-lg text-base">
                <p>
                  Üstün yetenekli Şefimiz, mutfakta bir virtüözdür. Lezzetli
                  yemekleri, kusursuz teknikleri ve yaratıcı sunumlarıyla
                  misafirlerin damak zevklerini büyülüyor.. Mükemmellik arayışı
                  ve yemeğe olan tutkusu, her yemeği bir sanat eserine
                  dönüştürür.
                </p>
              </div>
              <div className="flex items-center w-full gap-8">
                <button className="bg-[#03396c]  w-full hover:bg-[#005b96] text-white text-xl active:scale-90 hover:shadow-xl shadow-md  p-4 relative cursor-pointer rounded-full">
                  Hakkımızda
                </button>
              </div>
            </div>
            <div>
              <img
                src={Cheff}
                alt="service"
                width={800}
                height={700}
                className="justify-end mx-auto "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
