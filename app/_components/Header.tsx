import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

function HeaderDashboard() {
  const { user }: any = useKindeBrowserClient();

  return (
    <div className="flex justify-end w-full items-center gap-2">
      <div className="flex gap-4 items-center border border-gray-500 rounded-md p-1">
        <Search className="w-4 h-4 ml-1" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none"
        />
      </div>
      <div>
        <Image
          src={user?.picture}
          alt="logo"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <Button className="gap-2 flex text-sm h-8 hover:bg-blue-700 bg-blue-600">
        <Send className="h-4 w-4" />
        Invite
      </Button>
    </div>
  );
}

export default HeaderDashboard;
