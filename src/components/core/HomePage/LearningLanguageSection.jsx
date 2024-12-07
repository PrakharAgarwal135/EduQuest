import React from "react";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import Know_your_progress from "../../../assets/images/Know_your_progress.png";
import Compare_with_others from "../../../assets/images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/images/Plan_your_lessons.png";

export default function LearningLanguageSection() {
  return (
    <div>
      <div className="text-4xl font-semibold text-center my-10">
        Your ultimate toolkit for{" "}
        <HighlightText text={"mastering any language"} />
      </div>
      <div className="text-center text-richblack-700 font-medium lg:w-[85%] mx-auto text-base -mt-7">
        Empowering you with the essential tools and resources to confidently
        learn and excel in any language of your choice.
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
        <img
          src={Know_your_progress}
          alt="Know_your_progress"
          className="object-contain lg:-mr-32 "
        />
        <img
          src={Compare_with_others}
          alt="Compare_with_others"
          className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
        />
        <img
          src={Plan_your_lessons}
          alt="Plan_your_lessons"
          className="object-contain lg:-ml-36 lg:-mt-5 -mt-16"
        />
      </div>

      <div className="w-fit mx-auto lg:mb-12 mb-8 mt-5">
        <CTAButton linkto={"/signup"} active={true}>
          <div>Learn More</div>
        </CTAButton>
      </div>
    </div>
  );
}
