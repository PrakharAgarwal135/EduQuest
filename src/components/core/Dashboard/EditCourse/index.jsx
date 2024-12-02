import { useEffect, useState, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import RenderSteps from "../AddCourse/RenderSteps";

export default function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const result = await getFullDetailsOfCourse(courseId, token);

      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-10 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="max-w-[600px]">
        {course ? (
          <div className="mx-auto">
            <RenderSteps />
          </div>
        ) : (
          <p className="mt-10 text-l font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  );
}
