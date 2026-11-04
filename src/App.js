import './App.css';
import NavBar from './components/NavBar/NavBar';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Bans from './components/Bans/Bans';
import Users from './components/Users/Users';
import Error from './components/Error/Error';
import Login from './components/Login/Login';
import Main from './components/Main/Main';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path = "/login" element = {<Login />} />
          <Route  path = "/" element = {<Main />} >
            <Route exact path = "/" element = {<Home />} />
            <Route exact path = "/bans" element = {<Bans />} /> 
            <Route exact path = "/users" element = {<Users />} />
            <Route exact path = "/error" element = {<Error />} />
            <Route exact path = "*" element = {<Navigate to = "/error" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
    
    
  );
}

export default App;
