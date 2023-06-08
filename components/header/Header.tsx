import { ConnectButton, Logo, SwitchTheme } from "@/components";

import { ProfilePopover } from "../profile-popover";
import { type ThemeTypes } from "../switch-theme/SwitchTheme";

import HeaderWrapper from "./HeaderWrapper";

interface IProps {
  theme: ThemeTypes;
}

export default function Header({ theme }: IProps) {
  return (
    <header className="w-full fixed bg-blue dark:bg-background z-50">
      <HeaderWrapper>
        <Logo />

        <div className="flex items-center">
          <div className="mr-2">
            <SwitchTheme theme={theme} />
          </div>
          <div className="mr-2">
            <ConnectButton />
          </div>
          <div>
            <ProfilePopover />
          </div>
        </div>
      </HeaderWrapper>
    </header>
  );
}
