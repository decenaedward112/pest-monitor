import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="px-4 py-8 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
            Gain clarity and instight into your farm&apos;s future with{" "}
            <span className="block w-full text-transparent bg-clip-text bg-[#5de619]  lg:inline">
              SIYASAT
            </span>{" "}
          </h1>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-0  bg-opacity-25 md:grid-cols-2">
        <div className="flex flex-col items-start justify-center px-4 py-24 lg:px-20 gap-3">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Why Siyasat?
          </h1>

          <p className="pr-0 mb-6 text-xl  tracking-relaxed lg:pr-16 text-justify">
            We are on a mission to help farmers harness the power of data
            science to grow more sustainably and profitably.
          </p>
          <Link
            className=" flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#5de619] text-[#121b0e] text-sm font-bold leading-normal tracking-[0.015em]"
            href="/solutions">
            Learn More
          </Link>
        </div>
        <div>
          <Image
            src="/assets/Photo.avif"
            className="object-cover w-full h-64 bg-gray-100 md:h-full rounded-lg"
            alt=""
            loading="lazy"
            width={1920}
            height={1080}
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
