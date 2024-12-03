import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { FaShareSquare } from "react-icons/fa";

export default function CourseDetailsCard({
  course,
  setConfirmationModal,
  handleBuyCourse,
  handleAddToCart,
}) {
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return <div></div>;
}
