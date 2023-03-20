import { ConnectButton, Logo } from "@/components";

export function Header() {
  return (
    <header className="w-full fixed bg-blue z-10">
      <div className="container mx-auto h-[8vh] flex items-center justify-between">
        <Logo />

        <div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
