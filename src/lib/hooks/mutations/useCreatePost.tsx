import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData): Promise<void> => {
      const res = await fetch("http://localhost:8080/api/posts/createPost", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to post");
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["foryoufeed"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      if (variables instanceof FormData && variables.get("parentId")) {
        const parentId = variables.get("parentId");
        console.log("Parent id is" + parentId)
        queryClient.invalidateQueries({ queryKey: ["post", Number(parentId)] })
        ;
      }
    },
  });
};