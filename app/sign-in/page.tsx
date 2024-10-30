import React from "react";
import Image from "next/image";
import BrandLogo from "@/public/movemate_logo.svg"

const SignIn = () => {
  return (
    <div className="flex h-full position-relative">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="flex items-center">
          <BrandLogo fill="#001f54" width={100} height={100} className="mr-4" />
          <h1 className="font-baloo text-6xl font-bold text-primary">
            MoveMate
          </h1>
        </div>
        
      </div>
      <div className="w-1/2 flex justify-end position-relative">
        <Image
          className="object-cover hidden sm:block"
          src="/movemate_cover_img.png"
          alt="movemate cover"
          width={500}
          height={600}
          // fill={true}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default SignIn;
