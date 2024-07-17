"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Team } from "@/schemas/typeSidebar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SideNavTopProps {
  user: any;
  setActiveTeamInfo: (setActiveTeamInfo: Team) => void;
}

function SideNavTopSection({ user, setActiveTeamInfo }: SideNavTopProps) {
  const menu = [
    { id: 1, name: "Create Team", path: "/teams/create", icon: Users },
    { id: 2, name: "Settings", path: "", icon: Settings },
  ];
  const [activeTeam, setActiveTeam] = useState<Team>();
  const [teamList, setTeamList] = useState<Team[]>();
  const route = useRouter();
  const convex = useConvex();

  useEffect(() => {
    user && getTeamList();
  }, [user]);

  useEffect(() => {
    activeTeam && setActiveTeamInfo(activeTeam);
  }, [activeTeam]);

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  const onMenuClick = (item: any) => {
    if (item.path) {
      route.push(item.path);
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex  items-center gap-2 hover:bg-[#2A2B2B] p-2 rounded-md">
            <Image src="/logo.sin.png" width={40} height={40} alt="logo" />
            <h2 className="w-full text-[15px] truncate font-bold">
              {activeTeam?.teamName}
            </h2>
            <ChevronDown />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-56 bg-[#171717] text-white mt-2 ml-4 border-gray-500 border-[1px]">
          {/* Team Settings */}
          <div>
            {teamList?.map((team) => (
              <h2
                className={`  my-2 px-2 py-1 rounded-md w-full text-[15px] truncate font-bold cursor-pointer ${activeTeam?._id == team._id ? "bg-blue-600 hover:bg-none" : "hover:bg-[#2A2B2B]"}`}
                key={team._id}
                onClick={() => {
                  setActiveTeam(team);
                }}
              >
                {team.teamName}
              </h2>
            ))}
          </div>
          <Separator className="mt-2 bg-slate-600" />
          {/* Option Section */}
          <div className=" flex flex-col gap-1 mt-2">
            {menu.map((item) => (
              <h2
                key={item.id}
                className="flex items-center gap-2 hover:bg-[#2A2B2B] p-2 rounded-md cursor-pointer"
                onClick={() => onMenuClick(item)}
              >
                <item.icon />
                <h2 className="w-full text-[15px] truncate font-bold">
                  {item.name}
                </h2>
              </h2>
            ))}
            <LogoutLink>
              <div className="flex items-center gap-2 hover:bg-[#2A2B2B] p-2 rounded-md text-sm">
                <LogOut />
                <h2 className="w-full text-[15px] truncate font-bold">
                  Logout
                </h2>
              </div>
            </LogoutLink>
          </div>
          <Separator className="mt-2 bg-slate-600" />
          {/* Logo name, email */}
          {user && (
            <div className="mt-4 flex gap-3">
              <Image
                src={user?.picture}
                width={37}
                height={30}
                alt="Picture"
                className="rounded-full "
              />
              <div>
                <h2 className="text-[15px] font-bold truncate">
                  {user?.given_name} {user?.family_name}
                </h2>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* All file Button */}
      <Button
        variant={"outline"}
        className="w-full text-white bg-[#2A2B2B] hover:bg-[#2A2B2B] hover:text-white border-[2px] justify-start border-gray-400 gap-2 font-semibold mt-8"
      >
        <LayoutGrid className="h-5 w-5" />
        All Files
      </Button>
    </div>
  );
}

export default SideNavTopSection;
