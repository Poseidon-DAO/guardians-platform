"use client";

import useSettings from "@/lib/client/useSettings";
import { useRouter } from "next/navigation";

export type ThemeTypes = "dark" | "light";

interface IProps {
  theme: ThemeTypes;
}

export default function SwitchTheme({ theme }: IProps) {
  const router = useRouter();
  const { mutate: setSettings } = useSettings({
    fieldToUpdate: "theme",
    onSuccess: () => router.refresh(),
  });

  function handleClick() {
    setSettings({ fieldValue: theme === "dark" ? "light" : "dark" });
  }

  return (
    <div className="text-white" onClick={handleClick}>
      SWITCH THEME {theme}
    </div>
  );
}
