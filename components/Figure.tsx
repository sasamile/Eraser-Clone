"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { GrCut } from "react-icons/gr";
import { cn } from "@/lib/utils";
import { FileSearch2, FileStack, SquareFunction } from "lucide-react";
import { BsWikipedia } from "react-icons/bs";
import { lilita, oswald } from "@/lib/font";

function Figure() {
  return (
    <div className="pt-20">
      {/**Imagen Figure 1 */}
      <div className=" w-[95%] mx-auto relative">
        <Image src={"/Hero1.webp"} alt="logo" width={1490} height={100} />
        <motion.div
          className=" max-md:hidden absolute h-4 top-[15rem] bg-[#9A86FF]/50 left-[18.3rem]"
          initial={{ width: 10 }}
          transition={{ duration: 1 }}
          whileInView={{ width: 145 }}
          viewport={{ once: true }}
        />
        <motion.div
          className=" max-md:hidden absolute top-[13rem] left-[26rem] text-white bg-[#9A86FF]/50 h-6 w-20 text-center  rounded text-md"
          transition={{ duration: 2 }}
          whileInView={{ x: [-150, 0] }}
          viewport={{ once: true }}
        >
          <p>Steve K.</p>
        </motion.div>
      </div>
      {/**Logo & Marcas */}
      <div className="pt-28">
        <div className="w-[80%] mx-auto text-center text-white space-y-10 border-blue-500 border px-12 relative pb-8">
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border-blue-500 border" />
          <div className="absolute -top-11 -right-1 w-3 h-3 bg-white border-blue-500 border" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border-blue-500 border" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border-blue-500 border" />

          <p className=" text-xl md:text-2xl">
            Trusted by leading engineering teams globally
          </p>
          <div className="grid lg:grid-cols-6 max-md:grid-cols-3  gap-6 items-center">
            <Image src={"/Amazon.svg"} alt="logo" width={120} height={100} />
            <Image
              src={"/salesforce.svg"}
              alt="logo"
              width={150}
              height={100}
            />
            <Image src={"/ebay.svg"} alt="logo" width={100} height={100} />
            <Image src={"/plaid.svg"} alt="logo" width={130} height={100} />
            <Image src={"/temporal.svg"} alt="logo" width={180} height={100} />
            <Image
              src={"/workiva.svg"}
              alt="logo"
              width={130}
              height={100}
              className="mx-auto"
            />
            <Image src={"/microsoft.svg"} alt="logo" width={150} height={100} />
            <Image
              src={"/mercadolibre.svg"}
              alt="logo"
              width={140}
              height={100}
            />
            <Image src={"/outbrain.svg"} alt="logo" width={150} height={100} />
            <Image src={"/globant.svg"} alt="logo" width={150} height={100} />
            <Image src={"/peloton.svg"} alt="logo" width={190} height={100} />
            <Image
              src={"/pwc.svg"}
              alt="logo"
              width={80}
              height={100}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
      {/** Figura 2 */}
      <div className="bg-gradient-to-t via-black via-60%  to-[#191919] to-90% from-[#191919]  pt-32">
        <div className="w-[90%] mx-auto relative flex pb-12 ">
          <Image
            src={"/carita.webp"}
            alt="logo"
            width={75}
            height={100}
            className="h-[1000px] max-md:hidden"
          />
          <div className="md:pl-8 max-md:text-center">
            <div className=" max-md:hidden flex justify-center mt-2 items-center gap-2 text-green-500 bg-green-900/50 w-min h-min p-2 rounded">
              <GrCut />
              Collaboration
            </div>
            <div className="pt-8 ">
              <h1
                className={cn(
                  " text-4xl md:text-6xl flex gap-5 max-md:justify-center text-white",
                  oswald.className
                )}
              >
                Let’s work{" "}
                <div>
                  <i className="text-[#BAF5D3]">better</i>
                  <Image
                    src={"/linea verde.svg"}
                    width={90}
                    height={100}
                    alt="linea"
                  />
                </div>{" "}
                together
              </h1>
              <p className=" w-[85%]  pt-8 md:text-2xl text-white max-md: mx-auto">
                Centralize all of your scattered docs and diagrams. Build a team
                knowledge repository with a multiplayer-first tool.
              </p>
              {/**Bola Verde */}
              <div className="relative isolate ">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-5 -z-20 transform-gpu overflow-hidden blur-3xl "
                >
                  <div className="relative mx-auto  aspect-[700/600] rounded-full w-[35rem]  bg-green-500 opacity-20 " />
                </div>
              </div>
              {/**Figura 3 */}
              <div className=" pt-6 md:pt-12 relative">
                <Image
                  src={"/f3.webp"}
                  width={1150}
                  height={600}
                  alt="F3"
                  className="relative z-10 rounded-2xl"
                />

                {/**Figura 4 */}
                <Image
                  src={"/f4.webp"}
                  width={350}
                  height={100}
                  alt="F3"
                  className="absolute -bottom-8 -right-8 z-[11] max-md:right-10 max-md:w-[200px]"
                />
              </div>{" "}
              {/** Cajas Services */}
              <div className="md:pt-28 pt-10 ">
                <div className="grid grid-cols-2 md:grid-cols-3 text-white gap-20">
                  <div>
                    <h2 className="max-md:justify-center flex gap-2  text-white font-semibold py-4 max-md:text-sm">
                      <span className="text-green-500">
                        <FileStack />
                      </span>
                      Robust file management
                    </h2>
                    <p className="max-md:text-sm">
                      Customize your file setup with with folders and private
                      files.
                    </p>
                  </div>
                  {/**2 */}
                  <div>
                    <h2 className="max-md:justify-center flex gap-2  max-md:text-sm text-white font-semibold py-4">
                      <span className="text-green-500">
                        <BsWikipedia />
                      </span>
                      Wikilinks & mentions
                    </h2>
                    <p className="max-md:text-sm">
                      Construct a knowledge graph across files and teams
                    </p>
                  </div>
                  {/**3 */}
                  <div className="max-md:col-span-2">
                    <h2 className="max-md:justify-center  flex gap-2 max-md:text-sm text-white font-semibold py-4">
                      <span className="text-green-500">
                        <FileSearch2 />
                      </span>
                      Blazing fast file search
                    </h2>
                    <p className="max-md:text-sm">
                      Search through your markdown notes and text on the canvas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/**Figura 3 */}
      <div className=" max-md:hidden bg-gradient-to-t via-black via-60%  to-[#191919] to-90% from-[#191919]  pt-32">
        <div className="w-[90%] mx-auto relative flex pb-12 justify-start items-start">
          <div className=" text-center mx-auto flex flex-col justify-center items-center">
            <Image
              src={"/Compu.svg"}
              width={75}
              height={100}
              alt="computador"
            />
            <Image
              src={"/union.webp"}
              width={75}
              height={100}
              alt="union"
              className="absolute top-[17rem] left-0"
            />
          </div>

          <div className="pl-8">
            <div className="flex justify-center mt-2 items-center gap-2 text-[#AD94FF] bg-[#332B61] w-[200px] h-min p-2 rounded">
              <SquareFunction />
              For Developers
            </div>
            <div className="pt-8 ">
              <h1 className={cn("text-6xl flex  text-white", lilita.className)}>
                Designed by developers{" "}
                <div className="bg-[#6C54BC] ml-4 px-2 text-center py-4 -mt-4">
                  <i>for developers</i>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity }}
                  className="h-[]"
                >
                  |
                </motion.div>
              </h1>
              <p className="w-[85%]  pt-8 text-2xl text-white ">
                Experience our markdown, diagram-as-code, keyboard navigation,
                seamless dark mode, GitHub integration, and syntax highlighted
                code blocks.
              </p>
              {/**Bola Verde */}
              <div className="relative isolate ">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-5 -z-20 transform-gpu overflow-hidden blur-3xl "
                >
                  <div className="relative mx-auto  aspect-[700/600] rounded-full w-[35rem]  bg-[#6C54BC] opacity-20 " />
                </div>

                <p className="text-[#A28BEE] text-xl pt-16">
                  <span className="text-[#C6B4FF] font-bold">
                    {" "}
                    Diagram as Code
                  </span>{" "}
                  allows you to create <br />
                  beautiful diagrams with a straightforward <br />
                  syntax, all without fumbling with a GUI.
                </p>
                <div className="pt-12">
                  <Image
                    src={"/f5.webp"}
                    width={1000}
                    height={100}
                    alt="f5"
                    className="relative"
                  />
                  <Image
                    src={"/f6.webp"}
                    width={650}
                    height={100}
                    alt="f5"
                    className="absolute bottom-0 right-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**Figura 4 */}

      <div className=" max-md:hidden bg-gradient-to-t via-black via-60%  to-[#191919] to-90% from-[#191919]  pt-32">
        <div className="w-[90%] mx-auto relative flex pb-12 ">
          <Image
            src={"/mou.webp"}
            alt="logo"
            width={75}
            height={100}
            className="h-[1000px]"
          />
          <div className="pl-8">
            <div className="flex justify-center mt-2 items-center gap-2 text-[#D8C42B] bg-[#4B4623] w-min h-min p-2 rounded">
              <GrCut />
              Collaboration
            </div>
            <div className="pt-8 ">
              <h1
                className={cn(
                  "text-6xl flex gap-3 text-white items-center",
                  oswald.className
                )}
              >
                Documentation you will
                <div className="-mt-10">
                  <Image
                    src={"/arrowRigth.svg"}
                    width={150}
                    height={100}
                    alt="linea amarillo"
                  />
                  <i className="text-[#D6CA6F]">enjoy</i>
                </div>
                creating
              </h1>
              <p className="w-[85%]  pt-8 text-2xl text-white ">
                Eraser has the best qualities of polished modern software
                without pesky distractions that can throw you off the rails.
                Maintain flow and focus with a minimal tool design.
              </p>
              {/**Bola Verde */}
              <div className="relative isolate ">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-5 -z-20 transform-gpu overflow-hidden blur-3xl "
                >
                  <div className="relative mx-auto  aspect-[700/600] rounded-full w-[35rem]  bg-[#D6CA6F] opacity-20 " />
                </div>
              </div>
              {/**Figura 3 */}
              <div className="relative z-50 pt-12">
                <div className="flex gap-12">
                  <Image src={"/e1.webp"} width={700} height={100} alt="f5" />
                  <Image src={"/e2.webp"} width={300} height={100} alt="f5" />
                </div>
                <div className="flex gap-12 pt-12">
                  <Image src={"/e3.webp"} width={500} height={100} alt="f5" />
                  <Image src={"/e4.webp"} width={500} height={100} alt="f5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Figure;
