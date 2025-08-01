import React from "react";
import SignOutButton from "./SignOutButton";

const Navbar = () => {
  return (
    <div className="flex justify-end w-full p-5 fixed top-0 z-[999]">
      <SignOutButton />
    </div>
  );
};

export default Navbar;
