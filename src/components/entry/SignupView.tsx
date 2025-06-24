import { useEffect, useState } from "react";
import InputFormField from "../input/InputFormField.tsx";
import type { SignupUser } from "../../lib/types/SignupUser.ts";

import type { ModalType } from "../../lib/types/ModalType.ts";
import { useCurrentUser } from "../../context/Auth/CurrentUserProvider.tsx";
import { FaGoogle, FaXTwitter } from "react-icons/fa6";

type SignUpViewProps = {
  setToggle: (type: ModalType) => void;
};

function SignupView({ setToggle }: SignUpViewProps) {
  const [usernameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [profilePicInput, setProfilePicInput] = useState("/defaultPFP.png");
  const [bannerInput, setBannerInput] = useState("/defaultBanner.jpg");
  const [emailInput, setEmailInput] = useState("");
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [bioInput, setBioInput] = useState("");

  const [isOnMainCreateAccountPage, setIsOnMainCreateAccountPage] =
    useState<boolean>(true);

  const { currentUser } = useCurrentUser();

  async function encodeImageToBase64(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string") {
          const base64 = result.split(",")[1];
          resolve(base64);
        } else {
          reject("Invalid result");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const onProfileImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicInput(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onBannerImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setBannerInput(URL.createObjectURL(event.target.files[0]));
    }
  };

  async function registerUser() {
    const profilePicBase64 = await encodeImageToBase64(profilePicInput);
    const bannerImageBase64 = await encodeImageToBase64(bannerInput);

    const newUser: SignupUser = {
      username: usernameInput,
      password: passwordInput,
      displayName: displayNameInput,
      profilePicture: profilePicBase64,
      bannerImage: bannerImageBase64,
      bio: bioInput,
      email: emailInput,
    };

    console.log("BANNER BASE64:", bannerImageBase64);

    fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user);

        setToggle(null);
      });
  }

  useEffect(() => {
    console.log("curriser " + currentUser);
  }, [currentUser]);

  return (
    <div className="w-full h-full flex flex-col border text-twitterText rounded-4xl px-4 py-8 items-center gap-6 bg-(--background-main)">
      {isOnMainCreateAccountPage ? (
        <>
          <FaXTwitter className="text-4xl" />

          <div>
            <p className="text-xl font-bold text-center">Create an account</p>
          </div>

          <div className="w-full flex flex-col">
            <div className="w-full bg-twitterText text-twitterBlack flex items-center gap-2 justify-center h-10 rounded-full">
              <FaGoogle />
              <p className="font-bold">Sign up with Google</p>
            </div>
          </div>

          <div className="w-full flex items-center text-twitterBorder">
            <div className="w-full">
              <hr />
            </div>
            <p className="mx-2 text-twitterTextAlt">OR</p>
            <div className="w-full">
              <hr />
            </div>
          </div>

          <div className="w-full justify-center items-center">
            <div
              onClick={() => setIsOnMainCreateAccountPage(false)}
              className="w-full bg-(--color-main) text-twitterText flex items-center gap-2 justify-center h-10 rounded-full"
            >
              <p className="font-bold">Create an account</p>
            </div>
          </div>

          <div className="text-xs text-center text-twitterTextAlt">
            <p>
              By signing up, you agree to the{" "}
              <span className="text-(--color-main)">Terms of Service</span> and{" "}
              <span className="text-(--color-main)">Privacy Policy</span>,{" "}
              <span className="text-(--color-main)">including Cookie Use.</span>
            </p>
          </div>

          <div>
            <p className="text-lg font-bold text-center">
              Already have an account?
            </p>
          </div>

          <div className="w-full justify-center items-center">
            <div className="w-full bg-twitterText text-(--color-main) flex items-center gap-2 justify-center h-10 rounded-full">
              <p>Sign in</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full text-2xl font-bold">
            <p>Create your account</p>
          </div>
          <div className="w-full h-28 mb-4">
            <div className="w-full h-24 relative">
              <img className="h-full w-full object-cover" src={bannerInput} />
              <input
                className="opacity-0 z-20 absolute top-0 w-full h-full"
                type="file"
                onChange={onBannerImageChange}
              />
              <div
                className="w-18 h-18 absolute  left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  className="rounded-full border-2 relative border-(--background-main)"
                  src={profilePicInput}
                />
                <input
                  className="opacity-0 z-30 rounded-full absolute top-0 w-18 h-18"
                  type="file"
                  onChange={onProfileImageChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full text-xl">
            <InputFormField
              inputValue={usernameInput}
              setInputValue={setUserNameInput}
              placeholderValue="Username"
            />
            <InputFormField
              inputValue={emailInput}
              setInputValue={setEmailInput}
              placeholderValue="Email"
            />
            <InputFormField
              inputValue={displayNameInput}
              setInputValue={setDisplayNameInput}
              placeholderValue="Display name"
            />
            <InputFormField
              inputValue={bioInput}
              setInputValue={setBioInput}
              placeholderValue="About you"
              isTextArea={true}
            />
            <InputFormField
              inputValue={passwordInput}
              setInputValue={setPasswordInput}
              placeholderValue="Password"
            />
          </div>

          <div className="w-full gap-2 flex flex-col justify-center items-center">
            <div
              onClick={() => registerUser()}
              className="w-full font-semibold rounded-full px-2 py-4 h-auto flex text-center justify-center items-center text-twitterBlack bg-twitterText"
            >
              <p>Sign Up</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SignupView;
