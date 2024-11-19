"use client";
import React from "react";
import HeaderDashboard from "../../_components/Header";
import FileList from "@/app/_components/FileList";

function Dashboard() {
  return (
    <>
      <div className="p-8">
        <HeaderDashboard />
        <FileList />
      </div>
    </>
  );
}

export default Dashboard;
