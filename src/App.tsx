import "./App.css";
import FooterBar from "./components/layout/FooterBar.tsx";
import Header from "./components/layout/Header.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/layout/pages/HomePage.tsx";
import ProfilePage from "./components/layout/pages/profile/ProfilePage.tsx";
import { ModalProvider } from "./context/GlobalState/ModalProvider";
import ModalManager from "./components/modal/ModalManager";
import { CurrentUserProvider } from "./context/Auth/CurrentUserProvider.tsx";
import BookmarkPage from "./components/layout/pages/BookmarkPage.tsx";
import NotificationPage from "./components/layout/pages/NotificationPage.tsx";
import FullPost from "./components/tweet/FullPost.tsx";
import { HeaderContentProvider } from "./context/GlobalState/HeaderContentProvider";
import { Toaster, type DefaultToastOptions } from "react-hot-toast";
import AboutPage from "./components/layout/pages/AboutPage.tsx";
import ExplorePage from "./components/layout/pages/ExplorePage.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./constants/env.ts";
import { LeftDesktopLayout } from "./components/layout/DesktopSideLayouts/LeftDesktopLayout.tsx";
import { RightDesktopLayout } from "./components/layout/DesktopSideLayouts/RightDesktopLayout.tsx";

function App() {
  const toastOptions: DefaultToastOptions = {
    style: {
      color: "white",
      borderRadius: "4px",
      backgroundColor: "var(--color-main)",
    },
    success: { duration: 4000 },
  };

  return (
    <Router>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <CurrentUserProvider>
          <ModalProvider>
            <HeaderContentProvider>
              <ModalManager />

              <div className="xl:flex 2xl:px-80 xl:px-20 bg-[var(--background-main)] xl:justify-between">
                <LeftDesktopLayout />

                <div className="overscroll-y-contain no-scrollbar w-dvw h-dvh max-h-dvh max-w-dvw xl:w-full xl:bg-none bg-[var(--background-main)] text-[var(--color-main)] transition-colors duration-300 flex flex-col">
                  <div className="">
                    <Header />
                  </div>

                  <div className="flex-grow overflow-y-hidden flex flex-col">
                    <Routes>
                      <Route path="" element={<HomePage />} />

                      <Route path="profile/:ID" element={<ProfilePage />} />

                      <Route path="tweet/:postId" element={<FullPost />} />

                      <Route path="bookmarks" element={<BookmarkPage />} />

                      <Route path="explore" element={<ExplorePage />} />

                      <Route
                        path="notifications"
                        element={<NotificationPage />}
                      />

                      <Route path="about" element={<AboutPage />} />
                    </Routes>
                    <Toaster
                      position="bottom-center"
                      toastOptions={toastOptions}
                      containerClassName="mb-12 xs:mb-0"
                    />
                  </div>

                  <div className="xl:hidden">
                    <FooterBar />
                  </div>
                </div>

                <RightDesktopLayout />
              </div>
            </HeaderContentProvider>
          </ModalProvider>
        </CurrentUserProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
