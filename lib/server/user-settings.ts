import { cookies } from "next/headers";
import { type LayoutTypes } from "@/components/collection/view-toggle/ViewToggle";
import { ThemeTypes } from "@/components/switch-theme/SwitchTheme";

export type UserSettings = {
  id: number;
  userId: string;
  theme: ThemeTypes;
  collectionLayout: LayoutTypes;
  showVotedCollection: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type DefaultUserSettings = {
  theme: "light";
  collectionLayout: "big-grid";
  showVotedCollection: false;
};

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

export async function getUserSettings() {
  const userId = cookies().get("userId")?.value;

  const url = new URL("/user/settings", baseUrl);

  url.searchParams.append("userId", userId!);

  const res = await fetch(url.toString(), { cache: "no-cache" });
  if (!res.ok) {
    return {
      theme: "light",
      collectionLayout: "big-grid",
      showVotedCollection: false,
    } as DefaultUserSettings;
  }
  const settings = (await res.json()) as UserSettings;

  return settings;
}
