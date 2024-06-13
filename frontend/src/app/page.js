"use client";

import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";

export default function Home() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/api/locations")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok.");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.locations);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-8">
        <h2 className="text-xl md:text-2xl font-bold">Favorite Locations</h2>
        <div className="w-full flex flex-col min-[450px]:flex-row gap-8 justify-center">
          {data.length > 0 &&
            data.map((location, index) => (
              <WeatherCard key={index} location={location} />
            ))}
        </div>
      </div>
    </div>
  );
}
