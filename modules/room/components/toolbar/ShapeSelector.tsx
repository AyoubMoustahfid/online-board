import { useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { BiRectangle } from "react-icons/bi";
import { BsCircle } from "react-icons/bs";
import { CgShapeZigzag } from "react-icons/cg";
import { useClickAway } from "react-use";

import { useOptions } from "@/common/recoil/options";

import { EntryAnimation } from "../../animations/Entry.animations";

const ShapeSelector = () => {
  const [options, setOptions] = useOptions();

  const ref = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  const handleShapeChange = (shape: Shape) => {
    setOptions((prev) => ({
      ...prev,
      shape,
    }));

    setOpened(false);
  };
  return (
    <div className="relative flex items-center" ref={ref}>
      <button
        className={`btn-icon text-2xl
          ${options.mode === "select" ? "" : (options.mode === "draw") && "bg-gray-50" }
        `}
        disabled={options.mode === "select"}
        onClick={() => setOpened((prev) => !prev)}
      >
        {options.shape === "circle" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`${(options.mode === "draw" && options.shape === "circle") ? "fill-blue-700" : "fill-white"} w-6 h-6`}><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" /></svg>}
        {options.shape === "rect" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`${(options.mode === "draw" && options.shape === "rect") ? "fill-blue-700" : "fill-white"} w-6 h-6`}><path d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" /></svg>}
        {options.shape === "line" && <svg width="24" height="24" viewBox="0 0 24 24" className={`${(options.mode === "draw" && options.shape === "line") ? "fill-blue-700" : "fill-white"} w-6 h-6`} xmlns="http://www.w3.org/2000/svg"><path d="M2 6a1 1 0 0 1 1-1h3a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1Zm0 12.5A1.5 1.5 0 0 1 3.5 17h17a1.5 1.5 0 0 1 0 3h-17A1.5 1.5 0 0 1 2 18.5ZM10.75 5a1 1 0 1 0 0 2h2.5a1 1 0 1 0 0-2h-2.5ZM17 6a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1ZM3 11a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3Z" /></svg>}
      </button>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute left-14 z-10 flex gap-1 rounded-lg border bg-gray-50 p-2 md:border-0"
            variants={EntryAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            <button
              className="btn-icon text-2xl group hover:bg-blue-600"
              onClick={() => handleShapeChange("line")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className={`fill-blue-600 group-hover:fill-white w-6 h-6`} xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6a1 1 0 0 1 1-1h3a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1Zm0 12.5A1.5 1.5 0 0 1 3.5 17h17a1.5 1.5 0 0 1 0 3h-17A1.5 1.5 0 0 1 2 18.5ZM10.75 5a1 1 0 1 0 0 2h2.5a1 1 0 1 0 0-2h-2.5ZM17 6a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1ZM3 11a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3Z" />
                </svg>
            </button>

            <button
              className="btn-icon text-2xl group hover:bg-blue-600"
              onClick={() => handleShapeChange("rect")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`fill-blue-600 group-hover:fill-white w-6 h-6`}>
                <path d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
              </svg>
            </button>

            <button
              className="btn-icon text-2xl group hover:bg-blue-600"
              onClick={() => handleShapeChange("circle")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`fill-blue-600 group-hover:fill-white w-6 h-6`}>
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShapeSelector;
