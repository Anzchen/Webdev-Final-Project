import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react'
import Header from './components/Header'
import Details from "./components/Details";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Login/register";
import Profile from "./components/Profile";
import Results from "./components/Results";
import AdminLogin from "./components/Login/adminLogin";

function App() {
  const theme = extendTheme({
    fonts: {
      body: 'Poppins, system-ui, sans-serif',
      heading: 'Poppins, Georgia, serif',
    },
  });
  
  return (
    <ChakraProvider theme={theme}>
      
      <Box height="10vh" position="relative" bg="#1A1A2E">
      </Box>
        <Box 
          // height="100vh" 
          position="relative" 
          width="100%" 
          bottom="0" 
          // borderTopRadius="1em" 
          bg="#2b2b3f"
        >
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<Header/>}>
                  <Route index element={<Home/>} />
                  <Route path="details" element={<Details/>} />
                  <Route path="profile" element={<Profile/>} />
                  <Route path="results" element={<Results/>} />
                </Route>
                <Route path="login" element={<Login/>} />
                <Route path="register" element={<Register/>} />
                {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
                <Route path="/admin-login" element={<AdminLogin />} />
              </Routes>
          </BrowserRouter>
        </Box>
    </ChakraProvider>
  );
}

export default App;