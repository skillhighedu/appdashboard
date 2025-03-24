import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Layout from "./layouts/Layout";
import { ProtectedRoute } from "@components/ProtectedRoute";
import CourseDashboard from "@pages/CourseDashboard";
import PlayLayout from "./layouts/PlayLayout";
import Profile from "@pages/Profile";
import QuizList from "@pages/QuizList";
import Quiz from "@pages/Quiz";
import VerifyUser from "@pages/VerifyUser";
import OTP from "@pages/OTP";
import Projects from "@pages/Projects";
import Blogs from "@pages/Blogs";
import NotFound from "@pages/NotFound";
import DetailsForm from "@pages/DetailsForm";
import ForgotPassword from "@pages/ForgotPassword";

const Landing = lazy(() => import("@pages/Landing"));
const Login = lazy(() => import("@pages/Login"));
const Home = lazy(() => import("@pages/Home"));

function App() {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="w-full max-w-screen mx-auto px-2 lg:px-6">
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
                path="*"
                element={
                  <Layout>
                    <NotFound />
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
                    <VerifyUser />
                  </Layout>
                }
              />
              <Route
                path="/blogs"
                element={
                  <Layout>
                    <Blogs />
                  </Layout>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <Layout>
                    <ForgotPassword />
                  </Layout>
                }
              />
              <Route
                path="/otp"
                element={
                  <Layout>
                    <OTP />
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
                      <PlayLayout />
                    </Layout>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Layout>
                      <Profile />
                    </Layout>
                  }
                />
                <Route
                  path="/quizList"
                  element={
                    <Layout>
                      <QuizList />
                    </Layout>
                  }
                />
                <Route
                  path="/quiz"
                  element={
                    <Layout>
                      <Quiz />
                    </Layout>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <Layout>
                      <Projects />
                    </Layout>
                  }
                />
                <Route
                  path="/setup-details"
                  element={
                    <Layout>
                      <DetailsForm />
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
