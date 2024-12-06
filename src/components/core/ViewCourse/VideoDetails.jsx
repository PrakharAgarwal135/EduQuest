import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";

import "video-react/dist/video-react.css";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const playerRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // data hi present ni h to straight away return to the enrolled courses page
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        // fetching the section based on its id
        const filteredData = courseSectionData?.filter(
          (course) => course._id === sectionId
        );
        // finding the exact video lecture
        const filteredVideoData = filteredData[0]?.subSection?.filter(
          (data) => data._id === subSectionId
        );

        if (filteredVideoData.length > 0) {
          setVideoData(filteredVideoData[0]);
        }

        setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false);
      }
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full flex-col gap-5 text-white">
      {!videoData.videoUrl ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <div
          className=" mx-auto"
          style={{
            width: "100%",
            maxWidth: "1200px",
            maxHeight: "700px",
          }}
        >
          <Player
            ref={playerRef}
            playsInline:true
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <BigPlayButton position="center" />

            {/* Render When Video Ends */}
            {videoEnded && (
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                }}
                className="full absolute inset-0 z-30 grid h-full place-content-center font-inter bg-opacity-10 backdrop-blur-sm"
              >
                {/* mark as complete btn which only shown when video not found in completed lectures  */}
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    customClasses="text-lg max-w-max px-3 mx-auto"
                  />
                )}
                {/* rewatch btn  */}
                <IconBtn
                  disabled={loading}
                  onclick={() => {
                    if (playerRef?.current) {
                      // set the current time of the video to 0
                      playerRef?.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                  customClasses="text-lg max-w-max px-3 mx-auto mt-2"
                />
              </div>
            )}
          </Player>
        </div>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pb-6">{videoData?.description}</p>
    </div>
  );
}
