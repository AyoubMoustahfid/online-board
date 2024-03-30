import { useEffect } from "react";

import { AiOutlineSelect } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { FaEraser } from "react-icons/fa";

import { useOptions, useSetSelection } from "@/common/recoil/options";

const ModePicker = () => {
  const [options, setOptions] = useOptions();
  const { clearSelection } = useSetSelection();

  useEffect(() => {
    clearSelection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.mode]);

  return (
    <>
      <button
        className={`btn-icon text-xl ${
          options.mode === "draw" && "bg-gray-50"
        }`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: "draw",
          }));
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${options.mode === "draw" ? "fill-blue-700" : "fill-white"} w-6 h-6`}>
          <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
        </svg>

      </button>

      <button
        className={`btn-icon text-xl ${
          options.mode === "eraser" && "bg-gray-50"
        }`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: "eraser",
          }));
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={`${options.mode === "eraser" ? "fill-blue-700" : "fill-white"} w-6 h-6`}>
          <path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" />
        </svg>
      </button>

      <button
        className={`btn-icon text-2xl ${
          options.mode === "select" && "bg-gray-50"
        }`}
        onClick={() => {
          setOptions((prev) => ({
            ...prev,
            mode: "select",
          }));
        }}
      >
        <svg width="24" height="24" fill={options.mode === "select" ? "blue" : "white"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 5a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H9a1 1 0 0 0-1 1ZM5 8a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1ZM19 8a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1ZM9 20a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2H9ZM5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM21 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM19 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
      </button>
    </>
  );
};

export default ModePicker;
