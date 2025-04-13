import React, { useEffect, useState } from "react";
import {Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Signup } from "./pages/signup/signup";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Login } from "./pages/login/login"
import { EditTaskScreen } from "./pages/editTask/editTask";
import { Home } from "./pages/home/home";
import { ToastContainer } from "react-toastify";
import { Header } from "./components/header/header";
import { NotFound } from "./pages/notFound/notFound";
import { RequireAuth } from "./routes/requireAuth";
import { RedirectIfAuth } from "./routes/redirectIfAuth";

export default function App() {

  return (
    <Provider store={store}>
      <Header/>
      <Routes>
        <Route path="/" element = {<Navigate to="/login" replace/>}/>
        <Route element = {<RedirectIfAuth/>}>
           <Route path="/signup" element = {<Signup/>}/>
           <Route path="/login" element = {<Login/>}/>
        </Route>
        <Route element = {<RequireAuth/>}>
          <Route path="/home" element = {<Home/>}/>
          <Route path="/home/edit-task/:taskId" element={<EditTaskScreen />} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
      />
    </Provider>
  );
}
