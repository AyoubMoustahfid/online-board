import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import { useModal } from "@/common/recoil/modal";
import { useRoom } from "@/common/recoil/room";

const ShareModal = () => {
  const { id } = useRoom();
  const { closeModal } = useModal();

  const [url, setUrl] = useState("");
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => setUrl(window.location.href), []);
  useEffect(() => {
    if (isCopy) {
      setTimeout(() => setIsCopy(false), 2000)
    }
  }, [isCopy])

  const handleCopy = () => {
    setIsCopy(true)
    return navigator.clipboard.writeText(url)
  };

  return (
    <div className="relative flex flex-col items-center rounded-md bg-white p-10 pt-5">
      <button onClick={closeModal} className="absolute top-5 right-5">
        <AiOutlineClose />
      </button>
      <h2 className="text-2xl font-bold">Invite</h2>
      <h3>
        Room id: <p className="inline font-bold">{id}</p>
      </h3>
      <div className=" mt-2">
        <div>
          <div className="flex rounded-lg shadow-sm">
            <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm dark:bg-gray-700 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">http://</span>
            </span>
            <input type="text" value={url} readOnly className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-0 text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
            <button type="button" onClick={handleCopy}  className="w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                {isCopy ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                    </svg>
                   
                  </>
                ): (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                  </svg>
                )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
