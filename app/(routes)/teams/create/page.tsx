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
      if (!user?.id) {
        toast.error("Usuario no autenticado");
        route.push("/auth/sign-in");
        return;
      }

      if (!teamName.trim()) {
        toast.error("El nombre del equipo es requerido");
        return;
      }

      const resp = await createTeam({
        name: teamName.trim(),
        userId: user.id,
      });

      if (resp) {
        toast.success("¡Equipo creado exitosamente!");
        route.push("/dashboard");
      } else {
        toast.error("No se pudo crear el equipo. Por favor, intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al crear el equipo:", error);
      toast.error("Ocurrió un error inesperado. Por favor, intenta más tarde.");
    }
  };
  return (
    <div className="min-h-screen p-4">
      <div className="w-[90%] max-w-screen-xl mx-auto mt-8">
        <Image src="/logo.svg" width={140} height={100} alt="logo" />
      </div>
      <div className="mt-6">
        <div className="flex flex-col items-center px-4">
          <p className="bg-[#304A36FF] flex justify-center gap-2 items-center px-3 py-1.5 text-[#63B584] rounded-lg text-sm">
            <span>
              <BsPeople />
            </span>
            Team Name
          </p>
          <h1 className="text-2xl md:text-[40px] font-bold my-4 md:my-8 text-center">
            What should we call your team?
          </h1>
          <p className="text-[#A4A4A4] text-center text-sm md:text-base">
            You can always change this later from settings.
          </p>
          <div className="w-full max-w-md mt-8 px-4">
            <label className="font-bold block mb-2">Team Name</label>
            <Input
              type="text"
              placeholder="Team Name"
              className="bg-[#242424] py-6"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="mt-12 w-full max-w-md px-4">
            <Button
              size={"lg"}
              type="submit"
              onClick={createNewTeam}
              disabled={!teamName.trim()}
              className="bg-blue-600 w-full py-6 hover:bg-blue-700"
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
