"use client";

import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Circle,
  Square,
  Triangle,
  Type,
  Pencil,
  MousePointer,
  ArrowRight,
  Image as ImageIcon,
  Minus,
  Plus,
  Undo,
  Redo,
} from "lucide-react";

type Tool =
  | "select"
  | "draw"
  | "rectangle"
  | "circle"
  | "triangle"
  | "text"
  | "arrow"
  | "image";

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [activeTool, setActiveTool] = useState<Tool>("select");

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight - 60,
        backgroundColor: "#1a1a1a",
      });

      setCanvas(fabricCanvas);

      fabricCanvas.on("object:added", saveCanvasState);
      fabricCanvas.on("object:modified", saveCanvasState);
      fabricCanvas.on("object:removed", saveCanvasState);

      loadCanvasState(fabricCanvas);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Delete" && fabricCanvas) {
          const activeObjects = fabricCanvas.getActiveObjects();
          activeObjects.forEach((obj) => fabricCanvas.remove(obj));
          fabricCanvas.discardActiveObject();
          fabricCanvas.renderAll();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        fabricCanvas.dispose();
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (canvas) {
        canvas.setDimensions({
          width: window.innerWidth,
          height: window.innerHeight - 60,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [canvas]);

  const saveCanvasState = () => {
    if (canvas) {
      localStorage.setItem("canvasState", JSON.stringify(canvas.toJSON()));
    }
  };

  const loadCanvasState = (canvas: fabric.Canvas) => {
    const savedState = localStorage.getItem("canvasState");
    if (savedState) {
      canvas.loadFromJSON(savedState, () => {
        canvas.renderAll();
      });
    }
  };

  const handleToolClick = (tool: Tool) => {
    setActiveTool(tool);
    if (canvas) {
      canvas.isDrawingMode = tool === "draw";
      canvas.selection = tool === "select";

      switch (tool) {
        case "rectangle":
          addShape("rectangle");
          break;
        case "circle":
          addShape("circle");
          break;
        case "triangle":
          addShape("triangle");
          break;
        case "text":
          addText();
          break;
        case "arrow":
          addArrow();
          break;
        case "image":
          addImage();
          break;
      }
    }
  };

  const addShape = (type: "rectangle" | "circle" | "triangle") => {
    if (!canvas) return;

    const options = {
      left: 100,
      top: 100,
      fill: "transparent",
      stroke: "#ffffff",
      strokeWidth: 2,
      width: 100,
      height: 100,
    };

    let shape: fabric.Object;

    switch (type) {
      case "rectangle":
        shape = new fabric.Rect(options);
        break;
      case "circle":
        shape = new fabric.Circle({ ...options, radius: 50 });
        break;
      case "triangle":
        shape = new fabric.Triangle(options);
        break;
    }

    canvas.add(shape);
    canvas.renderAll();
  };

  const addText = () => {
    if (!canvas) return;

    const text = new fabric.IText("Type here", {
      left: 100,
      top: 100,
      fill: "#ffffff",
      fontSize: 20,
    });

    canvas.add(text);
    canvas.renderAll();
  };

  const addArrow = () => {
    if (!canvas) return;

    const arrow = new fabric.Path("M 0 0 L 200 0 L 170 -30 M 200 0 L 170 30", {
      left: 100,
      top: 100,
      stroke: "#ffffff",
      strokeWidth: 2,
      fill: "transparent",
    });

    canvas.add(arrow);
    canvas.renderAll();
  };

  const addImage = () => {
    if (!canvas) return;

    fabric.Image.fromURL(
      "/placeholder.svg",
      {
        crossOrigin: "anonymous",
      },
      (img: fabric.Image) => {
        img.scale(0.5);
        canvas.add(img);
        canvas.renderAll();
      }
    );
  };
  const tools = [
    { name: "select", icon: MousePointer },
    { name: "draw", icon: Pencil },
    { name: "rectangle", icon: Square },
    { name: "circle", icon: Circle },
    { name: "triangle", icon: Triangle },
    { name: "text", icon: Type },
    { name: "arrow", icon: ArrowRight },
    { name: "image", icon: ImageIcon },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-800 p-2 flex items-center justify-between">
        <TooltipProvider>
          <div className="flex space-x-2">
            {tools.map((tool) => (
              <Tooltip key={tool.name}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTool === tool.name ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => handleToolClick(tool.name as Tool)}
                  >
                    <tool.icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tool.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Minus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom out</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom in</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      <div className="flex-grow overflow-hidden">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
