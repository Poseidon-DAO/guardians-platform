import { type LayoutTypes } from "@/components/collection/view-toggle/ViewToggle";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/zustand/user";
import { type ThemeTypes } from "@/components/switch-theme/SwitchTheme";

import { type UserSettings } from "../server";

type FieldToUpdate = keyof Pick<
  UserSettings,
  "collectionLayout" | "showVotedCollection" | "theme"
>;

type FieldValue = {
  collectionLayout: LayoutTypes;
  showVotedCollection: boolean;
  theme: ThemeTypes;
};

type SettingsParams<T extends FieldToUpdate> = {
  fieldToUpdate: T;
  fieldValue: FieldValue[T];
  userId: string;
};

const key: string = "/settings";
const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;
const url = new URL("/user/settings", baseUrl);

async function settingsAction<T extends FieldToUpdate>({
  fieldToUpdate,
  fieldValue,
  userId,
}: SettingsParams<T>) {
  const res = await fetch(url.toString(), {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId,
      [fieldToUpdate]: fieldValue,
    }),
  });
  return await res.json();
}

export default function useSettings<T extends FieldToUpdate>({
  fieldToUpdate,
  onSuccess,
}: {
  fieldToUpdate: T;
  onSuccess?: () => void;
}) {
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ fieldValue }: { fieldValue: FieldValue[T] }) =>
      settingsAction({ fieldToUpdate, fieldValue, userId: user?.id as string }),
    mutationKey: [key],
    onSuccess: onSuccess,
  });
}
