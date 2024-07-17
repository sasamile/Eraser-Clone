import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavTopSection from "./SideNavTopSection";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Team } from "@/schemas/typeSidebar";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FilesListContext } from "../_context/FilesListContext";

function SideNav() {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const [activeTeam, setActiveTeam] = useState<Team>();
  const createFiles = useMutation(api.files.createFiles);
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { fileList_, setFileList_ } = useContext(FilesListContext);

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  const onFileCreate = (fileName: string) => {
    createFiles({
      fileName: fileName,
      teamId: activeTeam?._id as string,
      createBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
    }).then((resp) => {
      try {
        if (resp) {
          getFiles();
          toast.success("File Created Successfully!!!");
        }
      } catch {
        toast.error("Something went wrong");
      }
    });
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id as string,
    });
    setFileList_(result);
    setTotalFiles(result?.length);
  };

  return (
    <div className="bg-[#171717] h-screen w-64 fixed border-r p-6 border-gray-500 flex flex-col ">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: Team) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection
          onFileCreate={onFileCreate}
          totalFiles={totalFiles}
        />
      </div>
    </div>
  );
}

export default SideNav;
