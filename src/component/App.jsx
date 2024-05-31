import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import SignUp from './SignUp';
import Welcome from './Welcome';
import Home1 from './Home1';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/SignUpPage" element={<SignUp />} />
          <Route path="/LoginPage" element={<Login />} />
          {/* Wrap ProtectedRoute with Route */}
          <Route path="/Home" element={
          <ProtectedRoute>
            <Home1/>
          </ProtectedRoute>
        } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
