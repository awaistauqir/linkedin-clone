import { getAuth } from '@firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './App.css';
import Feed from './Components/Feed/Feed';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import SideBar from './Components/SideBar/SideBar';
import { login, logout } from './features/user/userSlice';

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(function () {
    const auth = getAuth();
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className='app'>
      {/* Header */}
      <Header />
      {!user ? (
        <Login />
      ) : (
        <div className='app__body'>
          <SideBar />
          <Feed />
        </div>
      )}
      {/* Widgets */}
    </div>
  );
}

export default App;
