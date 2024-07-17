import React, { useState } from "react";
import { Archive, Flag, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

function SideNavBottomSection({ onFileCreate, totalFiles }: any) {
  const [fileInput, setFileInput] = useState("");
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: "",
    },
    {
      id: 2,
      name: "Github",
      icon: Github,
      path: "",
    },
    {
      id: 3,
      name: "Archive",
      icon: Archive,
      path: "",
    },
  ];

  return (
    <div>
      {menuList.map((menu, index) => (
        <h2
          key={index}
          className="flex gap-2 p-2 px-2 text-[14px] hover:bg-[#2A2B2B] rounded-md cursor-pointer"
        >
          <menu.icon className="w-4 h-4" />
          {menu.name}
        </h2>
      ))}

      {/* add new button File Button */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button
            disabled={totalFiles === 5}
            className="w-full bg-blue-600 hover:bg-blue-700 justify-start mt-3"
          >
            New File
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#171717]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex gap-4">
                <Image
                  src={"/logo.sin.png"}
                  width={30}
                  height={30}
                  alt="logo sin letras"
                />
                <h2>Create New File</h2>
              </div>
            </DialogTitle>
            <DialogDescription>
              <Input
                placeholder="Enter File Name"
                className="mt-3 text-black"
                maxLength={16}
                minLength={1}
                onChange={(e) => setFileInput(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={!(fileInput && fileInput.length > 4)}
                onClick={() => {
                  onFileCreate(fileInput);
                }}
                className=" bg-blue-600 hover:bg-blue-700"
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/**Progress Bar */}
      <div className="h-4 w-full bg-[#4B4B4B] rounded-full mt-5">
        <Progress value={(totalFiles * 100) / 5} />
      </div>
      <h2 className="text-[12px] mt-3">
        <strong> {totalFiles} </strong> Out of <strong> 5 </strong> files used
      </h2>
      <h2 className="text-[12px] mt-1">
        Upgrade your plan for unlimited access.
      </h2>
    </div>
  );
}

export default SideNavBottomSection;
