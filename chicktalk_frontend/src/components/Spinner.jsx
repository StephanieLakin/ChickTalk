import React from "react";
import { Hearts } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Hearts
        color="#ffc0cb"
        height={50}
        width={50}
        className="m-5"
        ariaLabel="circles-loading"
        visible={true}
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
