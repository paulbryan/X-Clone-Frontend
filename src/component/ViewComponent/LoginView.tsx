import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../../context/currentUser/AuthProvider';
import InputFormField from '../InputComponent/InputFormField';

import type { ModalType } from '../../types/ModalType';
import { useCurrentUser } from '../../hooks/CurrentUserProvider';
import { UserCacheProvider } from '../../context/cache/UserCacheProvider';
import { useQueryClient } from '@tanstack/react-query';

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
        <div className="w-full h-full flex flex-col text-(--text-main) rounded-2xl p-4 items-center gap-4 bg-(--background-main)">
            <div>
                <h1 className="text-4xl text-center font-bold">Log in to X</h1>
            </div>

            <div className='w-full h-20 flex items-center justify-around'>

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
                

            </div>


            <div className="flex flex-col gap-4 w-full text-xl">
                <InputFormField inputValue={usernameInput} setInputValue={setUserNameInput} placeholderValue='Username'/>
                <InputFormField inputValue={emailInput} setInputValue={setEmailInput} placeholderValue='Email'/>
                <InputFormField inputValue={passwordInput} setInputValue={setPasswordInput} placeholderValue='Password'/>
            </div>

            <div className='w-full gap-2 flex flex-col justify-center items-center'>

                    <div onClick={() => loginUser()} className='w-full font-semibold rounded-md p-2 h-auto border flex text-center justify-center items-center border-(--color-main)'>
                        <p>Sign In</p>
                    </div>

                    <p className='text-(--twitter-text)'>or</p>

                    <div onClick={() => setToggle("signup")} className='w-full font-semibold rounded-md p-2 h-auto border flex text-center justify-center items-center border-(--color-main)'>
                        <p>Not a user? Sign up</p>
                    </div>

            </div>

        </div>
    )

}

export default LoginView;