"use client";
import { Menu } from "lucide-react";
import SideNavBottomSection from "./SideNavBottomSection";
import SideNavTopSection from "./SideNavTopSection";
import { useState } from "react";

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de menú móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#2A2B2B]"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
  bg-[#171717] fixed h-screen w-72 border-r p-6 border-gray-500 flex flex-col
  transition-transform duration-300 ease-in-out z-40
  md:translate-x-0 md:relative
  ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
`}
      >
        <div className="flex-1">
          <SideNavTopSection />
        </div>
        <div>
          <SideNavBottomSection />
        </div>
      </div>
    </>
  );
}

export default SideNav;
