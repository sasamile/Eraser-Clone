"use server";

import { currentUser } from "@/lib/auth-user";
import { db } from "@/lib/db";

interface CreateTeamParams {
  name: string;
  userId: string;
}

export const createTeam = async ({ name, userId }: CreateTeamParams) => {
  try {
    const team = await db.team.create({
      data: {
        name,
        userId,
      },
    });

    return team;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTeam = async () => {
    const user = await currentUser();
  
    if (!user) {
      return null;
    }
  
    const teams = await db.team.findMany({
      where: {
        userId: user.id,
      },
    });
  
    // Retornar null si no hay equipos
    if (teams.length === 0) {
      return null;
    }
  
    return teams;
  };