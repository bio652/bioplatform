import { createContext, useContext, useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import MainHeader from './components/mainHeader/mainHeader';
import SignUp from './components/signup/SignUp';
import { Signprovider } from './contexts/SignContext';
import HomePage from './components/homePage/HomePage';
import UserPage from './components/userPage/UserPage';
import BoardPage from './components/boardPage/BoardPage';
import ItemPage from './components/itemPage/ItemPage';
import AdminPage from './components/adminPage/adminPage';

function App() {


  return (
    <>
    <Signprovider>
      <BrowserRouter>
        <MainHeader></MainHeader>
        <Routes>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/homepage" element={<HomePage/>}></Route>
          <Route exact path="/userpage" element={<UserPage />}></Route>
          <Route exact path="/board" element={<BoardPage/>}></Route>
          <Route exact path="/item/:itemtoken" element={<ItemPage/>}></Route>
          <Route exact path="/admin" element={<AdminPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Signprovider>
    </>
  )
}

export default App
