import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <>
      <div className="pt-[18vh]">
        <div className="h-screen bg-gray-100">
          <div className="p-6 bg-white md:mx-auto">
            <div className="text-[#ff0000] text-4xl text-center font-bold">
              <h1>Payment Failed</h1>
            </div>
            <div className="text-center">
              <h3 className="text-base font-semibold text-center text-gray-900 md:text-2xl">
                Ödeme işlemin bir sorunla karsilasildi
              </h3>
              <p className="my-2 text-gray-600">
                Thank you for completing your secure online payment.
              </p>
              <p> Have a great day! </p>
              <div className="py-10 text-center">
                <Link
                  to="/"
                  className="px-12 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-500"
                >
                  GO BACK
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
