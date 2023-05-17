import { ConnectButton, Logo } from "@/components";

import HeaderWrapper from "./HeaderWrapper";

export default function Header() {
  return (
    <header className="w-full fixed bg-blue z-[1]">
      <HeaderWrapper>
        <Logo />

        <div>
          <ConnectButton />
        </div>
      </HeaderWrapper>
    </header>
  );
}
