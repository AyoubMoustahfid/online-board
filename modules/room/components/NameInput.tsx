import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { socket } from "@/common/lib/socket";
import { useModal } from "@/common/recoil/modal";
import { useSetRoomId } from "@/common/recoil/room";
import NotFoundModal from "@/modules/home/modals/NotFound";
import {img_join_room} from "@/common/constants/img"
import Image from "next/image";

const NameInput = () => {
  const setRoomId = useSetRoomId();
  const { openModal } = useModal();

  const [name, setName] = useState("");

  const router = useRouter();
  const roomId = (router.query.roomId || "").toString();

  useEffect(() => {
    if (!roomId) return;

    socket.emit("check_room", roomId);

    socket.on("room_exists", (exists) => {
      if (!exists) {
        router.push("/");
      }
    });

    // eslint-disable-next-line consistent-return
    return () => {
      socket.off("room_exists");
    };
  }, [roomId, router]);

  useEffect(() => {
    const handleJoined = (roomIdFromServer: string, failed?: boolean) => {
      if (failed) {
        router.push("/");
        openModal(<NotFoundModal id={roomIdFromServer} />);
      } else setRoomId(roomIdFromServer);
    };

    socket.on("joined", handleJoined);

    return () => {
      socket.off("joined", handleJoined);
    };
  }, [openModal, router, setRoomId]);

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("join_room", roomId, name);
  };

  return (
    <div className="grid place-items-center h-screen container">
      <form
        className="space-y-16"
        onSubmit={handleJoinRoom}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center items-center max-w-full md:max-w-md">
            <Image
              src={img_join_room}
              alt="image join in the room"
              className="!h-5"
            />
          </div>
          <div>
          <div>
              <h1 className="font-semibold text-xl text-blue-600">
                Join Witheboard
              </h1>
              <h3 className="text-sm font-normal">Join Witheboard session with an ID</h3>
            </div>
          </div>
        </div>

        <div>
          <div className="">
            <div className="mb-4">
              <label htmlFor="room-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter room id</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="room-id"
                placeholder="Room id..."
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your name</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="room-id"
              placeholder="Username..."
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 15))}
            />
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enter Room</button>
        </div>
      </form>
    </div>
  );
};

export default NameInput;
