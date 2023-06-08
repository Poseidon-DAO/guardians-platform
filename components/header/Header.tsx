import { ConnectButton, Logo } from "@/components";

import HeaderWrapper from "./HeaderWrapper";
import { ProfilePopover } from "../profile-popover";
import { type ThemeTypes } from "../switch-theme/SwitchTheme";

interface IProps {
  isConnected: boolean;
  theme?: ThemeTypes;
}

export default function Header({ isConnected, theme }: IProps) {
  return (
    <header className="w-full fixed bg-blue dark:bg-background z-50">
      <HeaderWrapper>
        <Logo />

        <div className="flex items-center">
          <ConnectButton />

          {isConnected && (
            <div className="ml-2">
              <ProfilePopover theme={theme} />
            </div>
          )}
        </div>
      </HeaderWrapper>
    </header>
  );
}
