"use client"
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib/use-current-user";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

function HeaderDashboard() {
  const user = useCurrentUser();

  return (
    <div className="flex justify-end w-full items-center gap-2">
      <div className="flex gap-4 items-center border border-gray-500 rounded-md p-1  ">
        <Search className="w-4 h-4 ml-1" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none w-[140px]"
        />
      </div>
      <div>
        <Image
          src={user?.image ?? ""}
          alt="logo"
          width={25}
          height={20}
          className="rounded-full"
        />
      </div>
      <Button className="gap-2 flex text-sm h-8 hover:bg-blue-700 bg-blue-600">
        <Send size={1} className="w-3" />
        Invite
      </Button>
    </div>
  );
}

export default HeaderDashboard;
