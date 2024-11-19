"use client";

import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { useEffect, useState, useCallback, useRef } from "react";
import { updateFileCanvas } from "@/actions/file";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

interface CanvasProps {
  fileId: string;
  onSaveTrigger: boolean;
  initialContent?: string;
  onSaveComplete?: () => void; // Add this prop
}

function Canvas({
  fileId,
  onSaveTrigger,
  initialContent,
  onSaveComplete,
}: CanvasProps) {
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [loading, setLoading] = useState(true);
  const excalidrawRef = useRef<any>(null);

  // Handle initial content
  useEffect(() => {
    if (initialContent) {
      try {
        const parsedContent = JSON.parse(initialContent);
        setElements(parsedContent);
      } catch (error) {
        console.error("Error parsing canvas content:", error);
      }
    }
    setLoading(false);
  }, [initialContent]);

  // Handle canvas changes
  const onChange = useCallback(
    (excalidrawElements: readonly ExcalidrawElement[]) => {
      if (JSON.stringify(elements) !== JSON.stringify(excalidrawElements)) {
        setElements(Array.from(excalidrawElements));
      }
    },
    [elements]
  );

  // Handle saving

  const handleSave = useCallback(async () => {
    try {
      await updateFileCanvas(fileId, JSON.stringify(elements));
      // Remove the toast here
      if (onSaveComplete) {
        onSaveComplete();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save canvas");
    }
  }, [fileId, elements, onSaveComplete]);

  useEffect(() => {
    if (onSaveTrigger && !loading) {
      handleSave();
    }
  }, [onSaveTrigger, loading, handleSave]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ height: "100%", backgroundColor: "#121212" }}>
      <Excalidraw
        initialData={{
          elements: elements,
          appState: {
            viewBackgroundColor: "#121212",
            theme: "dark",
            currentItemStrokeColor: "#ffffff",
            currentItemBackgroundColor: "#121212",
          },
          scrollToContent: true,
        }}
        onChange={onChange}
        theme="light"
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
            export: false,
            toggleTheme: false,
          },
        }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint />
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
}

export default Canvas;
