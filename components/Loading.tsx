import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/logo.svg"
          alt="logo"
          width={160}
          height={160}
          className="animate-pulse"
        />
        <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden ">
          <div className="h-full bg-blue-600 animate-progress"></div>
        </div>
      </div>
    </div>
  );
}
