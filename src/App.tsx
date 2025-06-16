import './App.css'
import FooterBar from './component/Layout/FooterBar'
import Header from './component/Layout/Header';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from './component/Layout/HomePage';
import ProfilePage from './component/Layout/ProfilePage';
import { ModalProvider } from './context/GlobalState/ModalProvider';
import ModalManager from './component/Modal/ModalManager';
import { CurrentUserProvider } from './hooks/queries/CurrentUserProvider';
import BookmarkPage from './component/Layout/BookmarkPage';
import NotificationPage from './component/Layout/NotificationPage';
import FullPost from './component/Tweet/FullPost';
import { HeaderContentProvider } from './context/GlobalState/HeaderContentProvider';
import { Toaster, type DefaultToastOptions } from 'react-hot-toast';
import AboutPage from './component/Layout/AboutPage';



function App() {

  const toastOptions: DefaultToastOptions = {
    style: {
      color: 'white',
      borderRadius: '4px',
      backgroundColor: 'var(--color-main)'
    },
    success: { duration: 4000 }
  };


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
