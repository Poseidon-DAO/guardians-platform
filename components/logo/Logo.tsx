import Image from "next/image";

import logo from "../../public/logo-transparent.png";

export function Logo() {
  return (
    <div className="w-20 relative">
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
