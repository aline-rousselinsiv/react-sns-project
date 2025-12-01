import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Login from './components/Login';

import Feed from './components/Feed';
import Register from './components/Register';
import MyPage from './components/MyPage';
import Menu from './components/Menu'; // Menu로 변경
import Signup from './components/Signup';
import Header from './components/Header';
import RightBar from './components/RightBar';
import SavedPosts from './components/SavedPosts';
import { useState } from 'react';
import UserProfile from './components/UserProfile';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const [keyword, setKeyword] = useState("");

  return (
    <Box>
    <CssBaseline />

    {/* Header only shows for non-auth pages */}
    {!isAuthPage && <Header keyword={keyword} setKeyword={setKeyword} />}
    

    <Box sx={{ display: 'flex' }}>
      {/* Side menu only shows for non-auth pages */}
      {!isAuthPage && <Menu />}
      

      {/* Main content */}
      <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: isAuthPage ? 0 : 3  // ✅ No padding for auth pages!
          }}
        >
        <Routes>
          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* App pages */}
          <Route path="/feed" element={<Feed keyword={keyword} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/savedposts" element={<SavedPosts keyword={keyword}/>} />
          <Route path="/user/:userId" element={<UserProfile />} />
        </Routes>
      </Box>
      {/* Right-side bar */}
      {!isAuthPage && (
        <Box>
          <RightBar />  {/* Your right sidebar content */}
        </Box>
      )}
    </Box>
  </Box>
  );
}

export default App;
