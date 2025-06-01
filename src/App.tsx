import { useEffect, useState } from 'react';
import './App.css'
import FooterBar from './component/FooterBar'
import Header from './component/Header';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import HomePage from './component/ScreenPages/HomePage';
import ProfilePage from './component/ScreenPages/ProfilePage';
import { ModalProvider } from './component/Context/ModalProvider';
import ModalManager from './component/Modal/ModalManager';
import { CurrentUserProvider } from './component/Context/CurrentUserProvider';
import type { User } from './types/User';
import { UserCacheProvider } from './component/Context/UserCacheProvider';
import { PostCacheProvider } from './component/Context/PostCacheProvider';



function App() {


  return (
    <Router>
      <CurrentUserProvider>
        <ModalProvider>
        <UserCacheProvider>
        <PostCacheProvider>
        <ModalManager />

        <div className="w-dvw h-dvh max-h-dvh max-w-dvw bg-[var(--background-main)] text-[var(--color-main)] transition-colors duration-300 flex flex-col">

          <div>
            <Header/>
          </div>

          {/* <div>
            <TabList/>
          </div> */}

        <div className='flex-grow overflow-y-auto'>
        <Routes>

        <Route
        path=""
        element={
          <HomePage/>
        }
        />

        <Route
        path="profile/:ID"
        element={
          <ProfilePage/>
        }
        />



        </Routes>
        </div>

          <div className=''>
            <FooterBar/>
          </div>

        </div>
        </PostCacheProvider>
        </UserCacheProvider>
        </ModalProvider>
      </CurrentUserProvider>
    </Router>
  );
}

export default App
