import { useState } from 'react';
import InputFormField from '../InputComponent/InputFormField';

import type { ModalType } from '../../types/ModalType';

type SignUpViewProps = {
    setToggle: (type: ModalType) => void;

}

function SignupView ({ setToggle }: SignUpViewProps) {

    const [usernameInput, setUserNameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [profilePicInput, setProfilePicInput] = useState("");
    const [bannerInput, setBannerInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [displayNameInput, setDisplayNameInput] = useState("");
    const [bioInput, setBioInput] = useState("");



    return (
        <div className="w-full h-full flex flex-col text-(--text-main) rounded-2xl p-4 items-center gap-4 bg-(--background-main)">
            <div>
                <h1 className="text-4xl text-center font-bold">Sign up to X</h1>
            </div>

            <div className="w-full h-28 mb-4">
                <div className="w-full h-24 relative">
                    <img className="h-full w-full object-cover" src="https://downtownpensacola.com/static/img/defaultbanner.jpg" />
                    <div className="w-18 h-18 absolute  left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img className="rounded-full border-2 border-(--background-main)" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ttRb7_2jlpN1FJ8fIgDbjcHZVhhrwDxhaQ&s"/>
                    </div>
                </div>
            </div>


            <div className="flex flex-col gap-4 w-full text-xl">
                <InputFormField inputValue={usernameInput} setInputValue={setUserNameInput} placeholderValue='Username'/>
                <InputFormField inputValue={emailInput} setInputValue={setUserNameInput} placeholderValue='Email'/>
                <InputFormField inputValue={displayNameInput} setInputValue={setDisplayNameInput} placeholderValue='Display name'/>
                <InputFormField inputValue={bioInput} setInputValue={setBioInput} placeholderValue='About you' isTextArea={true}/>
                <InputFormField inputValue={passwordInput} setInputValue={setPasswordInput} placeholderValue='Password'/>
            </div>

            <div className='w-full gap-2 flex flex-col justify-center items-center'>

                    <div className='w-full font-semibold rounded-md p-2 h-auto border flex text-center justify-center items-center border-(--color-main)'>
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