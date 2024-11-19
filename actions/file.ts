"use server"

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth-user"

export const getFiles = async () => {
  try {
    const user = await currentUser()
    
    if (!user) {
      return null
    }

    // Get user's teams first
    const teams = await db.team.findMany({
      where: {
        userId: user.id
      }
    })

    // Get all files from user's teams
    const files = await db.file.findMany({
      where: {
        teamId: {
          in: teams.map(team => team.id)
        }
      },
      include: {
        team: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return files

  } catch (error) {
    console.error(error)
    return null
  }
}

export const createFile = async (name: string) => {
    try {
      const user = await currentUser()
      
      if (!user) {
        return null
      }
  
      // Get user's first team
      const team = await db.team.findFirst({
        where: {
          userId: user.id
        }
      })
  
      if (!team) {
        return null
      }
  
      // Create the file
      const file = await db.file.create({
        data: {
          name,
          teamId: team.id,
        }
      })
  
      return file
  
    } catch (error) {
      console.error(error)
      return null
    }
  }

  export const getFilesWithCount = async () => {
    try {
      const user = await currentUser()
      
      if (!user) {
        return null
      }
  
      const teams = await db.team.findMany({
        where: {
          userId: user.id
        }
      })
  
      const files = await db.file.findMany({
        where: {
          teamId: {
            in: teams.map(team => team.id)
          }
        },
        include: {
          team: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
  
      return {
        files,
        count: files.length
      }
  
    } catch (error) {
      console.error(error)
      return null
    }
  }


  export const getFileById = async (fileId: string) => {
    try {
      const user = await currentUser()
      if (!user) return null
  
      const file = await db.file.findUnique({
        where: { id: fileId },
        include: {
          canvas: true,
          docs: true,
          team: true
        }
      })
  
      return file
    } catch (error) {
      console.error(error)
      return null
    }
  }
  
  export const updateFileCanvas = async (fileId: string, content: string) => {
    try {
      const canvas = await db.canvas.upsert({
        where: { fileId },
        update: { content },
        create: {
          fileId,
          content
        }
      })
      return canvas
    } catch (error) {
      console.error(error)
      return null
    }
  }
  
  export const updateFileDoc = async (fileId: string, content: string) => {
    try {
      const doc = await db.docs.upsert({
        where: { fileId },
        update: { content },
        create: {
          fileId,
          content
        }
      })
      return doc
    } catch (error) {
      console.error(error)
      return null
    }
  }