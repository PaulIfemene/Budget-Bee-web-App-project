import React, { useEffect } from 'react'; // Add useEffect here
import './App.css';
import Header from './components/Header/Header.jsx';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './components/SignIn/SignIn.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import TransactionsProvider from './useContext/TransactionsProvider.jsx';
import TransactionsTable from './pages/Transactions/TransactionsTable.jsx';
import ProtectedRoute from './routes/ProtectedRoutes.jsx';

function App() {
  useEffect(() => {
    const tawkToScript = document.createElement("script");
    tawkToScript.async = true;
    tawkToScript.src = "https://embed.tawk.to/6749d6434304e3196aea78f8/1ids6pu99";
    tawkToScript.charset = "UTF-8";
    tawkToScript.setAttribute("crossorigin", "*");
    document.body.appendChild(tawkToScript);

    // Cleanup the script when component unmounts
    return () => {
      document.body.removeChild(tawkToScript);
    };
  }, []);

  return (
    <>
      <TransactionsProvider>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="transactions"
            element={
              <ProtectedRoute>
                <TransactionsTable />
              </ProtectedRoute>
            }
          />
        </Routes>
      </TransactionsProvider>
    </>
  );
}

export default App;
