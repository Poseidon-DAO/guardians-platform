import { useMutation } from "@tanstack/react-query";

const key: string = "/logout";

async function logout() {
  const res = await fetch("/api/disconnect", {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    method: "POST",
  });
  return await res.json();
}

export default function useLogout() {
  return useMutation({
    mutationFn: logout,
    mutationKey: [key],
  });
}
