import React from "react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="flex flex-col md:flex-row md:justify-between items-center justify-center py-6 md:px-4 lg:px-12 gap-4 border-b max-w-[1440px] mx-auto">
      <h1 className="font-bold text-2xl min-[400px]:text-3xl text-[#F2F5F7] text-center">
        Weather Dashboard
      </h1>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
