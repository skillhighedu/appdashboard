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
import Support from "@pages/Support";
import CertificateComponent from "@pages/Certificate";
import CertificateVerification from "@pages/CertificateVerification";
// import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@components/ui/BreadCrumbs";

const Landing = lazy(() => import("@pages/Landing"));
const Login = lazy(() => import("@pages/Login"));
const Home = lazy(() => import("@pages/Home"));

// const Breadcrumbs = () => {
//   const location = useLocation();

//   const breadcrumbItems = useMemo(() => {
//     const pathnames = location.pathname.split("/").filter(Boolean);

//     const breadcrumbMap: Record<string, string> = {
//       home: "Home",
//       login: "Login",
//       verification: "Verify User",
//       blogs: "Blogs",
//       "forgot-password": "Forgot Password",
//       otp: "OTP",
//       courseDashboard: "Course Dashboard",
//       course_player: "Course Player",
//       profile: "Profile",
//       quizList: "Quiz List",
//       quiz: "Quiz",
//       projects: "Projects",
//       "setup-details": "Setup Details",
//     };

//     const breadcrumbs = pathnames.map((path, index) => {
//       const href = `/${pathnames.slice(0, index + 1).join("/")}`;
//       return {
//         label: breadcrumbMap[path] || path,
//         href,
//       };
//     });

//     return [{ label: "Home", href: "/home" }, ...breadcrumbs];
//   }, [location.pathname]);

//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         {breadcrumbItems.map((item, index) => (
//           <BreadcrumbItem key={item.href}>
//             {index === breadcrumbItems.length - 1 ? (
//               <span>{item.label}</span>
//             ) : (
//               <>
//                 <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
//                 <BreadcrumbSeparator />
//               </>
//             )}
//           </BreadcrumbItem>
//         ))}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// };

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="wrapper h-full w-full max-w-[80rem] px-4 md:px-12 lg:px-10 xl:max-w-[90rem] mx-auto ">
        <Router>
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
                path="/verify/:cid"
                element={
                  <Layout>
                    <CertificateVerification />
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
                  path="/certificate"
                  element={
                    <Layout>
                      <CertificateComponent />
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
                <Route
                  path="/support"
                  element={
                    <Layout>
                      <Support />
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
