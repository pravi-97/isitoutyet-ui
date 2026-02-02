import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AppLayout from "./layouts/AppLayout";
import Search from "./pages/Search";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import MyShows from "./pages/MyShows";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* 1. Protected area (ONLY logged in users) */}
          <Route
            element={
              <ProtectedRoute>
                <AppProvider>
                  <AppLayout />
                </AppProvider>
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/my-shows" element={<MyShows />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* REMOVED FROM HERE */}
          </Route>

          {/* 2. Authentication routes (ONLY logged out users) */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

          {/* 3. Global Public routes (Available to EVERYONE) */}
          {/* We wrap this in AppLayout so they still see the header/footer */}
          <Route element={<AppLayout />}>
            <Route path="/terms-and-privacy" element={<TermsAndPrivacy />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}