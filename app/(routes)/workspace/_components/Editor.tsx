"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import EditorJS from "@editorjs/editorjs";
//@ts-ignore
import Header from "@editorjs/header";
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import CodeTool from "@editorjs/code";
//@ts-ignore
import Quote from "@editorjs/quote";
//@ts-ignore
import Embed from "@editorjs/embed";
//@ts-ignore
import Checklist from "@editorjs/checklist";
//@ts-ignore
import Table from "@editorjs/table";
//@ts-ignore
import Warning from "@editorjs/warning";
//@ts-ignore
import Paragraph from "@editorjs/paragraph";
//@ts-ignore
import TextVariantTune from "@editorjs/text-variant-tune";
import { updateFileDoc } from "@/actions/file";
import toast from "react-hot-toast";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
  ],
  version: "2.8.1",
};

interface EditorProps {
  fileId: string;
  onSaveTrigger: boolean;
  initialContent?: string;
  onSaveComplete?: () => void; // Add this prop
}
function Editor({
  fileId,
  onSaveTrigger,
  initialContent,
  onSaveComplete,
}: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const [isReady, setIsReady] = useState(false);

  const initEditor = useCallback(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      data: initialContent ? JSON.parse(initialContent) : rawDocument,
      onReady: () => {
        editorRef.current = editor;
        setIsReady(true);
      },
      autofocus: true,
      tools: {
        header: {
          //@ts-ignore
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4],
            defaultLevel: 3,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        code: CodeTool,
        quote: Quote,
        embed: Embed,
        table: Table,
        warning: Warning,
        paragraph: {
          class: Paragraph,
          tunes: ["textVariant"],
        },
        textVariant: TextVariantTune,
        checklist: Checklist,
      },
    });
  }, [initialContent]);

  useEffect(() => {
    if (!editorRef.current) {
      initEditor();
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initEditor]);
  useEffect(() => {
    const saveData = async () => {
      if (onSaveTrigger && editorRef.current && isReady) {
        try {
          const outputData = await editorRef.current.save();
          await updateFileDoc(fileId, JSON.stringify(outputData));
          // Remove the toast here
          if (onSaveComplete) {
            onSaveComplete();
          }
        } catch (error) {
          console.error("Error saving document:", error);
          toast.error("Failed to save document");
        }
      }
    };

    saveData();
  }, [onSaveTrigger, fileId, isReady, onSaveComplete]);
  return (
    <div className="mt-8">
      <div id="editorjs" className="mx-10 text-white"></div>
    </div>
  );
}

export default Editor;
