import { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

// hook to create a HTML5-compliant drag'n'drop zone for files
import { useDropzone } from "react-dropzone";

// Video React is a web video player for displaying video previews
import { Player } from "video-react";
import "video-react/dist/video-react.css";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,

  // Data to be displayed when viewing an existing file
  viewData = null,

  // Data to be used when editing an existing file
  editData = null,
}) {
  // Stores the currently selected file
  const [selectedFile, setSelectedFile] = useState(null);

  // Stores the preview URL for the uploaded file (image/video)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );

  const inputRef = useRef(null);

  // called when a file is dropped in the drop zone
  // It previews the file if it's valid, and updates the selectedFile state with the file
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  // setting up useDropzone hook
  // onDrop is called when a file is dropped
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  // this fn uses a FileReader to read the file and generate a data URL for the preview
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // defines an event handler function for when the reading process has completed
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Manually trigger the file input click
  const handleDivClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md `}
      >
        {/* if the previewSource have a value , we will show an image or a video  */}
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              // agar video nhi h then to image show krao
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              // agar video h to use Player from video-react package to play video
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          // no file is selected, it shows the drag-and-drop instructions
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
            onClick={handleDivClick}
          >
            <input type="file" {...getInputProps()} ref={inputRef} id={name} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <div className="mt-4 text-center text-xs text-richblack-200">
              (Aspect ratio 16:9)
            </div>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-1 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
