import { Button } from "@/components/ui/button";
import { ArrowLeft, Link, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function WorspaceHeader({ onSave }: any) {
  const route = useRouter();
  return (
    <div className="p-2 border-b-[1px] border-gray-600 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => route.push("/dashboard")}
          className="flex gap-2 justify-center items-center"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <Image src={"/logo.sin.png"} alt="logo" height={40} width={40} />
        <h2>File Name</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="h-8 text-[12px] gap-2 bg-green-500 hover:bg-green-700 "
          onClick={() => onSave()}
        >
          <Save className="h-3 w-3" />
          Save
        </Button>
        <Button className="h-8 text-[12px] gap-2 bg-blue-500 hover:bg-blue-700">
          Share <Link className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

export default WorspaceHeader;
