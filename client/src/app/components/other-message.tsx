import React from "react";

export default function OtherMessage({ data }: { data: string | undefined }) {
  return (
    <div className="flex justify-start my-2">
      <div className=" w-2/3  bg-gray-200 p-4 rounded-md">
        <p className=" text-sm font-mono">{data}</p>
      </div>
    </div>
  );
}
