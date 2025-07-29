import { API_URL } from "../../../constants/env.ts";
import { useAuth } from "../../../context/Auth/AuthProvider.tsx";
import { useModal } from "../../../context/GlobalState/ModalProvider.tsx";



export function UseTempAccountButton() {
  const { setAuthId } = useAuth();
  const { setModalType } = useModal()

  function authenticateTempUser() {
    fetch(`${API_URL}/api/auth/demo-signup`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Temp login failed");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setAuthId(data.user.id);
        setModalType("createAccount")
      })

      .catch((err) => {
        console.error("Admin login error:", err);
      });
  }

  return (
    <div
      onClick={() => authenticateTempUser()}
      className={`hover:cursor-pointer hover:bg-(--color-main)/75 w-full bg-(--color-main) text-twitterText flex items-center gap-2 justify-center h-10 rounded-full`}
    >
      <p className="">Use a temporary account</p>
    </div>
  );
}
