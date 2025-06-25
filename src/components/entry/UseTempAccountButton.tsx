import { API_URL } from "../../constants/env";
import { useAuth } from "../../context/Auth/AuthProvider";
import type { ModalType } from "../../lib/types/ModalType";

type UseTempAccountButtonProps = {
    setToggle: (type: ModalType) => void;
}

export function UseTempAccountButton ({setToggle}: UseTempAccountButtonProps) {

    const { setAuthId } = useAuth();

    function authenticateTempUser () {

        fetch(`${API_URL}/api/auth/tempSignup`, {
          method: "POST",
        })
        .then(res => {
          if (!res.ok) throw new Error("Temp login failed");
          return res.json();
        })
        .then(user => {
          setAuthId(user.id);
          setToggle(null);
        })
        .catch(err => {
          console.error("Admin login error:", err);
        });
  
      }

    return (
    <div onClick={() => authenticateTempUser()} className="w-full bg-(--color-main) text-twitterText flex items-center gap-2 justify-center h-10 rounded-full">
        <p className="">Use a temporary account</p>
      </div>
    )

}