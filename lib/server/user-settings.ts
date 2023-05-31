export type UserSettings = {
  id: number;
  userId: string;
  theme: string;
  collectionLayout: "table" | "column" | "grid";
  showVotedCollection: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

export async function getUserSettings(userId: string) {
  const url = new URL("/user/settings", baseUrl);

  url.searchParams.append("userId", userId);

  const res = await fetch(url.toString(), { cache: "no-cache" });
  if (!res.ok) throw new Error(res.statusText);
  const settings = (await res.json()) as UserSettings;

  return settings;
}
