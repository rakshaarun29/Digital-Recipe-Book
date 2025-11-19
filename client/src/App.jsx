import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddRecipe from './pages/AddRecipe.jsx'
import Browse from './pages/Browse.jsx'
import RecipeDetails from './pages/RecipeDetails.jsx'
import Favorites from './pages/Favorites.jsx'
import Profile from './pages/Profile.jsx'
import About from './pages/About.jsx'
import logo from './assets/logo.svg'

function Nav() {
  const token = localStorage.getItem('token')
  return (
    <nav className="site-nav">
      <Link className="brand" to="/" style={{display:'flex',alignItems:'center',gap:8}}>
        <img src={logo} alt="RecipeRealm" width="24" height="24" style={{borderRadius:6}} />
        RecipeRealm
      </Link>
      <Link to="/browse">Browse</Link>
      <Link to="/about">About</Link>
      {token && <Link to="/add">Add Recipe</Link>}
      <span className="spacer" />
      {token ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={()=>{localStorage.removeItem('token'); location.href='/'}}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  )
}

function Private({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
          <Route path="/add" element={<Private><AddRecipe /></Private>} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Private><Favorites /></Private>} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  )
}
