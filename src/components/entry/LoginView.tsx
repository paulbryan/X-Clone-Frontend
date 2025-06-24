import { useState } from 'react';
import { useAuth } from '../../context/Auth/AuthProvider.tsx';
import InputFormField from '../input/InputFormField.tsx';

import type { ModalType } from '../../lib/types/ModalType.ts';
import { FaXTwitter } from 'react-icons/fa6';
import { GoogleSignInButton } from '../ui/GoogleSignInButton.tsx';
import { HorizontalStripedText } from '../ui/HorizontalStripedText.tsx';
import { TermsAndConditions } from './TermsAndConditions.tsx';


type LoginViewProps = {
    setToggle: (type: ModalType) => void;

}

function LoginView ({ setToggle }: LoginViewProps) {
    const [usernameInput, setUserNameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
  
    const { setAuthId } = useAuth();

    function loginUser() {
      const loginUser = {
        username: usernameInput,
        password: passwordInput,
        email: emailInput,
      };
  
      fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginUser),
      })
        .then(res => {
          if (!res.ok) throw new Error("Login failed");
          return res.json();
        })
        .then(user => {
          setAuthId(user.id);
          setToggle(null);
        })
        .catch(err => {
          console.error("Login error:", err);
        });
    }
  
    function adminLoginQuick(id: number) {
      fetch(`http://localhost:8080/api/users/getAdminUser?id=${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Admin login failed");
          return res.json();
        })
        .then(user => {
          setAuthId(user.id); // ✅ same logic
          setToggle(null);
        })
        .catch(err => {
          console.error("Admin login error:", err);
        });
    }
    return (

      <div className="w-full h-full flex flex-col border text-twitterText rounded-4xl p-8 items-center gap-6 bg-(--background-main)">
        <FaXTwitter className="text-4xl" />

        <p className="text-xl font-bold text-center">Sign in to X</p>

        <GoogleSignInButton>
          Sign in with Google
        </GoogleSignInButton>  

        <HorizontalStripedText> OR </HorizontalStripedText>

        <div className="w-full bg-(--color-main) text-twitterText flex items-center gap-2 justify-center h-10 rounded-full">
          <p className="">Use a temporary account</p>
        </div>

        <p className="text-md w-full font text-twitterTextAlt">
          Don't have an account? <span className='text-(--color-main)'>Sign up</span>
        </p>

        <p className="text-md w-full font text-twitterTextAlt">
          Are you the admin? <span onClick={() => adminLoginQuick(13)} className='text-(--color-main)'>Sign in here</span>
        </p>


              {/* <div className='w-full h-20 flex items-center justify-around'>

                <div onClick={() => adminLoginQuick(13)} className='w-16 h-16 border flex items-center justify-center border-(--color-main)'>
                    <p className=' font-bold text-(--color-main)'>JOKER</p>
                </div>
                <div onClick={() => adminLoginQuick(14)} className='w-16 h-16 border flex items-center justify-center border-(--color-main)'>
                    <p className=' font-bold text-(--color-main)'>STEVE</p>
                </div>
                <div onClick={() => adminLoginQuick(14)} className='w-16 h-16 border flex items-center justify-center border-(--color-main)'>
                    <p className=' font-bold text-(--color-main)'>BILL</p>
                </div>
                <div onClick={() => adminLoginQuick(15)} className='w-16 h-16 border flex items-center justify-center border-(--color-main)'>
                    <p className=' font-bold text-(--color-main)'>ZUCK</p>
                </div>
                

            </div> */}
    </div>




    )

}

export default LoginView;