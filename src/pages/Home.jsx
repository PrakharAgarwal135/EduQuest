import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";

export default function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* become instructor button  */}
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* main heading  */}
        <div className="text-center text-4xl font-semibold">
          Unlock Your Path to
          <HighlightText text={"World of Coding"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          Master the skills, build real-world projects, and advance your coding
          journey with hands-on learning.
        </div>

        {/* buttons  */}
        <div className="mt-5 flex flex-row gap-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* code section  */}
        <div>
          <CodeBlocks
            heading={
              <div className="text-4xl font-semibold">
                Code Your
                <HighlightText text={"Future"} /> with EduQuest
              </div>
            }
            subheading={
              "Master the Skills You Need to Succeed in the Tech World, From Coding Basics to Advanced Techniques."
            }
            ctabtn={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
      </div>

      {/* Section 2 */}

      {/* Footer */}
    </div>
  );
}
