import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../../context/Auth/AuthProvider";
import { API_URL } from "../../../constants/env";


export function useGoogleAuthEntry() {
    const { setAuthId } = useAuth();
  
    return useGoogleLogin({
      flow: "implicit",
      onSuccess: async (tokenResponse) => {
        try {
          const res = await fetch(`${API_URL}/api/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: tokenResponse.access_token }),
          });
  
          if (!res.ok) {
            console.error("Login failed");
            return;
          }
  
          const data = await res.json();
          console.log("User authenticated with data: " + data);
          setAuthId(data.id);
  
        } catch (err) {
          console.error("Login error:", err);
        }
      },
      onError: () => {
        console.error("Google login failed");
      },
    });
  }

