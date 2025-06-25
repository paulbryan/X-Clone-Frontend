import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../../context/Auth/AuthProvider";


export function useGoogleAuthEntry() {
    const { setAuthId } = useAuth();
  
    return useGoogleLogin({
      flow: "implicit",
      onSuccess: async (tokenResponse) => {
        try {
          const res = await fetch("http://localhost:8080/api/auth/google", {
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

  