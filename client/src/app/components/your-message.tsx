import React from "react";

export default function YourMessage({ data }: { data: string | undefined }) {
  return (
    <div className="flex justify-end my-2">
      <div className=" w-2/3  bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-md">
        <p className=" text-sm text-white font-mono">{data}</p>
      </div>
    </div>
  );
}
