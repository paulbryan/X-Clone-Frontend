import './App.css'
import FooterBar from './components/layout/FooterBar.tsx'
import Header from './components/layout/Header.tsx';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from './components/layout/pages/HomePage.tsx';
import ProfilePage from './components/layout/pages/profile/ProfilePage.tsx';
import { ModalProvider } from './context/GlobalState/ModalProvider';
import ModalManager from './components/modal/ModalManager';
import { CurrentUserProvider } from './context/Auth/CurrentUserProvider.tsx';
import BookmarkPage from './components/layout/pages/BookmarkPage.tsx';
import NotificationPage from './components/layout/pages/NotificationPage.tsx';
import FullPost from './components/tweet/FullPost.tsx';
import { HeaderContentProvider } from './context/GlobalState/HeaderContentProvider';
import { Toaster, type DefaultToastOptions } from 'react-hot-toast';
import AboutPage from './components/layout/pages/AboutPage.tsx';

import { useEffect } from 'react';


function App() {

  const toastOptions: DefaultToastOptions = {
    style: {
      color: 'white',
      borderRadius: '4px',
      backgroundColor: 'var(--color-main)'
    },
    success: { duration: 4000 }
  };

  useEffect(() => {
    document.fonts.ready.then(() => {
      const isLoaded = document.fonts.check('16px "TwitterChirp"');
      console.log('TwitterChirp loaded?', isLoaded);
    });
  }, [])


  return (
    <Router>
      <CurrentUserProvider>
        <ModalProvider>
        <HeaderContentProvider>
          
        <ModalManager />

        <div className="overscroll-y-contain w-dvw h-dvh max-h-dvh max-w-dvw bg-[var(--background-main)] text-[var(--color-main)] transition-colors duration-300 flex flex-col">

          <div>
            <Header/>
          </div>

          {/* <div>
            <TabList/>
          </div> */}

        <div className='flex-grow overflow-hidden flex flex-col'>
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
            <ProfilePage />
          }
        />

        <Route
          path="tweet/:postId"
          element={
            <FullPost />
          }
        />

        <Route
        path="bookmarks"
        element={
          <BookmarkPage/>
        }
        />

        <Route
        path="notifications"
        element={
          <NotificationPage/>
        }
        />

        <Route
        path="about"
        element={
          <AboutPage/>
        }
        />



        </Routes>
        <Toaster
        position='bottom-center'
        toastOptions={toastOptions}
        containerClassName='mb-12 xs:mb-0'
        />
        </div>

          <div className=''>
            <FooterBar/>
          </div>

        </div>
        </HeaderContentProvider>
        </ModalProvider>
      </CurrentUserProvider>
    </Router>
  );
}

export default App
