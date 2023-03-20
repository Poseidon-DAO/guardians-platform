"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from "../../public/logo-transparent.png";

export function Logo() {
  const router = useRouter();

  return (
    <div
      className="w-20 relative cursor-pointer"
      onClick={() => router.refresh()}
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
