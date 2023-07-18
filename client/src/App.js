import './App.css';
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Components/NotifiedHomepage/dashboard.jsx";
// import Home from "./dashboard/Home"
import Homepage from "./Components/homepage/homepage.jsx"


const router = createBrowserRouter([
  {
    path: '/',
    element:<Homepage />
  },
  {
    path: '/home',
    element:<Dashboard />,
  
  }
])



function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
