import SideNavBottomSection from "./SideNavBottomSection";
import SideNavTopSection from "./SideNavTopSection";

function SideNav() {
  return (
    <div className="bg-[#171717] h-screen w-64 fixed border-r p-6 border-gray-500 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection />
      </div>

      <div>
        <SideNavBottomSection />
      </div>
    </div>
  );
}

export default SideNav;
