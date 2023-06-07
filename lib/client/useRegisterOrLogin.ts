import { useMutation } from "@tanstack/react-query";

export type User = {
  id: number;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  isGuardian: boolean;
  gNfts: string;
};

const key: string = "/registerOrLogin";

async function registerOrLogin(address: string): Promise<User> {
  const res = await fetch(`/api/connect?address=${address}`, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    method: "POST",
  });
  return await res.json();
}

export default function useRegisterOrLogin() {
  return useMutation({
    mutationFn: (query: string) => registerOrLogin(query),
    mutationKey: [key],
  });
}
