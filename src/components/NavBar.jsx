import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";

const NavBar = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };
  return (
    <div>
      <div
        id="nav"
        className="bg-Cloket flex justify-start  pt-4 pb-2 
        px-1 lg:p-4 w-full sm:gap-10
           
      "
      >
        <h1
          className="font-syne font-semibold text-white text-2xl sm:px-8 
          px-2

        lg:text-5xl"
        >
          CLOKET
        </h1>
        <div className={`sm:flex ${isContentVisible ? "block" : "hidden"}`}>
          <ul
            className="flex font-syne font-semibold sm:items-center sm:gap-10   
          flex-col sm:flex-row text-white"
          >
            <li className="py-1 sm:py-0 text-base sm:text-lg sm:px-2">HOME</li>
            <li className="py-1 sm:py-0 text-base sm:px-2">BUY</li>
            <li className="py-1 sm:py-0 text-base sm:px-2">SWAP</li>
            <li className="py-1 sm:py-0 text-base sm:px-2">RENT</li>
            <li className="py-1 mb-1 sm:py-0 text-base sm:px-2">UPCYCLE</li>
            {/* <button className="bg-white text-Cloket 
            w-auto sm:w-56 lg:flex mx-6 sm:mx-72">
              LOGIN
            </button> */}
            <button
              className=" w-3/5 h-6 sm:h-10  flex sm:block bg-white  
              rounded-md text-xs lg:text-xl mt-1 p-3
         lg:w-32  mx-0 sm:mx-44  lg:flex  items-center font-syne 
         justify-center text-Cloket font-semibold"
            >
              CART
            </button>
          </ul>
        </div>

        {/* SHOW MENU : It shows only in small screen(Mobile) */}
        <button
          className="block sm:hidden font-syne rounded-md text-base 
          cursor-pointer w-auto p-2 h-8  bg-white text-Cloket
           mx-5"
          onClick={toggleContent}
        >
          <IoIosMenu />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
