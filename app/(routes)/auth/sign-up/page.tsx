"use client";

import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiHardDrive } from "react-icons/ci";

function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const LoaderRouter = () => {
    setIsLoading(true);

    setTimeout(() => {
      router.push("/auth/sign-in");
    }, 1000);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex justify-center items-center">
        <div>
          <div className=" text-sm flex justify-center items-center mx-auto gap-2 w-28 rounded-xl bg-[#304a36ff]  text-[#70cf97ff] py-2">
            <CiHardDrive className="w-4 h-4 " />
            Sign Up
          </div>

          <h1 className="text-5xl mt-12 mb-6 font-bold font-Fira">
            Create your Eraser account
          </h1>
          <p className="mb-12 text-center text-sm">
            By signing up, you agree to our{" "}
            <span
              onClick={LoaderRouter}
              className="text-blue-500 cursor-pointer"
            >
              terms of service
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
