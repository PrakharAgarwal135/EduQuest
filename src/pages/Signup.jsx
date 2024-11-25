import { useSelector } from "react-redux";

import SignupForm from "../components/core/Auth/SignupForm";

export default function Signup() {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="flex m-auto">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Join the coding journey,
          </h1>

          <p className="my-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-richblack-100">
              Build skills for today, tomorrow, and beyond.
            </span>{" "}
            <span className="font-edu-sa font-bold italic text-blue-100 -mt-5">
              Education to future-proof your career.
            </span>
          </p>

          <SignupForm />
        </div>
      )}
    </div>
  );
}
