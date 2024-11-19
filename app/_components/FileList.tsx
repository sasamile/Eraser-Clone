"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { Archive, MoreHorizontal, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { getFiles, getFilesWithCount } from "@/actions/file";
import { useCurrentUser } from "@/lib/use-current-user";
import { useFiles } from "@/components/provider/file-context";

interface File {
  id: string;
  name: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
  team: {
    name: string;
  };
}

function FileList() {
  const router = useRouter();
  const user = useCurrentUser();
  const [files, setFiles] = useState<File[]>([]);
  const { setFilesCount } = useFiles();

  useEffect(() => {
    const loadFiles = async () => {
      const data = await getFilesWithCount();
      if (data) {
        setFiles(data.files);
        setFilesCount(data.count);
      }
    };

    loadFiles();
  }, [setFilesCount]);

  const handleFileClick = (e: React.MouseEvent, fileId: string) => {
    if ((e.target as HTMLElement).closest(".dropdown-trigger")) {
      e.stopPropagation();
      return;
    }
    router.prefetch(`/workspace/${fileId}`);
    router.push(`/workspace/${fileId}`);
  };

  return (
    <div className="mt-8 w-full">
      {!files.length ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full py-12 px-4">
          <div className="bg-gray-800/30 rounded-full p-6 mb-6">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-200 mb-3">
            No files found
          </h2>
          <p className="text-gray-400 text-center max-w-md mb-6">
            Create your first file to get started. You can create files and
            organize them in your workspace.
          </p>
          <Button
            onClick={() => router.push("/teams/create")}
            className="bg-primary hover:bg-primary/90"
          >
            Create New File
          </Button>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
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
                  className="border-gray-600 cursor-pointer hover:bg-gray-800/30 transition-colors"
                  onClick={(e) => handleFileClick(e, file.id)}
                >
                  <TableCell className="w-[280px] border-gray-600 font-medium text-[14px]">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      {file.name}
                    </div>
                  </TableCell>
                  <TableCell className="w-[200px] text-gray-400">
                    {file.team.name}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {moment(file.createdAt).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {moment(file.updatedAt).startOf("hour").fromNow()}
                  </TableCell>
                  <TableCell className="text-center text-gray-400">0</TableCell>
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
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#171717] border-gray-700">
                        <DropdownMenuItem className="flex gap-2 items-center text-gray-200 hover:text-white focus:text-white">
                          <Archive className="w-4 h-4" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default FileList;
