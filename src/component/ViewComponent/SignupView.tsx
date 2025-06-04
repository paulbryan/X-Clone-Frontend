import { useEffect, useState } from 'react';
import InputFormField from '../InputComponent/InputFormField';
import type { SignupUser } from '../../types/SignupUser';

import type { ModalType } from '../../types/ModalType';
import { useCurrentUser } from '../Context/CurrentUserProvider';

type SignUpViewProps = {
    setToggle: (type: ModalType) => void;

}

function SignupView ({ setToggle }: SignUpViewProps) {

    const [usernameInput, setUserNameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [profilePicInput, setProfilePicInput] = useState("/defaultPFP.png");
    const [bannerInput, setBannerInput] = useState("/defaultBanner.jpg");
    const [emailInput, setEmailInput] = useState("");
    const [displayNameInput, setDisplayNameInput] = useState("");
    const [bioInput, setBioInput] = useState("");

    const { currentUser, setCurrentUser, initializeNotifications } = useCurrentUser();

    async function encodeImageToBase64(path: string): Promise<string> {
        const response = await fetch(path);
        const blob = await response.blob();
      
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result;
            if (typeof result === "string") {
              const base64 = result.split(",")[1]; // Strip "data:image/jpeg;base64,"
              resolve(base64);
            } else {
              reject("Invalid result");
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob); // ✅ KEY LINE
        });
      }

      const onProfileImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
          setProfilePicInput(URL.createObjectURL(event.target.files[0]));
        }
       }

       const onBannerImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
          setBannerInput(URL.createObjectURL(event.target.files[0]));
        }
       }
    

    async function registerUser () {

        const profilePicBase64 = await encodeImageToBase64(profilePicInput);
        const bannerImageBase64 = await encodeImageToBase64(bannerInput);


        const newUser : SignupUser = {

            username: usernameInput,
            password: passwordInput,
            displayName: displayNameInput,
            profilePicture: profilePicBase64,
            bannerImage: bannerImageBase64,
            bio: bioInput,
            email: emailInput,

        }

        console.log("BANNER BASE64:", bannerImageBase64);

        fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          })
          .then(res => res.json())
          .then(data => {
            console.log(data.user);
            setCurrentUser(data);
            initializeNotifications(data.id);
            setToggle(null)
          });



    }

    useEffect(() => {
        console.log("curriser " + currentUser)
    }, [currentUser])



    return (
        <div className="w-full h-full flex flex-col text-(--text-main) rounded-2xl p-4 items-center gap-4 bg-(--background-main)">
            <div>
                <h1 className="text-4xl text-center font-bold">Sign up to X</h1>
            </div>

            <div className="w-full h-28 mb-4">
                <div className="w-full h-24 relative">
                    <img className="h-full w-full object-cover" src={bannerInput}/>
                    <input className="opacity-0 z-20 absolute top-0 w-full h-full" type="file" onChange={onBannerImageChange}  />
                    <div className="w-18 h-18 absolute  left-1/2 -translate-x-1/2 -translate-y-1/2" onClick={(e) => e.stopPropagation()}>
                        <img className="rounded-full border-2 relative border-(--background-main)" src={profilePicInput}/>
                        <input className="opacity-0 z-30 rounded-full absolute top-0 w-18 h-18" type="file" onChange={onProfileImageChange}  />
                    </div>

                </div>
            </div>


            <div className="flex flex-col gap-4 w-full text-xl">
                <InputFormField inputValue={usernameInput} setInputValue={setUserNameInput} placeholderValue='Username'/>
                <InputFormField inputValue={emailInput} setInputValue={setEmailInput} placeholderValue='Email'/>
                <InputFormField inputValue={displayNameInput} setInputValue={setDisplayNameInput} placeholderValue='Display name'/>
                <InputFormField inputValue={bioInput} setInputValue={setBioInput} placeholderValue='About you' isTextArea={true}/>
                <InputFormField inputValue={passwordInput} setInputValue={setPasswordInput} placeholderValue='Password'/>
            </div>

            <div className='w-full gap-2 flex flex-col justify-center items-center'>

                    <div onClick={() => registerUser()} className='w-full font-semibold rounded-md p-2 h-auto border flex text-center justify-center items-center border-(--color-main)'>
                        <p>Complete Registration</p>
                    </div>

                    <p className='text-(--twitter-text)'>or</p>

                    <div onClick={() => setToggle("login")} className='w-full font-semibold rounded-md p-2 h-auto border flex text-center justify-center items-center border-(--color-main)'>
                        <p>Already a user? Sign in</p>
                    </div>

            </div>

        </div>
    )

}

export default SignupView;