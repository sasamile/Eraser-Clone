"use client";
import React from "react";
import HeaderDashboard from "../../_components/Header";
import FileList from "@/app/_components/FileList";

function Dashboard() {
  return (
    <div className="h-full w-full p-4 md:p-8 overflow-hidden">
      <HeaderDashboard />
      <div className="mt-8 overflow-x-auto">
        <FileList />
      </div>
    </div>
  );
}

export default Dashboard;
