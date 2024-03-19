"use client";
import YourMessage from "./components/your-message";
import OtherMessage from "./components/other-message";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SERVER_URI as string);

export default function Home() {
  const [chatList, setChatList] = useState<
    Array<{ type: "YOUR_MESSAGE" | "NEW_USER" | "NEW_MESSAGE"; payload: { message?: string } }>
  >([]);
  const refMessage = useRef<HTMLInputElement>(null);

  const onSubmitMessage = () => {
    if (refMessage.current) {
      const userMessage = refMessage.current.value;
      socket.emit("send_message", {
        type: "NEW_MESSAGE",
        payload: {
          message: userMessage,
        },
      });
      setChatList((prev) => [
        ...prev,
        {
          type: "YOUR_MESSAGE",
          payload: {
            message: userMessage,
          },
        },
      ]);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the WebSocket");
      socket.emit("send_message", { type: "NEW_USER" });
    });
    socket.on("server_message", (data) => {
      setChatList((prev) => [...prev, data]);
    });
  }, []);

  return (
    <main className=" h-screen flex justify-center">
      <div className="flex flex-col w-[50%] max-lg:w-[80%] max-sm:w-[100%]">
        <div className="  h-[90%] overflow-y-scroll px-4 my-5">
          {chatList.map((e, index) => {
            if (e.type === "YOUR_MESSAGE") {
              return <YourMessage key={index} data={e.payload.message} />;
            }
            if (e.type === "NEW_USER") {
              return <OtherMessage key={index} data="New user joined!" />;
            }
            if (e.type === "NEW_MESSAGE") {
              return <OtherMessage key={index} data={e.payload.message} />;
            }
          })}
        </div>
        <div className="h-[10%]  flex items-center px-4">
          <div className="flex w-full p-4 border-black border rounded-lg max-sm:flex max-sm:flex-wrap bg-white">
            <input
              ref={refMessage}
              type="text"
              className=" w-full font-mono py-2 focus:outline-none px-4 "
              placeholder="Type your messages"
            />
            <button
              onClick={onSubmitMessage}
              className=" bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-1 font-mono text-white font-semibold rounded-lg max-sm:w-full"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
