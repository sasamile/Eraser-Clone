"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CiMenuBurger } from "react-icons/ci";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const navbar = [
  { title: "Use cases", href: "/" },
  { title: "Resources", href: "/" },
  { title: "About", href: "/" },
  { title: "DiagramGPT", href: "/" },
  { title: "Pricing", href: "/" },
];

function Header() {
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [color, setColor] = useState("white");
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const savedColor = localStorage.getItem("backgroundColor");
    if (savedColor) {
      setBackgroundColor(savedColor);
      setColor(savedColor === "black" ? "white" : "white");
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const newColor = currentScrollY > 0 ? "black" : "transparent";
      setBackgroundColor(newColor);
      setColor(newColor === "black" ? "white" : "white");
      localStorage.setItem("backgroundColor", newColor);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <motion.header
        className="fixed inset-0 z-[100] pt-5 gap-4 lg:h-[75px] h-[65px] "
        initial={{ backgroundColor: "transparent", color: "black" }}
        animate={{ backgroundColor, color }}
        style={{ y: scrollY }}
        transition={{ duration: 0.5 }} // Añadir animación de transición
      >
        <div className="w-[90%] mx-auto flex justify-between items-center">
          <nav className="flex gap-12">
            <Image src={"/logo.svg"} alt="logo" width={130} height={100} />

            <ul
              className="lg:flex gap-12 text-[13px] hidden "
              style={{ color: color }}
            >
              {navbar.map((item, index) => (
                <Link href={item.href} key={index}>
                  <li>{item.title}</li>
                </Link>
              ))}
            </ul>
          </nav>
          <div className="lg:flex gap-2  hidden ">
            <LoginLink postLoginRedirectURL="/dashboard">
              <Button
                variant={"ghost"}
                className="hover:bg-inherit text-[13px]"
                style={{ color: color }}
              >
                Log in
              </Button>
            </LoginLink>
            <RegisterLink>
              <Button variant={"outline"} className="text-black">
                Try Eraser
                <span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </Button>
            </RegisterLink>
          </div>
          <div className="lg:hidden ">
            <Drawer>
              <DrawerTrigger>
                <CiMenuBurger className="text-2xl" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <div className="flex gap-2 justify-center mt-12  ">
                    <Button
                      variant={"ghost"}
                      className="hover:bg-inherit text-md border"
                      style={{ color: color }}
                    >
                      Log in
                    </Button>
                    <Button variant={"outline"} className="text-black">
                      Try Eraser
                      <span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </Button>
                  </div>
                </DrawerHeader>
                <DrawerDescription>
                  <div>
                    <ul
                      className="grid grid-cols-2 mt-8 text-center gap-12 text-sm "
                      style={{ color: color }}
                    >
                      {navbar.map((item, index) => (
                        <Link href={item.href} key={index}>
                          <li>{item.title}</li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </DrawerDescription>
                <DrawerClose className="mt-20 ">
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className="text-black  "
                  >
                    Salir
                  </Button>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </motion.header>
    </div>
  );
}

export default Header;
