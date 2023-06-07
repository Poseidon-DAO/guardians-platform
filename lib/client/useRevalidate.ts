import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const key: string = "/revalidate";

async function revalidate(tag: string) {
  const res = await fetch(`/api/revalidate?tag=${tag}`, {
    method: "GET",
  });
  return await res.json();
}

export default function useRevalidate({
  refreshOnSuccess = true,
}: {
  refreshOnSuccess?: boolean;
} = {}) {
  const router = useRouter();

  return useMutation({
    mutationFn: revalidate,
    mutationKey: [key],
    onSuccess: () => {
      if (refreshOnSuccess) {
        router.refresh();
      }
    },
  });
}
