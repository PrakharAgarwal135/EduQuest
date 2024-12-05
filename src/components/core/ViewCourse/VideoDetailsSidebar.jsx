import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { PiMonitorPlayBold } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";

import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function VideoDetailsSidebar({ setReviewModal }) {
  // to keep track of active section
  const [activeStatus, setActiveStatus] = useState("");
  // to keep track of active lecture
  const [videoBarActive, setVideoBarActive] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      // agar section mei data ni h to straight away return
      if (!courseSectionData.length) return;

      // finding the index of current section
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      // finding the index of current sub section
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      // finding the index of video that is playing
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div className="flex w-[320px] max-w-[350px] flex-col border-r-[1px] border border-r-richblack-700 bg-richblack-800">
        {/* sidebar header section */}
        <div className="mx-5 mb-6 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-500 py-5 text-richblack-5">
          {/* back btn  */}
          <div
            onClick={() => {
              navigate(`/dashboard/enrolled-courses`);
            }}
            className="flex items-center justify-center rounded-md bg-richblack-100 p-2 text-richblack-900 cursor-pointer"
            title="back"
          >
            <IoIosArrowBack size={20} /> Back
          </div>

          {/* course name and completed lectures  */}
          <div className="flex flex-col">
            <p className="text-2xl font-semibold">
              {courseEntireData?.courseName}
            </p>
            <p className="text-base font-semibold text-richblack-200">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>

          {/* add a review btn  */}
          <button
            className="flex items-center bg-yellow-50 text-base cursor-pointer rounded-md py-2 px-3 font-semibold text-richblack-900"
            onClick={() => setReviewModal(true)}
          >
            Add a Review
          </button>
        </div>

        {/* sidebar content  */}
        <div className="">
          {courseSectionData.map((course, index) => (
            <div
              className="cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className=" flex flex-row justify-between bg-richblack-700 border border-richblack-500 px-5 py-6">
                <div className="w-[80%] text-[15px] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeStatus === course?._id ? "rotate-180" : "rotate-0"
                    } transition-all duration-200`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3 px-5 py-4 text-[13px] ${
                        videoBarActive === topic._id
                          ? "text-blue-100 font-bold"
                          : "hover:bg-richblack-900"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        );
                        setVideoBarActive(topic._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                      <div className="mt-0.5 text-base">
                        {videoBarActive === topic._id && <PiMonitorPlayBold />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
