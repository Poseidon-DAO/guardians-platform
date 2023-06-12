"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/zustand/user";

import logo from "../../public/logo-transparent.png";

export default function Logo() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const routeToPush = !!user ? "/collection" : "/";

  return (
    <div
      className="w-20 relative cursor-pointer"
      onClick={() => router.push(routeToPush)}
    >
      <Image
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt="logo"
        priority
      />
    </div>
  );
}
