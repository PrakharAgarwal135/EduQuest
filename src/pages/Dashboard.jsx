import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { useRef } from "react";

import Sidebar from "../components/core/Dashboard/Sidebar";
import useOnClickOutsideProfile from "../hooks/useOnClickOutsideProfile";

export default function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const [show, setShow] = useState(false);
  const showRef = useRef();
  const stickRef = useRef();

  const showHandler = () => {
    setShow(false);
  };

  useOnClickOutsideProfile(showRef, stickRef, showHandler);

  if (profileLoading || authLoading) {
    return (
      <div class="flex min-h-screen items-center justify-center">
        <h1 class="spinner"></h1>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen">
      <div
        ref={showRef}
        className={`z-30 ${
          show ? `left-0` : `-left-96`
        } sm:relative sm:left-0 absolute transition-all duration-500 `}
      >
        <Sidebar />
      </div>
      <button
        onClick={() => {
          setShow(!show);
        }}
        ref={stickRef}
        className=" fixed bottom-4 right-10 hover:scale-95 transition-all duration-200 z-40 p-5 rounded-full  bg-yellow-50 sm:hidden"
      >
        <MdSpaceDashboard fontSize={20} />
      </button>
      <div className="h-screen w-full overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
