"use client";

import React, { useState } from "react";

const SearchIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 73 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 0C13.467 0 0 13.467 0 30C0 46.533 13.467 60 30 60C37.1895 60 43.7922 57.447 48.9668 53.209L66.8789 71.1211C67.1553 71.409 67.4864 71.6389 67.8528 71.7972C68.2192 71.9556 68.6135 72.0393 69.0126 72.0433C69.4118 72.0474 69.8077 71.9718 70.1772 71.8209C70.5468 71.67 70.8825 71.4469 71.1647 71.1647C71.4469 70.8825 71.67 70.5468 71.8209 70.1772C71.9718 69.8077 72.0474 69.4118 72.0433 69.0126C72.0393 68.6135 71.9556 68.2192 71.7972 67.8528C71.6389 67.4864 71.409 67.1553 71.1211 66.8789L53.209 48.9668C57.447 43.7922 60 37.1895 60 30C60 13.467 46.533 0 30 0ZM30 6C43.2904 6 54 16.7096 54 30C54 43.2904 43.2904 54 30 54C16.7096 54 6 43.2904 6 30C6 16.7096 16.7096 6 30 6Z"
        fill="white"
      />
    </svg>
  );
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      searchLocation(value);
    } else {
      setSuggestions([]);
    }
  };

  const searchLocation = (query) => {
    fetch(`http://localhost:5000/api/search/${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setSuggestions(data);
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => console.error("Error:", error));

    console.log(suggestions);
  };

  const addLocation = (location) => {
    if (location) {
      const name = location.name;
      const country = location.country;
      const lat = location.lat;
      const lon = location.lon;

      fetch("http://localhost:5000/api/add_location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          country: country,
          lat: lat,
          lon: lon,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            console.log(data.message);
          } else {
            console.error("Error:", data.error);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <div className="relative w-full min-[370px]:w-[300px]">
      <div className="rounded-full py-3 px-6 bg-[#374151] flex justify-between ">
        <input
          type="text"
          placeholder="Search city..."
          className="font-light bg-transparent outline-none border-none w-full"
          value={query}
          onChange={handleInputChange}
        />
        <SearchIcon />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-[#374151] rounded-lg shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-[#485563] cursor-pointer"
              onClick={() => addLocation(suggestion)}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
