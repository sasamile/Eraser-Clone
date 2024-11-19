"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "../../_components/SideNav";
import { useCurrentUser } from "@/lib/use-current-user";
import { getTeam } from "@/actions/team";
import { Router } from "lucide-react";
import Loading from "@/components/Loading";
import { FileProvider } from "@/components/provider/file-context";

function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const user = useCurrentUser();
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getteam = async () => {
      try {
        if (!user) {
          router.push("/auth/login");
          return;
        }

        const response = await getTeam();
        if (response && Array.isArray(response)) {
          setCount(response.length);
          setLoading(false); // Actualizar estado de carga
        } else {
          router.push("/teams/create");
          return; // Añadir return para evitar renderizado
        }
      } catch (error) {
        console.error("Error al obtener el equipo:", error);
        router.push("/teams/create");
        return; // Añadir return para evitar renderizado
      }
    };
    getteam();
  }, [user, router]);

  if (loading || count === 0) {
    return <Loading />;
  }

  return (
    <FileProvider>
      <div>
        <div className="grid grid-cols-4">
          <div className="fixed h-screen w-72">
            <SideNav />
          </div>
          <div className="col-span-4 ml-72">{children}</div>
        </div>
      </div>
    </FileProvider>
  );
}

export default LayoutDashboard;
