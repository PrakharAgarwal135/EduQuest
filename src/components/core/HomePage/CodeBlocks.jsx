import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

export default function CodeBlocks({
  heading,
  subheading,
  ctabtn,
  codeblock,
  backgroundGradient,
}) {
  return (
    <div
      className={`flex lg:flex-row my-20 justify-between flex-col lg:gap-10 gap-10`}
    >
      {/* left wla part (text and buttons)  */}
      <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
        {heading}

        {/* Sub Heading */}
        <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
          {subheading}
        </div>

        {/* Button Group */}
        <div className="flex gap-7 mt-9">
          <CTAButton active={ctabtn.active} linkto={ctabtn.link}>
            <div className="flex items-center gap-2">
              {ctabtn.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>

      {/* right wla part */}
      <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
        {backgroundGradient}
        {/* Indexing */}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Codes */}
        <div
          className={
            "w-[90%] flex flex-col gap-2 font-bold font-mono text-yellow-25 pr-1"
          }
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
}
