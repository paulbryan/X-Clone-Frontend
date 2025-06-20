import { create, windowScheduler } from "@yornaath/batshit";
import type { User } from "../../types/User.ts";

export const userBatcher = create<User, number>({
  fetcher: async (ids: number[]) => {
    const res = await fetch("http://localhost:8080/api/users/getUsers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    });

    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  },

  resolver: (results, id) => {
    if (!Array.isArray(results)) {
      throw new Error("Expected array of users");
    }
    const match = results.find((u) => u.id === id);
    if (!match) throw new Error("User not found for id: " + id);
    return match;
  },

  scheduler: windowScheduler(10),
});