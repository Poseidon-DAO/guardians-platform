import { ConnectButton, Logo } from "@/components";
import { HeaderWrapper } from "./HeaderWrapper";

export function Header() {
  return (
    <header className="w-full fixed bg-blue z-10">
      <HeaderWrapper>
        <Logo />

        <div>
          <ConnectButton />
        </div>
      </HeaderWrapper>
    </header>
  );
}
