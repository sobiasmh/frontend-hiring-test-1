import React, { createContext, useContext, useState } from 'react';

// Define the shape of the auth context
const AuthContext = createContext({
  accessToken: null,
  setAccessToken: (token) => {}, // Accept token as an argument
  refreshToken: null,
  setRefreshToken: (token) => {} // Accept token as an argument
});

// Create a custom hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your application with
const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken')
  );

  // Update localStorage and state with the new token
  const updateRefreshToken = (token) => {
    localStorage.setItem('refreshToken', token || ''); // Update localStorage
    setRefreshToken(token); // Update state
  };
  const updateAccessToken = (token) => {
    localStorage.setItem('accessToken', token || ''); // Update localStorage
    setAccessToken(token); // Update state
  };

  console.log("auth viewer here", accessToken, refreshToken)


  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken: updateAccessToken, refreshToken, setRefreshToken: updateRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
