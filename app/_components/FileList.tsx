import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FilesListContext } from "../_context/FilesListContext";
import { FILE } from "@/schemas/typeSidebar";
import moment from "moment";
import { Archive, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

function FileList() {
  const route = useRouter();
  const { user }: any = useKindeBrowserClient();
  const { fileList_, setFileList_ } = useContext(FilesListContext);
  const [fileList, setFileList] = useState<any>();

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  return (
    <div className="mt-8">
      {!fileList?.length ? (
        <>
          <div>
            <h2 className="text-center mt-12">
              You still don't have any files created
            </h2>
          </div>
        </>
      ) : (
        <>
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow className="border-gray-600 ">
                <TableHead className="w-[280px]">NAME</TableHead>
                <TableHead className="w-[200px]">LOCATION</TableHead>
                <TableHead>CREATED</TableHead>
                <TableHead>EDITED</TableHead>
                <TableHead >COMMENTS</TableHead>
                <TableHead className="flex items-center justify-center">AUTHOR</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fileList &&
                fileList
                  .slice()
                  .sort((a: FILE, b: FILE) =>
                    a.fileName > b.fileName ? -1 : 1
                  )
                  .map((file: FILE, index: number) => (
                    <TableRow
                      key={index}
                      className="border-gray-600 cursor-pointer"
                      onClick={() => route.push("/workspace/" + file._id)}
                    >
                      <TableCell className="w-[280px] border-gray-600 font-bold text-[14px]">
                        {file.fileName}
                      </TableCell>
                      <TableCell className="w-[200px]"></TableCell>
                      <TableCell>
                        {moment(file._creationTime).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(file._creationTime).startOf("hour").fromNow()}
                      </TableCell>
                      <TableCell className="text-center ">0</TableCell>
                      <TableCell className="text-center flex justify-center">
                        <Image
                          src={user?.picture}
                          alt="logo"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
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
        </>
      )}
    </div>
  );
}

export default FileList;
