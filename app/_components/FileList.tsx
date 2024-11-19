"use client"

import React, { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import moment from "moment"
import { Archive, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { getFiles, getFilesWithCount } from "@/actions/file"
import { useCurrentUser } from "@/lib/use-current-user"
import { useFiles } from "@/components/provider/file-context"

interface File {
  id: string
  name: string
  teamId: string
  createdAt: Date
  updatedAt: Date
  team: {
    name: string
  }
}

function FileList() {
  const router = useRouter()
  const user = useCurrentUser()
  const [files, setFiles] = useState<File[]>([])
  const { setFilesCount } = useFiles()


  useEffect(() => {
    const loadFiles = async () => {
      const data = await getFilesWithCount()
      if (data) {
        setFiles(data.files)
        setFilesCount(data.count)
      }
    }
    
    loadFiles()
  }, [setFilesCount])

  const handleFileClick = (e: React.MouseEvent, fileId: string) => {
    if ((e.target as HTMLElement).closest(".dropdown-trigger")) {
      e.stopPropagation()
      return
    }
    router.prefetch(`/workspace/${fileId}`)
    router.push(`/workspace/${fileId}`)
  }

  return (
    <div className="mt-8">
      {!files.length ? (
        <div>
          <h2 className="text-center mt-12">
            You still don't have any files created
          </h2>
        </div>
      ) : (
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow className="border-gray-600">
              <TableHead className="w-[280px]">NAME</TableHead>
              <TableHead className="w-[200px]">LOCATION</TableHead>
              <TableHead>CREATED</TableHead>
              <TableHead>EDITED</TableHead>
              <TableHead>COMMENTS</TableHead>
              <TableHead className="flex items-center justify-center">
                AUTHOR
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow
                key={file.id}
                className="border-gray-600 cursor-pointer"
                onClick={(e) => handleFileClick(e, file.id)}
              >
                <TableCell className="w-[280px] border-gray-600 font-bold text-[14px]">
                  {file.name}
                </TableCell>
                <TableCell className="w-[200px]">{file.team.name}</TableCell>
                <TableCell>
                  {moment(file.createdAt).format("DD MMM YYYY")}
                </TableCell>
                <TableCell>
                  {moment(file.updatedAt).startOf("hour").fromNow()}
                </TableCell>
                <TableCell className="text-center">0</TableCell>
                <TableCell className="text-center flex justify-center">
                  <Image
                    src={user?.image ?? ""}
                    alt="user avatar"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="dropdown-trigger">
                      <Button variant={"link"} className="text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#171717] text-white">
                      <DropdownMenuItem className="flex gap-2 items-center">
                        <Archive className="w-3 h-4" />
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default FileList