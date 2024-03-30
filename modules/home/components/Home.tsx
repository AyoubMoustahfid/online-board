import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { socket } from "@/common/lib/socket";
import { useModal } from "@/common/recoil/modal";
import { useSetRoomId } from "@/common/recoil/room";

import {img_create_room, img_share_room} from "@/common/constants/img"

import NotFoundModal from "../modals/NotFound";

const Home = () => {
  const { openModal } = useModal();
  const setAtomRoomId = useSetRoomId();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);

  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
      setAtomRoomId(roomIdFromServer);
      router.push(roomIdFromServer);
    });

    const handleJoinedRoom = (roomIdFromServer: string, failed?: boolean) => {
      if (!failed) {
        setAtomRoomId(roomIdFromServer);
        router.push(roomIdFromServer);
      } else {
        openModal(<NotFoundModal id={roomId} />);
      }
    };

    socket.on("joined", handleJoinedRoom);

    return () => {
      socket.off("created");
      socket.off("joined", handleJoinedRoom);
    };
  }, [openModal, roomId, router, setAtomRoomId]);

  useEffect(() => {
    socket.emit("leave_room");
    setAtomRoomId("");
  }, [setAtomRoomId]);

  const handleCreateRoom = () => {
    socket.emit("create_room", username);
  };

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (roomId) socket.emit("join_room", roomId, username);
  };

  return (
    <section className="">
      <div className="grid grid-rows-[auto_1fr] h-screen">
        
        <div className="border-b border-gray-200 container py-3">
          <div className="">
            <p>Whiteboard-online</p>
          </div>
        </div>

        <div className="container min-h-full">
          <div>
            <h1></h1>
            <p></p>
          </div>

          <div className="grid grid-cols-2 justify-between content-center h-full">

            <div className="max-w-sm mx-auto col-span-2 md:col-span-1">
              <div className="grid grid-rows-[auto_1fr_auto] items-stretch">
                <h4></h4>
                <div className="flex items-center h-96 max-w-full">
                  <Image
                    src={img_create_room}
                    alt="image create room of the board"
                    className="h-auto"
                  />
                </div>
                <div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your name</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="room-id"
                      placeholder="Username..."
                      value={username}
                      onChange={(e) => setUsername(e.target.value.slice(0, 15))}
                    />
                  </div>
                  <button
                    onClick={handleCreateRoom}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-sm mx-auto col-span-2 md:col-span-1">
              <div className="grid grid-rows-[auto_1fr_auto]">
                <h4></h4>
                <div className="flex items-center h-96 max-w-full">
                  <Image
                    src={img_share_room}
                    alt="image share room of the board"
                    className="h-auto"
                  />
                </div>
                <form className="" onSubmit={handleJoinRoom}>
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
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your name</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="room-id"
                      placeholder="Username..."
                      value={username}
                      onChange={(e) => setUsername(e.target.value.slice(0, 15))}
                    />
                  </div>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join</button>
                </form>
              </div>
            </div>

          </div>

          <div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Home;

/**
 * <div className="flex flex-col items-center py-24">
      <h1 className="text-5xl font-extrabold leading-tight sm:text-extra">
        Digiboard
      </h1>
      <h3 className="text-xl sm:text-2xl">Real-time whiteboard</h3>

      <div className="mt-10 flex flex-col gap-2">
        <label className="self-start font-bold leading-tight">
          Enter your name
        </label>
        <input
          className="py-2 px-3 w-full border-2 border-gray-400 rounded-md focus:ring focus:ring-blue-500 focus:border-none"
          id="room-id"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value.slice(0, 15))}
        />
      </div>

      <div className="my-8 h-px w-96 bg-zinc-200" />

      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleJoinRoom}
      >
        <label htmlhtmlFor="room-id" className="self-start font-bold leading-tight">
          Enter room id
        </label>
        <input
          className="w-full border-2 border-gray-400 rounded-md px-3 py-2 focus:ring focus:ring-blue-500 focus:border-none"
          id="room-id"
          placeholder="Room id..."
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button className="btn" type="submit">
          Join
        </button>
      </form>

      <div className="my-8 flex w-96 items-center gap-2">
        <div className="h-px w-full bg-zinc-200" />
        <p className="text-zinc-400">or</p>
        <div className="h-px w-full bg-zinc-200" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <h5 className="self-start font-bold leading-tight">Create new room</h5>

        <button className="btn" onClick={handleCreateRoom}>
          Create
        </button>
      </div>
    </div>
*/