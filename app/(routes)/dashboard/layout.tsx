"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "../../_components/SideNav";
import { FilesListContext } from "@/app/_context/FilesListContext";

function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const { user }: any = useKindeBrowserClient();
  const [fileList_, setFileList_] = useState();
  const convex = useConvex();
  const route = useRouter();

  useEffect(() => {
    user && checkTeam();
  }, [user]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    if (!result.length) {
      route.push("teams/create");
    }
  };
  return (
    <div>
      <FilesListContext.Provider value={{ fileList_, setFileList_ }}>
        <div className="grid grid-cols-4">
          <div className="fixed h-screen w-72">
            <SideNav />
          </div>
          <div className="col-span-4 ml-72">{children}</div>
        </div>
      </FilesListContext.Provider>
    </div>
  );
}

export default LayoutDashboard;
