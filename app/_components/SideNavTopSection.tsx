"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTeam } from "@/actions/team";
import { useCurrentUser } from "@/lib/use-current-user";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface Team {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

function SideNavTopSection() {
  const user = useCurrentUser();
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsData = await getTeam();
      setTeams(teamsData ?? []);
      // Establecer el equipo seleccionado por defecto
      if (teamsData && teamsData.length > 0) {
        setSelectedTeam(teamsData[0]);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex  items-center gap-2 hover:bg-[#2A2B2B] p-2 rounded-md">
            <Image src="/logo.sin.png" width={40} height={40} alt="logo" />
            <h2 className="w-full  truncate font-bold">
              {" "}
              {selectedTeam?.name || "Select Team"}
            </h2>
            <ChevronDown />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-56 bg-[#171717] text-white ml-4 outline-none">
          {/* Option Section */}
          <div className=" flex flex-col gap-1 mt-2 text-sm">
        
            <div onClick={() => signOut()}>
              <div className="flex items-center gap-2 hover:bg-[#2A2B2B] px-2 py-1 rounded-md text-sm cursor-pointer">
                <LogOut />
                <h2 className="w-full text-sm truncate font-bold">Logout</h2>
              </div>
            </div>
          </div>
          <Separator />

          {user && (
            <div className="mt-2 flex gap-3">
              <Image
                src={user.image ?? ""}
                width={20}
                height={10}
                alt="Picture"
                className="rounded-full w-8 h-8 "
              />
              <div>
                <h2 className="text-sm font-bold truncate">{user.name}</h2>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* All file Button */}
      <Button
        variant={"outline"}
        className="w-full text-white bg-[#2A2B2B] hover:bg-[#2A2B2B] hover:text-white border-[2px] justify-start border-gray-400 gap-2 font-semibold mt-8"
        onClick={() =>
          selectedTeam && router.push(`/dashboard/${selectedTeam.id}/files`)
        }
      >
        <LayoutGrid className="h-5 w-5" />
        All Files
      </Button>
    </div>
  );
}

export default SideNavTopSection;
