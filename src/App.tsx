import { useState } from 'react';
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



function App() {


  return (
    <Router>
      <CurrentUserProvider>
        <ModalProvider>

        <ModalManager />

        <div className="w-dvw h-dvh max-h-dvh max-w-dvw bg-[var(--background-main)] text-[var(--color-main)] transition-colors duration-300 flex flex-col">

          <div>
            <Header/>
          </div>

          {/* <div>
            <TabList/>
          </div> */}

          <Routes>

            <Route
            path=""
            element={
              <HomePage/>
            }
            />

            <Route
            path="profile"
            element={
              <ProfilePage/>
            }
            />



          </Routes>

          <div className=''>
            <FooterBar/>
          </div>

        </div>
        </ModalProvider>
      </CurrentUserProvider>
    </Router>
  );
}

export default App
