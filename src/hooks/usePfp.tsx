import { useQuery } from "@tanstack/react-query";

export const usePfp = (userId: number | undefined) => {
  return useQuery<string>({
    queryKey: ["pfp", userId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/api/users/getProfilePic?id=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch profile picture");
      return await res.text(); // base64 string
    },
    enabled: typeof userId === "number" && userId > 0,
    staleTime: 1000 * 60 * 10,
  });
};