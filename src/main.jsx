import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login.jsx'
import React from 'react';
import Home from './pages/Home.jsx'
import SignUpForm from './components/SignUpForm.jsx'
import AddUserProfile from './components/AddUserProfile.jsx'
import Profile from './components/Profile.jsx'
import FileUploadForm from './components/FileUpload.jsx'
import ImageGallery from './components/ImageGallery.jsx'
import AdminPanel from './components/AdminPanel.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/login",
            element: (
                <Login />
            ),
        },
        {
          path: "/sign-up",
          element: (
              <SignUpForm />
          ),
        },
        {
          path: "/add-user-profile",
          element: (
              <AddUserProfile />
          ),
        },
        {
          path: "/user-profile",
          element: (
              <Profile />
          ),
        },
        {
          path: "/upload-file",
          element: (
              <FileUploadForm />
          ),
        },
        {
          path: "/images",
          element: (
            <ImageGallery category="Village" />
          ),
        },
        {
          path: "/admin-panel",
          element: (
            <AdminPanel />
          ),
        }
    ],
},
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
