"use client";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaUnlockAlt } from "react-icons/fa";

function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const LoaderRouter = () => {
    setIsLoading(true);

    setTimeout(() => {
      router.push("/auth/sign-up");
    }, 1000);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex justify-center items-center">
        <div>
          <div className=" text-sm flex justify-center items-center mx-auto gap-2 w-28 rounded-xl bg-[#304a36ff]  text-[#70cf97ff] py-2">
            <FaUnlockAlt className="w-4 h-4 " />
            Log In
          </div>

          <h1 className="text-5xl mt-12 mb-6 font-bold font-Fira">
            Log into Eraser
          </h1>
          <p className="mb-12 text-center text-sm">
            New to Eraser?{" "}
            <span
              onClick={LoaderRouter}
              className="text-blue-500 cursor-pointer"
            >
              Sign up for free
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
