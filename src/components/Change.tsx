import React from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

interface ChangeProps {
  direction: string;
  value: number;
  week: number;
}

const Change = ({ direction, value, week }: ChangeProps) => {
  return (
    <div className="bg-[#f0e9fe] p-10 w-3/12 rounded-2xl place-content-center">
      <div className="flex gap-1 items-center justify-center">
        {direction === "increase" ? (
          <FaLongArrowAltUp size={50} color="#321f57" />
        ) : (
          <FaLongArrowAltDown size={50} color="#321f57" />
        )}
        <span className="text-5xl font-semibold text-[#321f57]">
          {value.toFixed()}%
        </span>
      </div>
      <div className="text-center text-[#321f57] text-lg font-semibold">
        {direction} risk in week {week}
      </div>
    </div>
  );
};

export default Change;
