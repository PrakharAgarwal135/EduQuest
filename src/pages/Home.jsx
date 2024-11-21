import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import banner from "../assets/images/banner.webp";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";

import Footer from "../components/common/Footer";

export default function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* main heading  */}
        <div className="text-center text-4xl font-semibold mt-16">
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

        {/* banner image  */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <img
            src={banner}
            alt=""
            className="shadow-[20px_20px_rgba(255,255,255)]"
          />
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
      <Footer />
    </div>
  );
}
