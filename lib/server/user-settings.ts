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

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

export async function getUserSettings() {
  const userId = cookies().get("userId")?.value;

  const url = new URL("/user/settings", baseUrl);

  url.searchParams.append("userId", userId!);

  const res = await fetch(url.toString(), { cache: "no-cache" });
  if (!res.ok) throw new Error(res.statusText);
  const settings = (await res.json()) as UserSettings;

  return settings;
}
