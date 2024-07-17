"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
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
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";
import { FILE } from "@/schemas/typeSidebar";

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
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

function Editor({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) {
  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateDocument);
  const [document, setDocument] = useState(rawDocument);

  useEffect(() => {
    fileData && initEditor();
  }, [fileData]);

  useEffect(() => {
    // console.log("trigger Value", onSaveTrigger);
    onSaveTrigger && onSaveDocument();
  }, [onSaveTrigger]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,

      tools: {
        textVariant: TextVariantTune,
        paragraph: {
          class: Paragraph,
          // apply only for the 'paragraph' tool
          tunes: ["textVariant"],
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
        table: Table,
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },

        embed: Embed,
        code: CodeTool,
        quote: Quote,
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
          config: {
            defaultStyle: "unordered",
          },
        },
      },
    });
    ref.current = editor;
  };

  const onSaveDocument = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          updateDocument({ _id: fileId, document: JSON.stringify(outputData) });
        })
        .then(
          (resp) => {
            toast("Document Updated");
          },
          (e) => {
            toast("Error while updating document");
          }
        )
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };

  return (
    <div className="mt-8">
      <div id="editorjs" className="mx-10 text-black"></div>
    </div>
  );
}

export default Editor;
