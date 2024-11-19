"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { createFile, getFiles, getFilesWithCount } from "@/actions/file";
import { useCurrentUser } from "@/lib/use-current-user";
import { useFiles } from "@/components/provider/file-context";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

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

  const [fileInput, setFileInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { filesCount, refreshFiles } = useFiles();

  const handleFileCreate = async () => {
    try {
      setIsLoading(true);
      const file = await createFile(fileInput);

      if (file) {
        toast.success("File created successfully!");
        setFileInput("");
        // Cargar los archivos inmediatamente después de crear uno nuevo
        const data = await getFilesWithCount();
        if (data) {
          setFiles(data.files);
          setFilesCount(data.count);
        }
        refreshFiles(); // Mantener para consistencia con el contexto global
      } else {
        toast.error("Failed to create file");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={filesCount >= 5} className="justify-start mt-3">
                New File
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#171717]">
              <DialogHeader>
                <DialogTitle>
                  <div className="flex gap-4">
                    <Image
                      src={"/logo.sin.png"}
                      width={30}
                      height={30}
                      alt="logo sin letras"
                    />
                    <h2>Create New File</h2>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <Input
                    placeholder="Enter File Name"
                    className="mt-3 text-black"
                    maxLength={16}
                    minLength={1}
                    value={fileInput}
                    onChange={(e) => setFileInput(e.target.value)}
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    disabled={!(fileInput && fileInput.length > 4) || isLoading}
                    onClick={handleFileCreate}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
