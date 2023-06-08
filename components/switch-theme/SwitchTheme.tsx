"use client";

import useSettings from "@/lib/client/useSettings";
import { useRouter } from "next/navigation";
import { Moon } from "react-feather";

import { Switch } from "../ui";

export type ThemeTypes = "dark" | "light";

interface IProps {
  theme?: ThemeTypes;
}

export default function SwitchTheme({ theme = "light" }: IProps) {
  const router = useRouter();
  const { mutate: setSettings } = useSettings({
    fieldToUpdate: "theme",
    onSuccess: () => router.refresh(),
  });

  function handleThemeChange(checked: boolean) {
    setSettings({ fieldValue: checked ? "dark" : "light" });
  }

  return (
    <div className="flex items-center">
      <div className="pr-4">
        <Moon />
      </div>

      <Switch
        checked={theme === "dark"}
        onChange={handleThemeChange}
        label="Night mode"
      />
    </div>
  );
}
