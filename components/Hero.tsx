"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { oswald } from "@/lib/font";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

function Hero() {
  return (
    <div className="pt-32 relative">
      {/**Ilustracion 1 */}
      <motion.div
        className="absolute left-28 max-md:hidden"
        initial={{ opacity: 0 }}
        animate={{ x: [-80, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={"/Diagrama.svg"} alt="Logo" width={130} height={100} />
      </motion.div>
      {/**Ilustracion 2 */}
      <motion.div
        className="absolute left-12 -bottom-10 max-md:hidden"
        initial={{ opacity: 0 }}
        animate={{ x: [-80, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={"/Document.svg"} alt="Logo" width={110} height={100} />
      </motion.div>
      {/**Ilustracion 3 */}
      <motion.div
        className="absolute right-16 top-56 max-md:hidden"
        initial={{ opacity: 0 }}
        animate={{ x: [80, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={"/Ai.svg"} alt="Logo" width={135} height={100} />
      </motion.div>
      {/**Ilustracion 4 */}
      <motion.div
        className="absolute left-80 bottom-0 max-md:hidden"
        initial={{ opacity: 0 }}
        animate={{ x: [-80, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={"/Santi.svg"} alt="Logo" width={110} height={100} />
      </motion.div>
      {/**Ilustracion 5 */}
      <motion.div
        className="absolute right-40 bottom-40 max-md:hidden"
        initial={{ opacity: 0 }}
        animate={{ x: [80, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={"/LAR.svg"} alt="Logo" width={100} height={100} />
      </motion.div>
      {/**Botton Ai Diagramas */}
      <motion.div
        className="flex justify-center items-center "
        animate={{ y: [-10, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0 }}
      >
        <div className="flex justify-center items-center mb-12 space-x-4 bg-[#253B4D] rounded-full p-1 px-2 text-white  shadow-gray-400 shadow-sm ">
          <p className="text-sm">See what's new</p>
          <p>|</p>
          <Link
            href={""}
            className=" flex justify-center items-center gap-1 text-sky-500 text-sm"
          >
            AI Diagrams
            <ArrowRight className="h-4 w-4 " />
          </Link>
        </div>
      </motion.div>
      {/**Texto principal */}
      <div className="text-white md:w-[700px] mx-auto text-center space-y-12">
        <h1 className={cn(" text-5xl md:text-7xl font-bold", oswald.className)}>
          <span className="text-[#94DBFF]">Documents & diagrams </span>
          for engineering teams
        </h1>
        <p className=" text-xl md:text-2xl max-md:w-[90%] max-md:mx-auto">
          All-in-one markdown editor, collaborative canvas, and diagram-as-code
          builder
        </p>
        <RegisterLink>
          <Button variant={"outline"} className="text-black p-6">
            Try Eraser
            <span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </Button>
        </RegisterLink>
      </div>

      {/**Bola Azul */}
      <div className="relative isolate ">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-96 -z-10 transform-gpu overflow-hidden blur-3xl "
        >
          <div className="relative mx-auto aspect-[700/600] rounded-full w-[35rem]  bg-blue-500 opacity-20 " />
        </div>
      </div>
    </div>
  );
}

export default Hero;
