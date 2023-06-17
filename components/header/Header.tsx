import { ConnectButton, Logo } from "@/components";

import HeaderWrapper from "./HeaderWrapper";
import { type ThemeTypes } from "../switch-theme/SwitchTheme";

interface IProps {
  isConnected: boolean;
  theme?: ThemeTypes;
}

export default function Header({ isConnected, theme }: IProps) {
  return (
    <header className="w-full fixed bg-blue dark:bg-background z-50 dark:border-b-[1.5px] dark:border-darkBorder">
      <HeaderWrapper>
        <Logo />

        <div>
          <ConnectButton theme={theme} hasUserSession={isConnected} />
        </div>
      </HeaderWrapper>
    </header>
  );
}
