import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Main from '../pages/Main'
import Tours from '../pages/Tours'
import Flight from '../pages/Flight'
import FlightDetails from '../pages/FlightDetails' 
import Blogs from '../pages/Blogs'
import About from '../pages/About'
import TourDetails from '../pages/TourDetails'
import BlogDetails from '../pages/BlogDetails'
import Profile from '../pages/Profile'
import Favorites from '../pages/Favorites'
import Auth from '../pages/Auth'
import NotFound from '../pages/NotFound'
import AddTour from '../pages/AddTour'
import EditTour from '../pages/EditTour' 
import AddBlog from '../pages/AddBlog';
import EditBlog from '../pages/EditBlog';

const AppRouter = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <div className="app-wrapper">
      <Header />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/flights" element={<Flight />} />
          <Route path="/booking" element={<FlightDetails />} /> 
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={user ? <Profile /> : <Auth />} />
          <Route path="/favorites" element={user ? <Favorites /> : <Auth />} />
          <Route path="/add-tour" element={<AddTour />} />
          <Route path="/edit-tour/:id" element={<EditTour />} /> 
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default AppRouter