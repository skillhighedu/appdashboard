import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Layout from "./layouts/Layout";
import { ProtectedRoute } from "@components/ProtectedRoute";
import CourseDashboard from "@pages/CourseDashboard";
import PlayLayout from './layouts/PlayLayout'
import Profile from "@pages/Profile";
import Quiz from "@pages/QuizList";
import VerifyUser from "@pages/VerifyUser";
import OTP from "@pages/OTP";
import Projects from "@pages/Projects";
// ✅ Lazy load pages
const Landing = lazy(() => import("@pages/Landing"));
const Login = lazy(() => import("@pages/Login"));
const Home = lazy(() => import("@pages/Home"));

function App() {
  return (
    <div className="min-h-screen dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-2">
        <Router>
          {/* ✅ Suspense provides a fallback UI while components load */}
          <Suspense
            fallback={<div className="text-white text-center">Loading...</div>}
          >
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Landing />
                  </Layout>
                }
              />
              <Route
                path="/login"
                element={
                  <Layout>
                    <Login />
                  </Layout>
                }
              />
                 <Route
                  path="/verification"
                  element={
                    <Layout>
                      <VerifyUser/>
                    </Layout>
                  }
                />
                  <Route
                  path="/otp"
                  element={
                    <Layout>
                      <OTP/>
                    </Layout>
                  }
                />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/home"
                  element={
                    <Layout>
                      <Home />
                    </Layout>
                  }
                />
                <Route
                  path="/courseDashboard"
                  element={
                    <Layout>
                      <CourseDashboard />
                    </Layout>
                  }
                />
                 <Route
                  path="/course_player"
                  element={
                    <Layout>
                      <PlayLayout/>
                    </Layout>
                  }
                />
                  <Route
                  path="/profile"
                  element={
                    <Layout>
                      <Profile/>
                    </Layout>
                  }
                />
                  <Route
                  path="/quizList"
                  element={
                    <Layout>
                      <Quiz/>
                    </Layout>
                  }
                />
                 <Route
                  path="/projects"
                  element={
                    <Layout>
                      <Projects/>
                    </Layout>
                  }
                />
               
                
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </div>
    </div>
  );
}

export default App;
