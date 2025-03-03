import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import Landing from "./pages/Landing";

function App() {
  return (
    <div className="min-h-screen   dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-2 ">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Landing />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
