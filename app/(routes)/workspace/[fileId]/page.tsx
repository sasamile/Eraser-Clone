"use client";

import React, { useEffect, useState, useCallback } from "react";
import WorspaceHeader from "../_components/WorspaceHeader";
import Editor from "../_components/Editor";
import Canvas from "../_components/Canvas";
import { getFileById } from "@/actions/file";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

interface FileData {
  id: string;
  name: string;
  teamId: string;
  canvas: {
    id: string;
    content: string;
    fileId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  docs: {
    id: string;
    content: string;
    fileId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  team: {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

function Workspace({ params }: { params: { fileId: string } }) {
  const router = useRouter();
  const [triggersave, setTriggersave] = useState(false);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveCount, setSaveCount] = useState(0); // Movido aquí arriba

  const loadFileData = useCallback(async () => {
    if (!params.fileId) return;

    try {
      const data = await getFileById(params.fileId);
      if (!data) {
        router.push("/dashboard");
        return;
      }
      setFileData(data as FileData);
    } catch (error) {
      console.error(error);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }, [params.fileId, router]);

  useEffect(() => {
    loadFileData();
  }, [loadFileData]);

  const handleSave = useCallback(() => {
    setTriggersave((prev) => !prev);
    setTimeout(loadFileData, 1000);
  }, [loadFileData]);

  const handleSaveComplete = useCallback(() => {
    setSaveCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (saveCount === 2) {
      // Both Editor and Canvas have saved
      toast.success("All changes saved successfully");
      setSaveCount(0);
    }
  }, [saveCount]);

  if (loading) {
    return <Loading />;
  }

  if (!fileData) {
    return null;
  }

  return (
    <div>
      <WorspaceHeader onSave={handleSave} fileName={fileData.name} />
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-y-auto">
        <div className="h-full bg-[#121212ff] p-4 overflow-y-auto border-r border-gray-300">
          <Editor
            onSaveTrigger={triggersave}
            fileId={params.fileId}
            initialContent={fileData.docs?.content}
            onSaveComplete={handleSaveComplete}
          />
        </div>
        <div className="h-full overflow-y-auto">
          <Canvas
            onSaveTrigger={triggersave}
            fileId={params.fileId}
            initialContent={fileData.canvas?.content}
            onSaveComplete={handleSaveComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
