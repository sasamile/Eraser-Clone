"use client";
import React, { useEffect, useState } from "react";
import WorspaceHeader from "../_components/WorspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "@/schemas/typeSidebar";
import Canvas from "../_components/Canvas";

function Workspace({ params }: any) {
  const convex = useConvex();
  const [triggersave, setTriggersave] = useState(false);
  const [fileData, setFileData] = useState<FILE | any>();

  useEffect(() => {
    params.fileId && getFileData();
  }, [params]);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: params.fileId,
    });
    setFileData(result);
  };

  return (
    <div>
      <WorspaceHeader onSave={() => setTriggersave(!triggersave)} />
      {/**Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-y-auto">
        {/**Docuemt */}
        <div className="h-full bg-white p-4 overflow-y-auto border-r border-gray-300">
          <Editor
            onSaveTrigger={triggersave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>

        {/**Whiteboard/canvas */}
        <div className="h-full overflow-y-auto">
          <Canvas
            onSaveTrigger={triggersave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
