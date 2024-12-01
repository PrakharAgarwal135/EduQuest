import RenderSteps from "./RenderSteps";

export default function AddCourse() {
  return (
    <>
      <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-10 text-3xl font-medium text-richblack-5">
            Add Course
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>

        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-[13px] text-richblack-5">
            <li>Structure Your Content and keep it concise.</li>
            <li>Write a Clear Title and Description.</li>
            <li>Include Learning Objectives.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Use visually appealing and relevant thumbnails.</li>
            <li>
              Upload videos in HD quality (720p or 1080p) for clear visuals.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
