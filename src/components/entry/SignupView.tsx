

import type { ModalType } from "../../lib/types/ModalType.ts";
import { FaXTwitter } from "react-icons/fa6";
import { GoogleAuthButton } from "../ui/GoogleAuthButton.tsx";
import { HorizontalStripedText } from "../ui/HorizontalStripedText.tsx";
import { TermsAndConditions } from "./TermsAndConditions.tsx";
import { UseTempAccountButton } from "./UseTempAccountButton.tsx";

type SignUpViewProps = {
  setToggle: (type: ModalType) => void;
};

function SignupView({ setToggle }: SignUpViewProps) {


  // async function encodeImageToBase64(path: string): Promise<string> {
  //   const response = await fetch(path);
  //   const blob = await response.blob();

  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const result = reader.result;
  //       if (typeof result === "string") {
  //         const base64 = result.split(",")[1];
  //         resolve(base64);
  //       } else {
  //         reject("Invalid result");
  //       }
  //     };
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // }

  // const onProfileImageChange = (event: any) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setProfilePicInput(URL.createObjectURL(event.target.files[0]));
  //   }
  // };

  // const onBannerImageChange = (event: any) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setBannerInput(URL.createObjectURL(event.target.files[0]));
  //   }
  // };

  return (
    <div className="w-full h-full flex flex-col border text-twitterText rounded-4xl p-8 items-center gap-6 bg-(--background-main)">
      <>
        <FaXTwitter className="text-4xl" />

        <p className="text-xl font-bold text-center">Create an account</p>

        <GoogleAuthButton setToggle={setToggle}>
          Sign up with Google
        </GoogleAuthButton> 

        <HorizontalStripedText> OR </HorizontalStripedText>

        <UseTempAccountButton setToggle={setToggle}/>

        <TermsAndConditions />

        <p className="text-lg font-bold text-center">
          Already have an account?
        </p>

        <div className="w-full hover:cursor-pointer hover:bg-twitterText/75 bg-twitterText text-(--color-main) flex items-center gap-2 justify-center h-10 rounded-full">
          <p>Sign in</p>
        </div>
      </>
    </div>
  );
}

export default SignupView;
