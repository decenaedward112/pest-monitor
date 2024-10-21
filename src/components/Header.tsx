import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div>
      <header className="flex flex-wrap items-center justify-between whitespace-nowrap border-b border-solid border-b-[#ebf3e7] px-4 py-3 md:px-10">
        <div className="flex items-center gap-4 text-[#121b0e]">
          <div className="size-12">
            <Image
              src="/assets/Siyasat.svg"
              className="object-cover  md:h-full rounded-lg"
              alt=""
              width={1920}
              height={1080}
            />
          </div>
          <h2 className="text-[#121b0e] text-base font-bold leading-tight tracking-[-0.015em] md:text-lg">
            Siyasat
          </h2>
        </div>
        {/* Hide these items on mobile and show them from medium screens */}
        <div className="hidden md:flex flex-1 justify-end gap-4 md:gap-8">
          <div className="flex items-center gap-4 md:gap-9">
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
            <Button className="bg-primary flex min-w-[64px] max-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-3 bg-[#5de619] text-[#121b0e] text-xs font-bold leading-normal tracking-[0.015em] md:h-10 md:min-w-[84px] md:px-4">
              <span className="truncate">Login</span>
            </Button>
            <Button className="flex min-w-[64px] max-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-3 bg-[#ebf3e7] text-[#121b0e] text-xs font-bold leading-normal tracking-[0.015em] md:h-10 md:min-w-[84px] md:px-4">
              <span className="truncate">Sign up</span>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
