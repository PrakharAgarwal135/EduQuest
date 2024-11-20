import React from "react";

export default function HighlightText({ text }) {
  return (
    <span className="bg-gradient-to-b from-[#1FA2FF]  to-[#A6FFCB] text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
}
