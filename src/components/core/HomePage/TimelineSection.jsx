import React from "react";
import TimelineImage from "../../../assets/images/TimelineImage.png";
import Logo1 from "../../../assets/timelineLogo/Logo1.svg";
import Logo2 from "../../../assets/timelineLogo/Logo2.svg";
import Logo3 from "../../../assets/timelineLogo/Logo3.svg";
import Logo4 from "../../../assets/timelineLogo/Logo4.svg";

const TimeLine = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

export default function TimelineSection() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
        {/* timeline wla div  */}
        <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
          {TimeLine.map((element, index) => {
            return (
              <div className="flex flex-col lg:gap-3" key={index}>
                <div className="flex gap-6" key={index}>
                  <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-blue-200 shadow-[0px_0px_20px_-4px]">
                    <img src={element.Logo} alt="" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[18px]">
                      {element.Heading}
                    </h2>
                    <p className="text-base">{element.Description}</p>
                  </div>
                </div>
                <div
                  className={`hidden ${
                    TimeLine.length - 1 === index ? "hidden" : "lg:block"
                  }  h-14 border-solid border-r border-richblack-500 w-[26px]`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* image wla div  */}
        <div className="w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
          <img
            src={TimelineImage}
            alt="timeLineImage"
            className="h-[400px] lg:h-fit"
          />
        </div>
      </div>
    </div>
  );
}
