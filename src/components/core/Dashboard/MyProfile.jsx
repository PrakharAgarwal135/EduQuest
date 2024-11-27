import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="text-white w-full">
      {/* heading  */}
      <h1 className="text-3xl font-medium">My Profile</h1>

      {/* section 1  */}
      <div className="my-10 md:flex-row gap-8 md:gap-0 rounded-lg border border-richblack-600 bg-richblack-800 p-8 flex flex-col w-11/12 justify-between ">
        {/* img , name and email  */}
        <div className="flex gap-4 items-center  ">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />

          <div>
            <p className="text-[18px] leading-[26px] font-bold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-[14px] leading-[22px] font-semibold text-richblack-300">
              {user?.email}
            </p>
          </div>
        </div>

        {/* edit btn  */}
        <div className="flex flex-row md:flex-col justify-center">
          <button
            className="text-black hover:scale-95 transition-all duration-200  w-fit rounded-lg bg-yellow-50 h-fit py-3 px-6 flex gap-x-2 align-middle "
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine fontSize={20} />
            <div className="text-[16px] font-semibold">Edit</div>
          </button>
        </div>
      </div>

      {/* section 2 */}
      <div className="gap-3 sm:gap-0  rounded-lg border border-richblack-600 bg-richblack-800 p-8 flex flex-col w-11/12 justify-between">
        <div className="flex flex-row justify-between">
          {/* heading  */}
          <p className="font-bold text-[22px]">Personal Details</p>
        </div>

        {/* all other details  */}
        <div className="mt-5 grid sm:grid-cols-2 gap-5">
          <div>
            <p className="text-[14px] font-semibold leading-[22px] text-richblack-300 ">
              First Name
            </p>
            <p className="font-[500] text-[14px] leading-[22px] ">
              {user?.firstName}
            </p>
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-[22px] text-richblack-300 ">
              Email
            </p>
            <p className="font-[500] text-[14px] leading-[22px] ">
              {user?.email}
            </p>
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-[22px] text-richblack-300 ">
              Gender
            </p>
            <p className="font-[500] text-[14px] leading-[22px] ">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
          <div>
            <p className="text-[14px] leading-[22px] font-semibold text-richblack-300 ">
              Last Name
            </p>
            <p className="font-[500] text-[14px] leading-[22px] ">
              {user?.lastName}
            </p>
          </div>
          <div>
            <p className="text-[14px] leading-[22px] font-semibold text-richblack-300 ">
              Phone number
            </p>
            <p className="font-[500] text-[14px] leading-[22px] ">
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-[22px] text-richblack-300 ">
              Date of Birth
            </p>
            <p className="font-[500] text-[14px] leading-[22px] ">
              {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
