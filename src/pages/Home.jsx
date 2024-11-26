import React from "react";
import { FaArrowRight } from "react-icons/fa";

import banner from "../assets/images/banner.webp";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";

import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

export default function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* main heading  */}
        <div className="text-center text-4xl font-semibold mt-10">
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

        {/* banner image */}
        {/* <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <img
            src={banner}
            alt=""
            className="shadow-[20px_20px_rgba(255,255,255)]"
          />
        </div> */}

        {/* code section  */}
        <div className="mt-6">
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

        {/* Explore Section */}
        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
          {/* Job in Demand heading wla section */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
          </div>

          {/* Timeline Section*/}
          <TimelineSection />

          {/* Learning Language */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 (reviews from user)   */}
      <div className="relative mx-auto my-16 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        <h1 className="text-center text-4xl font-semibold mt-1">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
