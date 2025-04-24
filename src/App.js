import React, { useEffect } from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/signup/signup";
import { useSelector } from "react-redux";
import { Login } from "./pages/login/login"
import { EditTaskScreen } from "./pages/editTask/editTask";
import { Home } from "./pages/home/home";
import { toast, ToastContainer } from "react-toastify";
import { Header } from "./components/header/header";
import { NotFound } from "./pages/notFound/notFound";
import { RequireAuth } from "./routes/requireAuth";
import { RedirectIfAuth } from "./routes/redirectIfAuth";

export default function App() {
  const { serverError: tasksServerError, networkError: tasksNetworkError } = useSelector((state) => state.tasks);
  const { serverError: authServerError, networkError: authNetworkError } = useSelector((state) => state.auth);
  useEffect(() => {
    if (tasksServerError) toast.error(tasksServerError);
    if (tasksNetworkError) toast.error(tasksNetworkError);
    if (authServerError) toast.error(authServerError);
    if (authNetworkError) toast.error(authNetworkError);
  }, [tasksServerError, tasksNetworkError, authServerError, authNetworkError]);    
  
  return (
    <>
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
    </>
  );
}
