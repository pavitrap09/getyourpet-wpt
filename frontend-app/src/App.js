import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/AboutUs';
import Contact from './Components/ContactUs';
import Login from './Components/Login';
import Sell from './Components/Sell';
import Footer from './Components/Footer';
import Advertise from './Components/Advertise';
import Signup from './Components/Signup';
import Account from './Components/Account';
import ProtectedRoute from './Components/ProtectedRoute';
import Chat from './Components/Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/advertise/:id" element={<Advertise />} /> 
          <Route path="/chat/:ownerId" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account/:id" element={<Account />} />
            <Route path="/sell" element={<Sell />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
