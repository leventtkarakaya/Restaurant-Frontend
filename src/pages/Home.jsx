import React from "react";
import Header from "../components/Header";
import RecommendationFood from "../components/RecommendationFood";
import Service from "../components/Service";
import NewFood from "../components/NewFoods";
import ServiceTwo from "../components/ServiceTwo";
import Special from "../components/Special";
export default function Home() {
  return (
    <>
      <Header />
      <RecommendationFood />
      <Service />
      <NewFood />
      <ServiceTwo />
      <Special />
    </>
  );
}
