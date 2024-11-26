import React from "react";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";

const Stats = [
  { count: "1K", label: "Active Students" },
  { count: "60+", label: "Courses" },
  { count: "5+", label: "Mentors" },
  { count: "10+", label: "Domains Covered" },
];

export default function About() {
  return (
    <div>
      {/* section 1 */}
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-8 text-center text-white">
        {/* main heading and subheading   */}
        <header className="mx-auto py-10 text-4xl font-semibold lg:w-[70%]">
          Inspiring Growth,
          <HighlightText text={"Empowering Futures"} />
          <p className="mx-auto mt-5 text-center text-lg font-bold text-richblack-300 lg:w-[90%]">
            Learn How EduQuest is Committed to Shaping a Brighter Future Through
            Education
          </p>
        </header>

        {/* banner images  */}
        <div className="-mt-6 grid w-[100%] grid-cols-3 gap-3 lg:gap-5 ">
          <img
            src={BannerImage1}
            alt=""
            className="shadow-[10px_-5px_50px_-5px] shadow-blue-200"
          />
          <img
            src={BannerImage2}
            alt=""
            className="shadow-[10px_-5px_50px_-5px] shadow-blue-200"
          />
          <img
            src={BannerImage3}
            alt=""
            className="shadow-[10px_-5px_50px_-5px] shadow-blue-200"
          />
        </div>

        {/* button  */}
        <div className="flex mx-auto my-14">
          <CTAButton active={true} linkto={"/contact"}>
            Get In Touch
          </CTAButton>
        </div>
      </div>

      {/* section 2 (our founding story)  */}
      <div>
        <div className="mx-auto -mt-10 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
          <div className="flex flex-col items-center gap-8 lg:flex-row justify-between">
            {/* heading and subheading  */}
            <div className="my-16 flex lg:w-[50%] flex-col gap-10">
              <h1 className="text-4xl font-semibold lg:w-[70%] ">
                Our <HighlightText text={"Founding Story"} />
              </h1>
              <p className="font-bold text-richblack-300 lg:w-[95%]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Numquam itaque delectus nemo dolor autem quaerat eveniet
                mollitia atque, non corrupti reprehenderit hic, impedit
                accusantium cum tenetur laudantium minima repellendus explicabo!
                Distinctio, maiores voluptas. Sint, unde, facere error
                reprehenderit deserunt modi a illo ad veritatis itaque minus
                pariatur deleniti culpa alias dolores quia eveniet nobis
                quisquam laborum beatae vero. Dolore, at? Temporibus beatae,
                nostrum, commodi corrupti sequi quos in doloribus consequuntur
                eum debitis magnam ut repellat sunt unde atque dolores magni
                impedit quas placeat dignissimos pariatur. Ullam ducimus nihil
                sint ipsum!
              </p>
            </div>

            {/* image  */}
            <div className="hidden lg:block">
              <img
                src={FoundingStory}
                alt="FoundingStoryImg"
                className="shadow-[10px_-5px_50px_-5px] shadow-blue-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* section 3 (stats section )  */}
      <div className="bg-richblack-800 mt-5">
        <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center">
            {Stats.map((data, index) => {
              return (
                <div className="flex flex-col py-8" key={index}>
                  <h1 className="text-[30px] font-bold text-richblack-5">
                    {data.count}
                  </h1>
                  <h2 className="font-bold text-[16px] text-richblack-300">
                    {data.label}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 4 (reviews from user)   */}
      <div className="relative mx-auto my-16 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        <h1 className="text-center text-4xl font-semibold mt-1">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  );
}
