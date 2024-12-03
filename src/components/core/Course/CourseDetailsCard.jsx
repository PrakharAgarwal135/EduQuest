import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { FaShareSquare } from "react-icons/fa";

export default function CourseDetailsCard({
  course,
  handleBuyCourse,
  handleAddToCart,
}) {
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        {/* Course Image */}
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        {/* price and btns  */}
        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {CurrentPrice}
          </div>
          {/* agar user already enrolled hai then to usse go to course ka btn dikhao wrna add to cart and buy now  */}
          <div className="flex flex-col gap-4">
            <button
              className="cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[10px] font-semibold text-richblack-900"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
              <button
                onClick={handleAddToCart}
                className="cursor-pointer rounded-md bg-richblack-500 px-[20px] py-[10px] font-semibold text-richblack-5"
              >
                Add to Cart
              </button>
            )}
          </div>

          {/* share btn  */}
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
