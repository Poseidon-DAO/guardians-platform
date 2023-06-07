import { useMutation } from "@tanstack/react-query";

type SettingsParams = { userId: string; status: boolean };

const key: string = "/settings";
const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;
const url = new URL("/user/settings", baseUrl);

async function settingsAction({ status, userId }: SettingsParams) {
  const res = await fetch(url.toString(), {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userId,
      showVotedCollection: status,
    }),
  });
  return await res.json();
}

export default function useSettings({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  return useMutation({
    mutationFn: ({ status, userId }: SettingsParams) =>
      settingsAction({ status, userId }),
    mutationKey: [key],
    onSuccess: onSuccess,
  });
}
