"use client";
import { createTeam } from "@/actions/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { useCurrentUser } from "@/lib/use-current-user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPeople } from "react-icons/bs";

function CreateTeams() {
  const route = useRouter();
  const [teamName, setTeamName] = useState("");

  const user = useCurrentUser();

  useEffect(() => {
    if (!user) {
      route.push("/auth/sign-in");
    }
  }, [user, route]);

  const createNewTeam = async () => {
    try {
      const resp = await createTeam({
        name: teamName,
        userId: user?.id || "",
      });

      if (resp) {
        toast.success("Team Created Successfully!");
        setTimeout(() => {
          route.push("/dashboard");
        }, 2000);
      } else {
        toast.error("Failed to create team");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <div className="max-md:w-[80%] md:w-[95%] mx-auto mt-12">
        <Image src="/logo.svg" width={140} height={100} alt="logo" />
      </div>
      <div>
        <div className="mt-9 flex flex-col  items-center">
          <p className="bg-[#304A36FF] flex justify-center gap-2 items-center px-2 py-1 text-[#63B584] rounded-lg">
            <span>
              <BsPeople />
            </span>
            Team Name
          </p>
          <h1 className={`text-[40px] font-bold my-8 `}>
            What should we call your team?
          </h1>
          <p className="text-[#A4A4A4] ">
            You can always change this later from settings.
          </p>
          <div className="w-[27%] mt-12">
            <label className="font-bold">Team Name</label>
            <Input
              type="text"
              placeholder="Team Name"
              className="bg-[#242424] my-4 py-4 "
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="mt-20">
            <Button
              size={"lg"}
              type="submit"
              onClick={() => {
                createNewTeam();
              }}
              disabled={!(teamName && teamName.length > 0)}
              className="bg-blue-600 px-32 py-6 hover:bg-blue-700"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTeams;
