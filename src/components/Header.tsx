import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#ebf3e7] px-10 py-3">
        <div className="flex items-center gap-4 text-[#121b0e]">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-[#121b0e] text-lg font-bold leading-tight tracking-[-0.015em]">
            Siyasat
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link
              className="text-[#121b0e] text-sm font-medium leading-normal"
              href="/">
              About
            </Link>
            <Link
              className="text-[#121b0e] text-sm font-medium leading-normal"
              href="/solutions">
              Solutions
            </Link>
          </div>
          <div className="flex gap-2">
            <Button className="bg-primary flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#5de619] text-[#121b0e] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Login</span>
            </Button>
            <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#ebf3e7] text-[#121b0e] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Sign up</span>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
