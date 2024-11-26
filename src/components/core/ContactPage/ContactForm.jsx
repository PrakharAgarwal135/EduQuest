import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import CountryCode from "../../../data/countrycode.json";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/apis";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  // extracting fns from useForm hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // will reset the form when submitted
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  // this fn will run when form submitted
  const submitContactForm = async (data) => {
    console.log("Logging data", data);
    try {
      setLoading(true);

      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );

      console.log("Logging Response", res);

      toast.success("Query Received");
      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);

      toast.error("Problem sending Data");
      setLoading(false);
    }
  };

  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      {/* heading  */}
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Get in Touch , We're Here to Help
      </h1>
      <p className="">
        Tell us more about yourself and what you've got in mind.
      </p>

      {/* form  */}
      <form
        className="flex flex-col gap-7 mt-7"
        onSubmit={handleSubmit(submitContactForm)}
      >
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* firstname  */}
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstname" className="lable-style">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="input-style"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your name.
              </span>
            )}
          </div>

          {/* lastname  */}
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastname" className="lable-style">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              className="input-style"
              {...register("lastname")}
            />
          </div>
        </div>

        {/* email  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="lable-style">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            className="input-style"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your Email address.
            </span>
          )}
        </div>

        {/* phone number  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNo" className="lable-style">
            Phone Number
          </label>

          <div className="flex gap-5">
            {/* country code dropdown  */}
            <div className="flex w-[90px] flex-col gap-2">
              <select
                name="countrycode"
                id="countrycode"
                className="input-style"
                defaultValue="+91"
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((ele, i) => {
                  return (
                    <option key={i} value={ele.code}>
                      {ele.code} -{ele.country}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* input phone number  */}
            <div className="flex w-[100%] flex-col gap-2">
              <input
                type="number"
                name="phoneNo"
                id="phoneNo"
                placeholder="12345 67890"
                className="input-style no-arrows"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please enter your Phone Number.",
                  },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 10, message: "Invalid Phone Number" },
                })}
              />
            </div>
          </div>
          {errors.phoneNo && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.phoneNo.message}
            </span>
          )}
        </div>

        {/* message  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="lable-style">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here"
            className="input-style"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your Message.
            </span>
          )}
        </div>

        {/* submit button  */}
        <button
          disabled={loading}
          type="submit"
          className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black 
         ${
           !loading && "transition-all duration-200 hover:scale-95"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
